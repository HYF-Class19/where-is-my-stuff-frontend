import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonText, IonButton, IonButtons } from '@ionic/react';
import React from 'react';

const About: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar >
                    <IonButtons>
                        <IonButton routerLink="/profile" routerDirection="none">Back</IonButton>
                    </IonButtons>
                    <IonTitle>About LendIt</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonText color="dark">
                    <p style={{ fontSize: "18px", textAlign: "center", margin: "20px" }}>
                        Welcome to LendIt! We are a lending platform designed to connect borrowers and lenders in a safe and secure way. Our mission is to help people save money and reduce waste by facilitating the sharing of resources and promoting a sharing economy.
                    </p>
                    <p style={{ fontSize: "18px", textAlign: "center", margin: "20px" }}>
                        At Lend It, we believe in the power of community and the benefits of sharing. We understand that people have different needs and financial situations, and we want to provide a platform where everyone can access the resources they need without breaking the bank.
                    </p>
                    <p style={{ fontSize: "18px", textAlign: "center", margin: "20px" }}>
                        Our platform is easy to use and provides a simple way to lend and borrow items from other members of the community. Whether you need a tool for a DIY project, a dress for a special occasion, or a book for your next vacation, you can find what you need on Lend It.
                    </p>
                    <p style={{ fontSize: "18px", textAlign: "center", margin: "20px" }}>
                        We also believe in the importance of trust and transparency. That's why we have a robust verification system to ensure that our members are who they say they are, and that their items are in good condition, helping to build trust and confidence within the community.
                    </p>
                    <p style={{ fontSize: "18px", textAlign: "center", margin: "20px" }}>
                        In addition, we are committed to sustainability and reducing waste. By sharing resources, we can reduce our environmental impact and promote a more sustainable way of living. We believe that the sharing economy has the power to change the world, and we are excited to be a part of it.
                    </p>
                </IonText>
                <IonButton expand="block" color="secondary" href="/contact">Contact Us</IonButton>
            </IonContent>
        </IonPage>
    );
};

export default About;
