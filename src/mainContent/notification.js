import React from "react";
import { Button, notification } from 'antd';

export default function Notification(props){

    const openNotification = () => {
        notification.open({
          message: 'Notification Title',
          description:
            'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
          onClick: () => {
            //console.log('Notification Clicked!');
          },
        });
    };

    return(
        <Button type="primary" onClick={openNotification}>
            Open the notification box
        </Button>
    );
}



