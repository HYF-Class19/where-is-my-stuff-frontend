import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact,IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel  } from '@ionic/react';
import { homeOutline, notificationsOutline, enterOutline, exitOutline } from 'ionicons/icons';
import { IonReactRouter } from '@ionic/react-router';

import Home from './pages/Home';
import { showAlert } from './components/Alert';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
          <IonTabs>
   
      <IonRouterOutlet>
      <IonReactRouter>
        <Route exact path="/home">
          <Home />
        </Route>

        <Route exact path="/">
          <Redirect to="/home" />   
        </Route>

        <Route exact path="/lendoutitems">
       <h1>Lend Out Items</h1>
        </Route>

        <Route exact path="/borroweditems">
        <h1>Borrowed items</h1>
      </Route>

      <Route exact path="/reminder">
        <h1>Reminder</h1>
      </Route>

        </IonReactRouter>
      </IonRouterOutlet>
 

    <IonTabBar slot="bottom">
      <IonTabButton tab="home" href = "/home">
        <IonIcon icon={homeOutline} />
        <IonLabel>Home</IonLabel>
      </IonTabButton>
   
      <IonTabButton tab="exit" href = "/lendoutitems">
        <IonIcon icon={exitOutline} />
        <IonLabel>Lend out items</IonLabel>
      </IonTabButton>
      <IonTabButton tab="enter" onClick={showAlert}>
        <IonIcon icon={enterOutline} />
        <IonLabel>Borrowed items</IonLabel>
      </IonTabButton>
      <IonTabButton tab="notifications">
        <IonIcon icon={notificationsOutline} />
        <IonLabel>Reminder</IonLabel>
      </IonTabButton>

    </IonTabBar>
 
  </IonTabs>
  </IonApp>


);

export default App;


