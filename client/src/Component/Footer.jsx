import React from 'react';
import { Layout, Row, Col } from 'antd';
import { Link } from 'react-router-dom';

const { Footer } = Layout;

const AppFooter = () => {
  return (
    <Footer style={{
      background: 'rgb(83, 108, 121)',
      color: 'white',
      left: '0',
      bottom: '0',
      width: '100%',
      height: 'auto',
      fontSize: '15px',
      position: 'fixed'
    }}>
      <Row justify="center" align="middle" style={{ height: '100%' }}>
        <Col span={24} md={18} lg={12}>
          <Row justify="space-between" align="middle">
           
            <Col style={{ justifyContent: 'space-between'}}>
              Fun Olympic Pvt. Ltd.<p />
              <p>City of Yokyo</p>
              <p>contact@funolympic.com</p>
            </Col>

            <Col style={{justifyContent: 'space-between'}}>
              <h5 style={{ textDecoration: 'underline' }}>Quick Links</h5>

              <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>Home</Link><p />

              <Link to="/about" style={{ textDecoration: 'none', color: 'white' }}>About Us</Link><p />

              <Link to="/contact-us" style={{ textDecoration: 'none', color: 'white' }}>Contact Us</Link>

            </Col>

            <Col style={{justifyContent: 'space-between'}}>
            <h5 style={{ textDecoration: 'underline'}}>Sports Links</h5>

              <Link to="/live" style={{ textDecoration: 'none', color: 'white' }}>Live</Link><p />

              <Link to="/highlight" style={{ textDecoration: 'none', color: 'white' }}>Highlight</Link><p />
            </Col>
          </Row>
          <Row justify="center" style={{ marginTop: '1rem' }}>
            <Col>
              <p>&copy; 2023. All Rights Reserved.</p>
            </Col>
          </Row>
        </Col>
      </Row>
    </Footer>
  );
};

export default AppFooter;
