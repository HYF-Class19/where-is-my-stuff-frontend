import { useState } from "react";



export const UseActionSheet = () => {
    const [showActionSheet, setShowActionSheet] = useState(false);

    const handleActionSheet = () => {
        setShowActionSheet(!showActionSheet);
 
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
        showActionSheet,
        handleActionSheet,
        handleDelete,
        handleUpdate,
        handleCancel
    }
}