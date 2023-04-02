import { useState } from "react";

export const UseUpdateModal = () => {
    const [updateModal, setUpdateModal] = useState(false);

    const toggleUpdateModal = () => {
        setUpdateModal(!updateModal);
    };

    return { updateModal, toggleUpdateModal };
}