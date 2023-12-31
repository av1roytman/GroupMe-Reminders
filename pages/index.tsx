// pages/index.tsx
import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/data';
import { Schema } from '../amplify/data/resource';
import RemindersList from './components/remindersList';
import EventForm from './components/eventForm';

// generate your data client using the Schema from your backend
const client = generateClient<Schema>();

export default function HomePage() {
  const [reminders, setReminders] = useState<Schema['Reminder'][]>([]);

  const deleteReminder = async (reminder: Schema['Reminder']) => {
    const { errors } = await client.models.Reminder.delete(reminder);
    if (!errors) {
      setReminders(prevReminders => prevReminders.filter(prev => prev.id !== reminder.id));
    }
  };

  async function listReminders() {
    // fetch all reminders
    const { data } = await client.models.Reminder.list();
    setReminders(data);
  }

  useEffect(() => {
    const sub = client.models.Reminder.observeQuery().subscribe(({ items }) => {
      if (Array.isArray(items)) {
        setReminders([...items].sort((a, b) => {
          const dateA = a.eventDate ? new Date(a.eventDate).getTime() : 0;
          const dateB = b.eventDate ? new Date(b.eventDate).getTime() : 0;
          return dateA - dateB;
        })); // Use spread syntax to create a new array
      }
    });

    return () => sub.unsubscribe();
  }, []);

  return (
    <main>
      <EventForm client={client} setReminders={setReminders}/>      
      <RemindersList reminders={reminders} deleteReminder={deleteReminder}/>
    </main>
  );
}