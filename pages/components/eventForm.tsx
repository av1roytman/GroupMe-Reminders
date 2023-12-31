import React, { useState, Dispatch, SetStateAction } from 'react';
import { Schema } from '../../amplify/data/resource';
import styles from '../../styles/Home.module.css'

interface EventFormProps {
    client: any;
    setReminders: Dispatch<SetStateAction<Schema['Reminder'][]>>;
}

const EventForm = ({ client, setReminders }: EventFormProps) => {
  const [eventName, setEventName] = useState<string>('');
  const [eventDate, setEventDate] = useState<string>('');

  return (
    <div className={styles['event-form']}>
      <input 
        type="text" 
        value={eventName} 
        onChange={(e) => setEventName(e.target.value)} 
        placeholder="Event Name"
      />
      <input 
        type="datetime-local" 
        value={eventDate} 
        onChange={(e) => setEventDate(e.target.value)} 
      />
      <button onClick={async () => {
        const { errors, data: newReminder } = await client.models.Reminder.create({
          eventName: eventName,
          eventDate: eventDate,
        })
        if (!errors) {
          setReminders(prevReminders => [...prevReminders, newReminder]);
        }
        console.log(errors, newReminder);
      }}
      disabled={!eventName || !eventDate}
      >
        Create
      </button>
    </div>
  );
}

export default EventForm;