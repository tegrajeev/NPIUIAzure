import React from "react";
import { Row, Col } from 'antd';
import logo from '../images/logo.png';
import stylesheader from './header.module.scss';

function Header(props){
    return(
        <Row gutter={0} className={stylesheader.header}>
            <Col span={4} className={stylesheader.logo}>
                <img src={logo} alt="Healthworks Logo" />
            </Col>
            {props.userName?.length>0 ?
                <Col span={3} push={17} className={stylesheader['client-name']}>
                    {`Hello ${props.userName}`}
                </Col>
                :''
            }
        </Row>
    )
}

export default Header;