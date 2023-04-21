import { IonAlert, IonButton, IonButtons, IonContent, IonDatetime, IonDatetimeButton, IonHeader, IonInput, IonItem, IonLabel, IonModal, IonPage, IonTitle, IonToolbar } from "@ionic/react"
import { useHistory } from "react-router-dom";
import { storage, auth } from "../database/fireStoreDatabase";
import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, doc, setDoc } from "firebase/firestore";



export const AddToBeBorrow: React.FC = () => {
    const [itemName, setItemName] = useState("");
    const [itemDescription, setItemDescription] = useState("");
    const [itemAddDate, setItemAddDate] = useState(new Date().toISOString().slice(0, 10))
    const [downloadUrl, setDownloadUrl] = useState("");
    const [itemCreated, setItemCreated] = useState(false);
    const [errorMessage, setErrorMessage] = useState("")

    const history = useHistory();

    const user = auth.currentUser;

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.item(0);
        if (file) {
            const storageRef = ref(storage, `users/${user?.email}/${file.name}`);
            await uploadBytes(storageRef, file);
            const downloadUrl = await getDownloadURL(storageRef);
            setDownloadUrl(downloadUrl);
        }
    }

    const handleConfirmClick = async () => {
        if (!itemName || !itemDescription || !downloadUrl) {
            setErrorMessage("Please fill in all fields");
            return;
        }

        const itemId = Math.random().toString(36).substring(2);
        const firestore = getFirestore();
        const itemDocRef = doc(
            firestore,
            `users/${user?.email}/items/${itemId}`
        );
        const newItem = {
            name: itemName,
            description: itemDescription,
            addDate: itemAddDate,
            imageUrl: downloadUrl,
            itemId: itemId,

        };
        await setDoc(itemDocRef, newItem);
        setItemCreated(true);
    }

    const handleCancelClick = () => {
        history.push("/profile");
    }

    return (
        <>
            <IonPage>
                {
                    errorMessage && <IonAlert
                        isOpen={true}
                        onDidDismiss={() => setErrorMessage("")}
                        header={"Error"}
                        message={errorMessage}
                        buttons={["OK"]}
                    />
                }
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonButton
                                onClick={handleCancelClick}
                            >Cancel</IonButton>
                        </IonButtons>
                        <IonTitle>Add Borrow Items </IonTitle>
                        <IonButtons slot="end">
                            <IonButton onClick={handleConfirmClick}>Confirm</IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonItem style={{ padding: "20px" }}>
                        <input style={{ padding: "10px" }} type="file" onChange={handleFileUpload} accept="image/*" />
                    </IonItem>
                    <IonItem style={{ padding: "20px" }}>
                        <IonLabel style={{ padding: "10px" }}>Name</IonLabel>
                        <IonInput placeholder="Item Name" value={itemName} onIonChange={e => setItemName(e.detail.value!)} />
                    </IonItem>
                    <IonItem style={{ padding: "20px" }}>
                        <IonLabel style={{ padding: "10px" }}>Description</IonLabel>
                        <IonInput placeholder="Item Description" value={itemDescription} onIonChange={e => setItemDescription(e.detail.value!)} />
                    </IonItem>
                    <IonItem style={{ padding: "20px" }}>

                        <IonLabel style={{ padding: "10px" }}>Add Date</IonLabel>
                        <IonDatetimeButton datetime="addTime"></IonDatetimeButton>
                        <IonModal keepContentsMounted={true}>
                            <IonDatetime id="addTime"
                                onIonChange={
                                    (event: CustomEvent) => {
                                        const target = event.target as HTMLInputElement;
                                        setItemAddDate(target.value);
                                    }
                                }></IonDatetime>
                        </IonModal>
                    </IonItem>
                    {itemCreated && <IonAlert
                        isOpen={true}
                        header={"Success"}
                        message={"Item created successfully!"}
                        buttons={["OK"]}
                    />
                    }
                </IonContent>
            </IonPage>
        </>
    )

}

