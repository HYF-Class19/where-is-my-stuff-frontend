import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonContent, IonInput, IonLabel, IonItem, IonDatetime, IonDatetimeButton, IonModal } from '@ionic/react';

interface UpdateProps {
    displayFormat: string;
}



const UpdateLendOut: React.FC<UpdateProps> = () => {
    // use useState hook to manage state of input fields
    const [itemName, setItemName] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [borrowerName, setBorrowerName] = useState('');
    

 
    return (
        
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    
                    <IonButtons slot="start">
                        <IonButton>Cancel</IonButton>
                    </IonButtons>
                    
                    <IonTitle>Update lend out</IonTitle>
                    
                    <IonButtons slot="end">
                        <IonButton>Update</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>

                
                <IonItem>
                    <IonLabel position="floating">Item name</IonLabel>
                    <IonInput value={itemName} onIonChange={(e) => setItemName(e.detail.value!)}></IonInput>
                </IonItem>
                
                <IonItem>
                    <IonLabel position="floating">Item description</IonLabel>
                    <IonInput value={itemDescription} onIonChange={(e) => setItemDescription(e.detail.value!)}></IonInput>
                </IonItem>
                
                <IonItem>
                    <IonLabel position="floating">Borrower name</IonLabel>
                    <IonInput value={borrowerName} onIonChange={(e) => setBorrowerName(e.detail.value!)}></IonInput>
                </IonItem>
                
                <IonItem>
                    <IonLabel position="floating">
                        <IonToolbar>
                            
                            <IonDatetimeButton datetime="datetime"></IonDatetimeButton>

                            <IonModal keepContentsMounted={true}>
                                <IonDatetime id="datetime"></IonDatetime>
                            </IonModal>
                            When:
                        </IonToolbar>

                    </IonLabel>
                </IonItem>

                <IonItem>
                    <IonLabel position="floating">
                        <IonToolbar>
                            
                            <IonDatetimeButton datetime="datetime"></IonDatetimeButton>

                            <IonModal keepContentsMounted={true}>
                                <IonDatetime id="datetime"></IonDatetime>
                            </IonModal>
                            Set Reminder:
                        </IonToolbar>

                    </IonLabel>
                </IonItem>

            </IonContent>
        </IonPage>
    );
};
export default UpdateLendOut;







