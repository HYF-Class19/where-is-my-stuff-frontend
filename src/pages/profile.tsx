import React from "react";
import { IonBackButton, IonButtons, IonCard, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenu, IonMenuButton, IonMenuToggle, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { callOutline, homeOutline, settingsOutline, logOut, helpCircleOutline, albumsOutline, atSharp, chatbox, idCardSharp, personAddOutline, atCircleOutline, textSharp, callSharp, location, storefrontSharp, addCircle, chatbubble } from "ionicons/icons";
import "./styles/Profile.css";
import { logoutUser } from "../authentication/auth";
import { auth } from "../database/realTimeDatabase";


export const Profile: React.FC = () => {
    const currentUser = auth.currentUser;

    const handleSignOut = async () => {

        try {
            const res = await logoutUser();
            //if login success then show success toast
            if (res) {
                console.log("logout success");
            }
        } catch (error) {
            console.log("logout failed");
        }
    }

    return (
        <>
            <IonMenu side="start" contentId="profile-menu">
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonBackButton
                                defaultHref="/"
                            ></IonBackButton>
                        </IonButtons>
                        <IonTitle>Menu</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonList>
                        <IonItem routerLink="/home" routerDirection="none">
                            <IonIcon slot="start" icon={homeOutline} />
                            <IonLabel>Home</IonLabel>
                        </IonItem>
                        <IonItem routerLink="/settings" routerDirection="none">
                            <IonIcon slot="start" icon={settingsOutline} />
                            <IonLabel>Settings</IonLabel>
                        </IonItem>
                        <IonItem routerLink="/about" routerDirection="none">
                            <IonIcon slot="start" icon={albumsOutline} />
                            <IonLabel>About</IonLabel>
                        </IonItem>
                        <IonItem disabled routerLink="/help" routerDirection="none">

                            <IonIcon slot="start" icon={helpCircleOutline} />
                            <IonLabel>Help</IonLabel>
                        </IonItem>
                        <IonItem disabled routerLink="/contact" routerDirection="none">
                            <IonIcon slot="start" icon={callOutline} />
                            <IonLabel>Contact</IonLabel>
                        </IonItem>
                        <IonItem disabled routerLink="/feedback" routerDirection="none">
                            <IonIcon slot="start" icon={atSharp} />
                            <IonLabel>Feedback</IonLabel>
                        </IonItem>
                        <IonItem routerLink="/chat" routerDirection="none">
                            <IonIcon slot="start" icon={chatbox} />
                            <IonLabel>SMS</IonLabel>
                        </IonItem>

                        <IonMenuToggle>
                            <IonItem routerLink="/" routerDirection="none">
                                <IonIcon slot="start" icon={logOut}
                                    style={{
                                        color: "red"

                                    }}
                                />
                                <IonLabel style={{ color: "red" }} onClick={handleSignOut}>Sign out </IonLabel>
                            </IonItem>
                        </IonMenuToggle>
                    </IonList>
                </IonContent>
            </IonMenu>
            <IonPage id="profile-menu">
                <IonHeader>
                    <IonToolbar>
                        <IonMenuButton slot="start" />
                        <IonTitle>Profile</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonItem >
                        <IonIcon slot="start" icon={personAddOutline}></IonIcon>
                        <IonLabel>Me</IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonIcon slot="start" icon={idCardSharp}></IonIcon>
                        <IonLabel>ID: {currentUser?.uid}</IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonIcon slot="start" icon={atCircleOutline}></IonIcon>
                        <IonLabel>Email:{currentUser?.email}</IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonIcon slot="start" icon={textSharp}></IonIcon>
                        <IonLabel>userName:</IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonIcon slot="start" icon={callSharp}></IonIcon>
                        <IonLabel>Phone:</IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonIcon slot="start" icon={location}></IonIcon>
                        <IonLabel>Address:</IonLabel>
                    </IonItem>
                    <IonCard>

                        <IonItem routerLink="/add" routerDirection="none">
                            <IonIcon slot="start" icon={addCircle} />
                            <IonLabel>Add To be borrow it</IonLabel>
                        </IonItem>
                        <IonItem routerLink="/myStore" routerDirection="none">
                            <IonIcon slot="start" icon={storefrontSharp}></IonIcon>
                            <IonLabel>My store</IonLabel>
                        </IonItem>
                        <IonItem routerLink="/myChat" routerDirection="none">
                            <IonIcon slot="start" color="success" icon={chatbubble}></IonIcon>
                            <IonLabel>My Chat</IonLabel>
                        </IonItem>
                    </IonCard>
                </IonContent>
            </IonPage>
        </>
    );
}
