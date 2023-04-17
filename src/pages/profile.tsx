import React from "react";
import { IonAvatar, IonCard, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenu, IonMenuButton, IonMenuToggle, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { callOutline, homeOutline, settingsOutline, logOut, helpCircleOutline, albumsOutline, atSharp, chatbox } from "ionicons/icons";
import "./styles/Profile.css";
import { logoutUser } from "../authentication/auth";
import { auth } from "../database/db";






export const Profile: React.FC = () => {

    const currentUser = auth.currentUser;

    const handleSignOut = async () => {

        try {
            const res = await logoutUser();
            //if login success then show success toast
            if (res) {
                alert('You have been logged out')

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
                        <IonTitle>Menu</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonList>
                        <IonItem routerLink="/home" routerDirection="none">
                            <IonIcon slot="start" icon={homeOutline} />
                            <IonLabel>Home</IonLabel>
                        </IonItem>
                        <IonItem disabled routerLink="/settings" routerDirection="none">
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
                            <IonIcon slot="start" icon={chatbox}
                                style={{
                                    color: "blue"
                                }}
                            />
                            <IonLabel
                                style={{
                                    color: "blue"
                                }}
                            >Chat</IonLabel>
                        </IonItem>
                        <IonMenuToggle>
                            <IonItem routerLink="/login" routerDirection="none">
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
                    <div className="profile-container">
                        <IonAvatar>
                            <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg"
                            />
                        </IonAvatar>


                    </div>
                    <IonCard style={{
                        display: "grid",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: "20px"
                    }}>
                        <IonItem><IonLabel>User ID:</IonLabel></IonItem>
                        <IonItem> <p>{currentUser?.uid}</p></IonItem>
                        <IonItem><IonLabel>Email:</IonLabel></IonItem>
                        <IonItem><p>{currentUser?.email}</p></IonItem>

                    </IonCard>
                </IonContent>
            </IonPage>
        </>
    );
}
