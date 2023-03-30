import React, {useState} from 'react';
import { IonList, IonItem, IonItemDivider, IonLabel, IonIcon, IonModal } from '@ionic/react';
import {chevronForwardOutline} from 'ionicons/icons';
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
    <IonList>
      {groups.map(([letter, items]) => (
        <React.Fragment key={letter}>
          <IonItemDivider class="my-divider" sticky>
            {letter}
          </IonItemDivider>
          
          {items.map(item => (
            <IonItem  onClick={handleClick}>
            <IonLabel key={item.id}>
              {item.name}
            </IonLabel>
            <IonIcon icon={chevronForwardOutline} />
            <IonModal isOpen={showModal} onDidDismiss={handleClose}>
             <IonLabel>
               Here should show the details of the clicked item 
             </IonLabel>
           </IonModal>

            </IonItem>
            
          ))}
        </React.Fragment>
      ))}
    </IonList>
  )
          
}
