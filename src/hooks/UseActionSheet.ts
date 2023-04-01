import { useState } from "react";



export const UseActionSheet = () => {
    const [isActionSheetOpen, setIsActionSheetOpen] = useState(false);

    const handleActionSheet = () => {
        setIsActionSheetOpen(true);
        console.log("is click");

    }

    const handleDelete = () => {
        // handle delete logic here
    };

    const handleUpdate = () => {
        // handle update logic here
    };

    const handleCancel = () => {
        // handle cancel logic here
    }

    return {
        isActionSheetOpen,
        handleActionSheet,
        handleDelete,
        handleUpdate,
        handleCancel
    }
}