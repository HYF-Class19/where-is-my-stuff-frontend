import React, { useState } from "react";
import { IonPage, IonInput, IonButton, IonText, IonHeader, IonTitle, IonContent, IonToolbar, IonBackButton, IonButtons } from "@ionic/react";


export const Chat: React.FC = () => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const handleSendSMS = async () => {
        setIsLoading(true);
        try {
            const location = await getCurrentLocation();
            const messageWithLocation = `${message} (Location: ${location.latitude}, ${location.longitude})`;

            const response = await fetch(
                "https://api.twilio.com/2010-04-01/Accounts/ACac681ba13a14443f9b8e7d7b82b31d17/Messages.json",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "",
                    },
                    body: JSON.stringify({
                        phoneNumber,
                        message: messageWithLocation,
                    }),
                }
            );
            const data = await response.json();
            if (data.success) {
                setSuccessMsg(data.message);
                setErrorMsg("");
            } else {
                setErrorMsg(data.message);
                setSuccessMsg("");
            }
        } catch (error: any) {
            setErrorMsg(error.message);
            setSuccessMsg("");
        }
        setIsLoading(false);
    };

    const getCurrentLocation = () => {
        return new Promise<{ latitude: number, longitude: number }>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    resolve({ latitude, longitude });
                },
                (error) => reject(error),
                { enableHighAccuracy: true }
            );
        });
    };


    return (
        <>
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons>
                            <IonBackButton defaultHref="/profile" />
                        </IonButtons>

                        <IonTitle>Send SMS</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent >
                    <IonInput style={{
                        marginTop: "30px",
                        marginLeft: "20px",
                        border: "1px solid blue",
                        boxSizing: "border-box",
                        borderRadius: "4px",
                        padding: "10px",
                        fontSize: "16px",

                    }}
                        placeholder="Phone Number"
                        value={phoneNumber}
                        type="number"
                        onIonChange={(e) => setPhoneNumber(e.detail.value!)}
                    />
                    <IonInput style={{

                        marginLeft: "20px",
                        height: "130px",
                        MaxWidth: "200px",
                        border: "1px solid blue",
                        boxSizing: "border-box",
                        borderRadius: "4px",
                        padding: "10px",
                        fontSize: "16px",
                        lineHeight: "24px",
                        color: "white",
                        backgroundColor: "primary",

                    }}
                        placeholder="Message"
                        value={message}
                        onIonChange={(e) => setMessage(e.detail.value!)}
                    />
                    <IonButton
                        expand="block"
                        onClick={handleSendSMS}
                        disabled={isLoading}
                    >
                        Send SMS
                    </IonButton>
                    {successMsg && (
                        <IonText color="success">
                            <p>{successMsg}</p>
                        </IonText>
                    )}
                    {errorMsg && (
                        <IonText color="danger">
                            <p>{errorMsg}</p>
                        </IonText>
                    )}

                </IonContent>
            </IonPage>
        </>
    );
};
