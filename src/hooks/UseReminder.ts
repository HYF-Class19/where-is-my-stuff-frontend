import { useState } from "react";

export interface Reminder {
    id: string;
    name: string;
    description: string;
    borrowerName: string;
    lendingDate?: string;
    reminderDate?: string;
}

export const useReminder = () => {
    const [selectedReminder, setSelectedReminder] = useState<Reminder>();
    const [isBack, setIsBack] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleReminderClick = (reminder: Reminder) => {
        setSelectedReminder(reminder);
        setIsBack(false);
    };

    const handleModalDismiss = () => {
        setIsModalOpen(false);
    };

    const handleItemClick = (reminder: Reminder) => {
        handleReminderClick(reminder);
        setIsModalOpen(true);
    };


    return {
        selectedReminder,
        isBack,
        handleReminderClick,
        setIsBack,
        isModalOpen,
        handleModalDismiss,
        handleItemClick
    };

};