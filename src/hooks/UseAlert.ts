import { useState } from "react";

export const UseAlertAction = () => {
    const [showDeleteWarning, setShowDeleteWarning] = useState(false);

    const handleDeleteClick = () => {
        setShowDeleteWarning(true);
    };

    const handleDeleteConfirm = () => {
        // handle delete logic here
        setShowDeleteWarning(false);
    };

    const handleDeleteCancel = () => {
        setShowDeleteWarning(false);

    };

    return {
        showDeleteWarning,
        handleDeleteClick,
        handleDeleteConfirm,
        handleDeleteCancel
    }
}