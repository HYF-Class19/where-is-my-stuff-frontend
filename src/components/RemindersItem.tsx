import React, { useEffect, useState } from 'react';
import { IonIcon, IonItem, IonItemDivider, IonLabel, IonList } from "@ionic/react";
import { chevronForward } from "ionicons/icons";

import { getAuth } from 'firebase/auth';
import { dbRef } from '../database/db';
import { child, onValue } from 'firebase/database';

import { Reminder, useReminder } from "../hooks/UseReminder";
import { ReminderDetailsModal } from '../Modal/Details';

interface ReminderProps { }

export const RemindersItem: React.FC<ReminderProps> = () => {
    const { selectedReminder, isModalOpen, handleModalDismiss, handleItemClick } = useReminder();
    const [reminders, setReminders] = useState<Reminder[]>([]);
    const auth = getAuth();
    const currentUser = auth.currentUser;

    useEffect(() => {
        if (currentUser) {
            const sanitizedEmail = currentUser.email?.replace(/[\\[\].#$]/g, '-');
            const emailInfo = sanitizedEmail?.split('@gmailcom');
            const userId = currentUser.uid;
            const userRemindersRef = child(dbRef, `users/${emailInfo}/items`);
            
            onValue(userRemindersRef, (snapshot) => {
                if (snapshot.exists()) {
                    const newReminders: Reminder[] = [];
                    snapshot.forEach((reminderSnapshot) => {
                        const reminderId = reminderSnapshot.key as string;
                        const reminderData = reminderSnapshot.val();
                        newReminders.push({
                            id: reminderId,
                            name: reminderData.name,
                            description: reminderData.description,
                            borrowerName: reminderData.borrowerName,
                            lendingDate: reminderData.lendingDate,
                            reminderDate: reminderData.reminderDate,
                        });
                    });
                    setReminders(newReminders);
                } else {
                    console.log(`No reminders found for user ${userId}`);
                }
            }, (error) => {
                console.error(error);
            });
        }
    }, [currentUser]);

    return (
        <div>
            <IonList className='reminder__list'>
                {reminders.map((reminder) => (
                    <React.Fragment key={`fragment-${reminder.id}`}>
                        <IonItemDivider key={`divider-${reminder.id}`}>
                            {reminder.reminderDate}
                        </IonItemDivider>
                        <IonItem key={`item-${reminder.id}`} onClick={() => handleItemClick(reminder)}>
                            <IonLabel slot="end">
                                <IonIcon icon={chevronForward} />
                            </IonLabel>
                            {reminder.name}
                        </IonItem>
                    </React.Fragment>
                ))}
            </IonList>

            {<ReminderDetailsModal
                isOpen={isModalOpen}
                onDismiss={handleModalDismiss}
                itemName={selectedReminder?.name ?? ""}
                description={selectedReminder?.description ?? ""}
                to={selectedReminder?.borrowerName ?? ""}
                on={selectedReminder?.lendingDate ?? ""}
                dayOfReturn={selectedReminder?.reminderDate ?? ""}
                id={selectedReminder?.id ?? ""}
            />}
        </div>
    );
};


