import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet } from '@ionic/react';
import { homeOutline, notificationsOutline, enterOutline, exitOutline, personOutline } from 'ionicons/icons';
import { Route, Redirect } from 'react-router-dom';
import { IonReactRouter } from '@ionic/react-router';
import './Style/Footer.css'



import { Profile } from '../pages/profile';
import { Home } from '../pages/Home';
import { Lend } from '../pages/Lend';
import { Reminder } from '../pages/Reminder';
import { Borrow } from '../pages/Borrow';
import About from '../services/About';
import { Settings } from '../services/Settings';
import { LendingHistory } from '../services/LendingHistory';
import { Chat } from '../services/Sms';
import { AddToBeBorrow } from '../services/AddToBeBorrow';
import { MyStore } from '../services/MyStore';
import { MyChat } from '../services/MyChat';



const Footer: React.FC = () => {

  return (
    <IonTabs className='footer-ion-tab'>
      <IonRouterOutlet>
        <IonReactRouter>
          <Route exact path="/profile">
            <Profile />
          </Route>
          <Route exact path="/">
            <Redirect to="/profile" />
          </Route>

          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/lend">
            <Lend />
          </Route>
          <Route exact path="/borrow">
            <Borrow />
          </Route>
          <Route exact path="/reminder">
            <Reminder />
          </Route>

          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/settings">
            <Settings />
          </Route>
          <Route exact path="/history">
            <LendingHistory />
          </Route>
          <Route exact path="/chat">
            <Chat />
          </Route>
          <Route exact path="/add">
            <AddToBeBorrow />
          </Route>
          <Route exact path="/mystore">
            <MyStore />
          </Route>
          <Route exact path="/mychat">
            <MyChat chatId={''} />
          </Route>

        </IonReactRouter>
      </IonRouterOutlet>

      <IonTabBar slot="bottom" className='tab-bar-footer'>
        <IonTabButton tab="profile" href="/profile">
          <IonIcon icon={personOutline} />
          <IonLabel>Profile</IonLabel>
        </IonTabButton>

        <IonTabButton tab="home" href="/home">
          <IonIcon icon={homeOutline} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>

        <IonTabButton tab="exit" href="/lend">
          <IonIcon icon={exitOutline} />
          <IonLabel>Lend out items</IonLabel>
        </IonTabButton>
        <IonTabButton tab="enter" href='/borrow'>
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