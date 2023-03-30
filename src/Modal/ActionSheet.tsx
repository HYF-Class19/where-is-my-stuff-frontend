import React, { useState } from 'react';
import { IonActionSheet, IonButton, useIonActionSheet } from '@ionic/react';
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';

interface ActionSheetProps {
    isOpen: boolean;
    onDismiss: () => void;
    onDelete: () => void;
    onUpdate: () => void;
}

const ActionSheet: React.FC<ActionSheetProps> = ({ isOpen, onDismiss, onDelete, onUpdate }) => {
    const [present] = useIonActionSheet();
    const [result, setResult] = useState<OverlayEventDetail>();
    return (
        <div className="container">
            <IonActionSheet isOpen={false}
                onDidDismiss={e => setResult(e.detail)}
                buttons={[{
                    text: 'Delete',
                    role: 'destructive',
                    icon: 'trash',
                    handler: () => {
                        console.log('Delete clicked');
                        onDelete();
                    }
                }, {
                    text: 'Update',
                    icon: 'share',
                    handler: () => {
                        console.log('Share clicked');
                        onUpdate();
                    }
                }, {
                    text: 'Cancel',
                    icon: 'close',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }]}


            >
                Open
            </IonActionSheet>

            {/* <IonButton onClick={() => present({
                buttons: [{
                    text: 'Delete',
                    role: 'destructive',
                    icon: 'trash',
                    handler: () => {
                        console.log('Delete clicked');
                        onDelete();
                    }
                }, {
                    text: 'Update',
                    icon: 'share',
                    handler: () => {
                        console.log('Share clicked');
                        onUpdate();
                    }
                }, {
                    text: 'Cancel',
                    icon: 'close',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }],
                header: 'Albums',
                subHeader: 'Select an album to play'
            })}>Open Action Sheet</IonButton> */}

            <p>Result: {result ? JSON.stringify(result) : 'none'}</p>


        </div>
    );
};

export default ActionSheet;
