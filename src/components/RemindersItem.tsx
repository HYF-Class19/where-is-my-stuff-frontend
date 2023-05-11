import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { child, onValue } from 'firebase/database';
import { dbRef, initMessaging } from '../database/realTimeDatabase';

import { IonIcon, IonItem, IonItemDivider, IonLabel, IonList } from "@ionic/react";
import { chevronForward } from "ionicons/icons";
import { Reminder, useReminder } from "../hooks/UseReminder";
import { ReminderDetailsModal } from '../Modal/Details';


interface ReminderProps {

}

export const RemindersItem: React.FC<ReminderProps> = () => {
    const { selectedReminder, isModalOpen, handleModalDismiss, handleItemClick } = useReminder();
    const [reminders, setReminders] = useState<Reminder[]>([]);
    const [noReminders, setNoReminders] = useState<boolean>(false);
    const [fcmToken, setFcmToken] = useState<string>();
    const auth = getAuth();
    const currentUser = auth.currentUser;

    useEffect(() => {
        if (currentUser) {
            const sanitizedEmail = currentUser.email?.replace(/[\\[\].#$]/g, '-');
            const emailInfo = sanitizedEmail?.split('@gmailcom');
            // const userId = currentUser.uid;
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
                    // console.log(`No reminders found for user ${userId}`);
                    setNoReminders(true);
                }
            }, (error) => {
                console.error(error);
            });
        }
    }, [currentUser]);

    useEffect(() => {
        const messaging = initMessaging();
        return messaging;

    }, []);









    useEffect(() => {
        if (currentUser && fcmToken) {
            const sanitizedEmail = currentUser.email?.replace(/[\\[\].#$]/g, '-');
            const emailInfo = sanitizedEmail?.split('@gmailcom');
            const userRemindersRef = child(dbRef, `users/${emailInfo}/items`);

            const sendNotification =
                async ({ token, reminderName, reminderDate }: { token: string; reminderName: string; reminderDate: string; }) => {
                    const message = {
                        to: token,
                        sound: 'default',
                        title: 'Reminder',
                        body: `You have a reminder for ${reminderName} on ${reminderDate}`,
                        data: { data: 'goes here' },
                        _displayInForeground: true,
                    };

                    await fetch('https://fcm.googleapis.com//v1/projects/where-is-my-stuff-89c9a/send', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Accept-encoding': 'gzip, deflate',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(message),
                    });

                };






            const unsubscribe = onValue(userRemindersRef, (snapshot) => {
                if (snapshot.exists()) {
                    snapshot.forEach((reminderSnapshot) => {
                        const reminderId = reminderSnapshot.key as string;
                        const reminderData = reminderSnapshot.val();
                        const reminderDate = new Date(reminderData.reminderDate);
                        const now = new Date();
                        const timeDifference = reminderDate.getTime() - now.getTime();
                        const daysUntilReminder = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

                        if (daysUntilReminder === 1) {
                            sendNotification({
                                token: fcmToken,
                                reminderName: reminderData.name,
                                reminderDate: reminderData.reminderDate,
                            });
                        }
                    });
                } else {
                    setNoReminders(true);
                }
            }, (error) => {
                console.error(error);
            });

            return () => unsubscribe();
        }
    }, [currentUser, fcmToken]);





    return (
        <div>
            {noReminders && <p>No reminders found</p>}

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
