import { dbRef } from "../db";
import React, { useState, useEffect } from 'react';
import { IonList, IonItem, IonLabel, IonItemDivider, IonIcon } from '@ionic/react';
import { chevronForwardOutline } from 'ionicons/icons';
import { child, get, onValue } from "firebase/database";
import { DetailComponent, DetailComponentProps } from '../Modal/ItemDetailsModal';
import './UserList.css'
interface UserListProps {
  items: {
    id: string;
    name: string;
  }[];
  detailComponentProps: DetailComponentProps;
}

interface ItemDetails {
  description: string;
  borrowerName: string;
  lendingDate: string;
  reminderDate: string;
}

const UserList: React.FC<UserListProps> = ({ items, detailComponentProps }) => {
  const [groupedItems, setGroupedItems] = useState<{ letter: string; items: { id: string; name: string }[] }[]>([]);
  const [selectedItem, setSelectedItem] = useState<{ name: string, details: ItemDetails } | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = async (item: { id: string, name: string }) => {
    const itemDetailsRef = child(dbRef, `items/${item.id}`);
    const itemDetailsSnapshot = await get(itemDetailsRef);
    const itemDetails = itemDetailsSnapshot.val() as ItemDetails;
    setSelectedItem({ name: item.name, details: itemDetails });
    setIsOpen(true);
  };

  useEffect(() => {
    if (dbRef) {
      const itemsRef = child(dbRef, 'items');
      onValue(itemsRef, (snapshot) => {
        const data = snapshot.val();
        const newItems: { id: string; name: string }[] = [];
        if (data) {
          Object.keys(data).forEach((key) => {
            newItems.push({
              id: key,
              name: data[key].name,
            });
          });
        }
        setGroupedItems(
          newItems.reduce<{ letter: string; items: { id: string; name: string }[] }[]>(
            (result, item) => {
              const letter = item.name[0].toUpperCase();
              const index = result.findIndex((group) => group.letter === letter);
              if (index >= 0) {
                result[index].items.push(item);
              } else {
                result.push({ letter, items: [item] });
              }
              return result;
            },
            []
          )
        );
      });
    }
  }, []);

  const closeModal = () => setIsOpen(false);

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
      .map(([letter, items]) => ({ letter, items: items.map(({ id, name }) => ({ id, name })) }));
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
            <IonItem key={item.id} onClick={() => handleClick(item)}>
              <IonLabel>{item.name}</IonLabel>
              <IonIcon icon={chevronForwardOutline} />
            </IonItem>
          ))}
        </React.Fragment>
      ))}
      
      <DetailComponent isOpen={isOpen} onDismiss={closeModal}
  itemName={selectedItem?.name || ''}
  description={selectedItem?.details?.description || ''}
  to={selectedItem?.details?.borrowerName || ''}
  on={selectedItem?.details?.lendingDate || ''}
  handleActionSheet={() => {}} />
      
</IonList>
)}

export default UserList;






