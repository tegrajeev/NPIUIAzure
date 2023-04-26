import React from "react";
import { Row, Col } from 'antd';

function Footer(){
    return(
        <Row>
            <Col span={24} style={{textAlign: 'center',padding:'0.5rem 2rem 0.6rem 2rem'}}>
                Copyright &copy; HealthWorksAI {new Date().getFullYear()}
            </Col>
        </Row>
    )
}

export default Footer;