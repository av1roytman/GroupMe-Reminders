import React from 'react';
import { Schema } from '../../amplify/data/resource';
import styles from '../../styles/Home.module.css';

interface RemindersListProps {
    reminders: Schema['Reminder'][];
    deleteReminder: (reminder: Schema['Reminder']) => Promise<void>;
}

const RemindersList: React.FC<RemindersListProps> = ({ reminders, deleteReminder }) => {
    return (
        <div className={styles["reminders-list"]}>
            <h2>Upcoming Reminders</h2>
            {reminders.length > 0 ? (
                <ul>
                    {reminders.map((reminder) => (
                        <li key={reminder.id} className={styles["reminder-item"]}>
                            <div className={styles["content"]}>
                                <strong className={styles["content-strong"]}>{reminder.eventName}</strong>
                                <span className={styles["content-span"]}>
                                    {reminder.eventDate 
                                        ? new Date(reminder.eventDate).toLocaleString(undefined, { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }) 
                                        : 'Date not set'}
                                </span>
                            </div>
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
