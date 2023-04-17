import React, { useState } from 'react';
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonDatetime,
    IonAlert,
    IonDatetimeButton,
    IonModal
} from '@ionic/react';

interface BorrowProps {
    borrowerName: string;
    borrowDate: string;
    returnDate: string;

}



export const Borrow: React.FC<BorrowProps> = () => {

    const [itemName, setItemName] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [borrowerName, setBorrowerName] = useState('');
    const [borrowDate, setBorrowDate] = useState<string | string[]>('');
    const [returnDate, setReturnDate] = useState<string | string[]>('');
    const [showAlert, setShowAlert] = useState(false);

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setShowAlert(true);
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Borrow items</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <form onSubmit={handleFormSubmit}>
                    <IonItem>
                        <IonLabel position="stacked">Item name</IonLabel>
                        <IonInput
                            type="text"
                            value={itemName}
                            onIonChange={e => setItemName(e.detail.value!)}
                            required
                        />
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked">Item description</IonLabel>
                        <IonInput
                            type="text"
                            value={itemDescription}
                            onIonChange={e => setItemDescription(e.detail.value!)}
                            required
                        />
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked">Borrower name</IonLabel>
                        <IonInput
                            type="text"
                            value={borrowerName}
                            onIonChange={e => setBorrowerName(e.detail.value!)}
                            required
                        />
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked">Borrow date</IonLabel>
                        <IonDatetimeButton datetime="reminderTime"></IonDatetimeButton>
                        <IonModal keepContentsMounted={true}>
                            <IonDatetime id="reminderTime"
                                value={borrowDate}
                                onIonChange={e => setBorrowDate(e.detail.value!)}
                            />
                        </IonModal>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked">Return date</IonLabel>
                        <IonDatetimeButton datetime="reminderTime"></IonDatetimeButton>
                        <IonModal keepContentsMounted={true}>
                            <IonDatetime id='reminderTime'
                                value={returnDate}
                                onIonChange={e => setReturnDate(e.detail.value!)}
                            />
                        </IonModal>
                    </IonItem>

                    <IonButton type="submit" expand="block"
                        style={{
                            fontWeight: 'bold',
                            fontSize: '20px',
                            marginTop: '20px',
                            maxWidth: '90%',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                        }}
                    >
                        Borrow
                    </IonButton>
                </form>
                <IonAlert
                    isOpen={showAlert}
                    onDidDismiss={() => setShowAlert(false)}
                    header={'Success!'}
                    message={`You have successfully borrowed an item from ${borrowerName}.`}
                    buttons={['OK']}
                />

            </IonContent>

        </IonPage>
    );
};
