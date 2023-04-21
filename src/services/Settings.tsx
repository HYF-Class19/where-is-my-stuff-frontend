import { IonButtons, IonContent, IonHeader, IonItem, IonList, IonMenu, IonPage, IonTitle, IonToolbar, IonMenuButton, IonIcon, IonLabel, IonToggle } from "@ionic/react";
import {
    calendar, language, locateOutline, moonOutline, personRemoveOutline
} from "ionicons/icons";
import Menu from "../components/Home/Menu";
import { useThemeContext } from "../context/ThemeContext";

export const Settings: React.FC = () => {
    const { isDarkMode, toggleDarkMode } = useThemeContext();

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

