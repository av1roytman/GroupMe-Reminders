import React from 'react';
import { Schema } from '../../amplify/data/resource';

interface RemindersListProps {
    reminders: Schema['Reminder'][];
    deleteReminder: (reminder: Schema['Reminder']) => Promise<void>;
}

const RemindersList: React.FC<RemindersListProps> = ({ reminders, deleteReminder }) => {
    return (
        <div className="reminders-list">
            <h2>Upcoming Reminders</h2>
            {reminders.length > 0 ? (
                <ul>
                    {reminders.map((reminder) => (
                        <li key={reminder.id} className="reminder-item">
                            <strong>{reminder.eventName}</strong> - <span>{reminder.eventDate}</span>
                            <button onClick={() => deleteReminder(reminder)}>Delete</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No reminders to display.</p>
            )}
        </div>
    );
};

export default RemindersList;
