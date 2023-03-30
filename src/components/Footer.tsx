import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet } from '@ionic/react';
import { homeOutline, notificationsOutline, enterOutline, exitOutline } from 'ionicons/icons';
import { Route, Redirect } from 'react-router-dom';
import Home from '../pages/Home'; 

const Footer: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <IonReactRouter>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route exact path="/lend">
            <Lend />
          </Route>
          <Route exact path="/borrow">
            <h1>Borrowed items</h1>
          </Route>
          <Route exact path="/reminder">
            <Reminder />
          </Route>
        </IonReactRouter>
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/home">
          <IonIcon icon={homeOutline} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>

        <IonTabButton tab="exit" href="/lend">
          <IonIcon icon={exitOutline} />
          <IonLabel>Lend out items</IonLabel>
        </IonTabButton>
        <IonTabButton tab="enter" onClick={showAlert}>
          <IonIcon icon={enterOutline} />
          <IonLabel>Borrowed items</IonLabel>
        </IonTabButton>
        <IonTabButton tab="notifications" href="/reminder">
          <IonIcon icon={notificationsOutline} />
          <IonLabel>Reminder</IonLabel>
        </IonTabButton>

      </IonTabBar>

    </IonTabs>

  );
}
export default Footer;