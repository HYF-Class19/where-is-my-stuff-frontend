import {
  IonHeader,
  IonItem,
  IonLabel,
  IonMenu,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
const Menu: React.FC = () => {
  return (
    <>
      <IonMenu contentId="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Items Listining</IonTitle>
          </IonToolbar>
          <IonItem href="#">
            <IonLabel>Borrowing process</IonLabel>
          </IonItem>

          <IonItem href="#">
            <IonLabel>Lending history</IonLabel>
          </IonItem>

          <IonItem href="#">
            <IonLabel>Communication</IonLabel>
          </IonItem>

          <IonItem href="#">
            <IonLabel>User ratings</IonLabel>
          </IonItem>
        </IonHeader>
      </IonMenu>
    </>
  );
};
export default Menu;
