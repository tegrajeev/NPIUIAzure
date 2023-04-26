import React from 'react';
import styles from './home.module.scss';
import Header from './header';
import Maincontent from './mainContent';
import Footer from './footer';
import 'antd/dist/antd.css';
import {validateUserID} from './requests';
import { notification } from 'antd';

//home function

function Homepage() {

  const [userID,setuserID] = React.useState('');
  const [ClientId,setClientId] = React.useState(null);
  const [userName,setuserName] = React.useState(null);
  const [headerFooterHeight,setheaderFooterHeight] = React.useState('145px');

  React.useEffect(async()=>{
    let userid = window?.location.pathname.replaceAll('/npi-search/','');
    userid = userid.replaceAll('/','');
    setuserID(userid);
    let result = await validateUserID(userid);
    setClientId(result[0]?.ClientId||null);
    setuserName(result[0]?.FirstName||null);
    let height = document?.getElementById('header')?.offsetHeight+
    document?.getElementById('footer')?.offsetHeight;
    setheaderFooterHeight(height);
    if(!result[0]?.FirstName?.length){
      openNotification('Access Denied','Access Denied','error',1111)
    }
  },[])

  const openNotification = (title,msg,type,time) => {
    notification[type]({
      message: msg,
      duration: time || 2,
      //title,
      // description: msg,
    });
  };

  return (
    <React.Fragment>
    {userID?.length && ClientId ?
      <React.Fragment>
        <Header userName={userName} />      
        <Maincontent userName={userName} ClientId={ClientId} userid={userID} />
        <Footer />
      </React.Fragment>  
      :
      <React.Fragment>
        <div id="header">
          <Header userName={userName} />
        </div>
        <div style={{height:`calc(100vh - ${headerFooterHeight})`}}></div>
        <div id="footer">
          <Footer />
        </div>
      </React.Fragment>  
    }
  </React.Fragment>
  );
}

export default Homepage;
