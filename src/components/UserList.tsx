import React, { useState, useEffect } from 'react';
import { IonList, IonItem, IonLabel, IonItemDivider, IonIcon, IonModal, IonButtons, IonButton } from '@ionic/react';
import './UserList.css'
import { chevronBack, chevronForwardOutline } from 'ionicons/icons';

interface UserListProps {
  items: {
    id: string;
    name: string;
  }[];
}

const UserList: React.FC<UserListProps> = ({ items }) => {
  const [groupedItems, setGroupedItems] = useState<{ letter: string; items: { id: string; name: string }[] }[]>([]);
 
  const [showModal, setShowModal] = useState(false);



  const handleClick = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const grouped = items.reduce<{ [letter: string]: { id: string; name: string }[] }>((result, item) => {
      const letter = item.name[0].toUpperCase();
      if (!result[letter]) {
        result[letter] = [];
      }
      result[letter].push(item);
      return result;
    }, {});
    const sortedGrouped = Object.entries(grouped)
      .sort()
      .map(([letter, items]) => ({ letter, items }));
    setGroupedItems(sortedGrouped);
  }, [items]);

  return (
   
    <IonList>
      {groupedItems.map(({ letter, items }) => (
        <React.Fragment key={letter}>
          <IonItemDivider class="my-divider" sticky>
            {letter}
          </IonItemDivider>
          {items.map((item) => (
            <IonItem key={item.id} onClick={handleClick} >
              <IonLabel>{item.name}</IonLabel>
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
   
   
  );
};

export default UserList;