import React, {useState} from 'react';
import { IonList, IonItem, IonItemDivider, IonLabel, IonIcon, IonModal, IonButton, IonButtons} from '@ionic/react';
import {chevronForwardOutline , chevronBack} from 'ionicons/icons';
import './UserList.css';

interface Item {
  id: string;
  name: string;
}

interface UserListProps {
  items: Item[];
}

export const UserList: React.FC<UserListProps> = ({ items }) => {
  // Create an object to group the items by their first letter
  const groupedItems: Record<string, Item[]> = {};
  items.forEach(item => {
    const firstLetter = item.name[0].toUpperCase();
    if (!groupedItems[firstLetter]) {
      groupedItems[firstLetter] = [];
    }
    groupedItems[firstLetter].push(item);
  });

    // Convert the object to an array of groups
    const groups = Object.entries(groupedItems).sort(([a], [b]) => a.localeCompare(b));
   // create Modal 
  const [showModal, setShowModal] = useState(false);



  const handleClick = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <IonList style={{ marginTop: '30px' }}>
      {groups.map(([letter, items]) => (
        <React.Fragment key={letter}>
          <IonItemDivider class="my-divider" sticky>
            {letter}
          </IonItemDivider>
          
          {items.map(item => (
            <IonItem key={item.id} onClick={handleClick}>
            <IonLabel >
              {item.name}
            </IonLabel>
            <IonIcon icon={chevronForwardOutline} />
            </IonItem>
            
            ))}
            <IonModal isOpen={showModal} onDidDismiss={handleClose}>
              <IonButtons>
              <IonButton color="primary" onClick={handleClose}  >
              <IonIcon slot="start" icon={chevronBack} />
           Back
              </IonButton>
              </IonButtons>
           </IonModal>

          
        </React.Fragment>
      ))}
    </IonList>
  )
          
}
