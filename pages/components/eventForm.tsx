import React, { useState, Dispatch, SetStateAction } from 'react';
import { Schema } from '../../amplify/data/resource';

interface EventFormProps {
    client: any;
    setReminders: Dispatch<SetStateAction<Schema['Reminder'][]>>;
}

export const EventForm = ({ client, setReminders }: EventFormProps) => {
  const [eventName, setEventName] = useState<string>('');
  const [eventDate, setEventDate] = useState<string>('');

  return (
    <>
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
    </>
  );
}