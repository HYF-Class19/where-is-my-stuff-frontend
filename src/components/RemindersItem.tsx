import React, { useEffect, useState } from 'react';
import { IonIcon, IonItem, IonItemDivider, IonLabel, IonList } from "@ionic/react";
import { chevronForward } from "ionicons/icons";

import { get, child } from 'firebase/database';
import { dbRef } from '../db';

import { Reminder, useReminder } from "../hooks/UseReminder";
import { ReminderDetailsModal } from '../Modal/Details';

interface ReminderProps { }

export const RemindersItem: React.FC<ReminderProps> = () => {
    const { selectedReminder, isModalOpen, handleModalDismiss, handleItemClick } = useReminder();
    const [reminders, setReminders] = useState<Reminder[]>([]);

    useEffect(() => {
        const dbRemindersRef = child(dbRef, 'items');
        get(dbRemindersRef).then((snapshot) => {
            if (snapshot.exists()) {
                const newReminders: Reminder[] = [];
                snapshot.forEach((reminderSnapshot) => {
                    const itemId = reminderSnapshot.key as string;
                    const itemName = reminderSnapshot.child('name').val();
                    const itemDescription = reminderSnapshot.child('description').val();
                    const borrower = reminderSnapshot.child('borrowerName').val();
                    const lendDate = reminderSnapshot.child('lendingDate').val();
                    const reminderDate = reminderSnapshot.child('reminderDate').val();
                    newReminders.push({
                        id: itemId,
                        name: itemName,
                        description: itemDescription,
                        borrowerName: borrower,
                        lendingDate: lendDate,
                        reminderDate: reminderDate,
                    });
                });
                setReminders(newReminders);
            } else {
                console.log('No data available');
            }
        }).catch((error) => {
            console.error(error);
        });
    }, [setReminders])


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


