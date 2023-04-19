import {  IonButtons, IonContent, IonHeader, IonItem, IonList, IonMenu, IonPage, IonTitle, IonToolbar, IonMenuButton, IonIcon, IonLabel, IonToggle } from "@ionic/react";
import {
    calendar, language, locateOutline, moonOutline, personRemoveOutline
} from "ionicons/icons";
import { useEffect, useState } from "react";
import Menu from "../components/Home/Menu";

export const Settings: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = useState(true);

    function toggleDarkMode(ev: CustomEvent) {
        const isDark = ev.detail.checked;
        setIsDarkMode(isDark);
        document.body.classList.toggle('dark', isDark);
    }

    useEffect(() => {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        setIsDarkMode(prefersDark.matches);
        document.body.classList.toggle('dark', prefersDark.matches);
    }, [
        setIsDarkMode

    ]);


    return (
        <>
            <IonMenu side="start" contentId="settings-menu">
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                           
                        </IonButtons>
                        <IonTitle>Settings</IonTitle>
                    </IonToolbar>
                </IonHeader>
            </IonMenu>
            <IonPage id="settings-menu">
                <Menu />
                <IonHeader>
                    <IonToolbar>
                        <IonMenuButton slot="start" />
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonList>
                        <IonItem>

                            <IonIcon slot="start" icon={moonOutline} />
                            <IonLabel>Appearance</IonLabel>
                            <IonToggle id="themeToggle" slot="end"
                                checked={isDarkMode}
                                onIonChange={toggleDarkMode}  
                            ></IonToggle>
                        </IonItem>
                        <IonItem routerLink="/history" routerDirection="none">
                            <IonIcon slot="start" icon={calendar} />
                            <IonLabel>History</IonLabel>
                        </IonItem>
                        <IonItem routerLink="/language" routerDirection="none">
                            <IonIcon slot="start" icon={language} />
                            <IonLabel>Language</IonLabel>
                        </IonItem>
                        <IonItem routerLink="/location" routerDirection="none">
                            <IonIcon slot="start" icon={locateOutline} />
                            <IonLabel>Location</IonLabel>
                        </IonItem>
                        <IonItem routerLink="/privacy" routerDirection="none">
                            <IonIcon slot="start" icon={personRemoveOutline} />
                            <IonLabel>Privacy </IonLabel>
                        </IonItem>
                    </IonList>
                </IonContent>
            </IonPage>

        </>
    );
}
