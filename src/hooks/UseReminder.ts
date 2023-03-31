import { useState } from "react";

export interface Reminder {
    id: number;
    itemName: string;
    description: string;
    to: string;
    on: string;
    reminder: boolean;
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