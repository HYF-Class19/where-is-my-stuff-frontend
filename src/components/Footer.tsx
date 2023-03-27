import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet } from '@ionic/react';
import { homeOutline, notificationsOutline, enterOutline, exitOutline } from 'ionicons/icons';
import { Route, Redirect } from 'react-router-dom';
import Home from '../pages/Home'; 

const Footer: React.FC = () =>  {
  return (
    <>
      <IonTabs >
    <IonRouterOutlet>
      <Redirect exact path="/" to="/home" />
      <Route exact path="/home">
      <Home />
      </Route>
      <Route exact path="/reminder">
        <h1>Reminder</h1>
      </Route>
      <Route exact path="/borroweditems">
        <h1>Borrowed items</h1>
      </Route>
      <Route exact path="/lendoutitems">
        <h1>Lend out items</h1>
      </Route>
    </IonRouterOutlet>

    <IonTabBar slot="bottom">
      <IonTabButton tab="home">
        <IonIcon icon={homeOutline} />
        <IonLabel>Home</IonLabel>
      </IonTabButton>
   
      <IonTabButton tab="exit">
        <IonIcon icon={exitOutline} />
        <IonLabel>Lend out items</IonLabel>
      </IonTabButton>

      <IonTabButton tab="enter">
        <IonIcon icon={enterOutline} />
        <IonLabel>Borrowed items</IonLabel>
      </IonTabButton>

      <IonTabButton tab="notifications">
        <IonIcon icon={notificationsOutline} />
        <IonLabel>Reminder</IonLabel>
      </IonTabButton>

    </IonTabBar>
 
  </IonTabs>
</>
  );
}

export default Footer;