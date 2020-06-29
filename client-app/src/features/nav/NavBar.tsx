import React from 'react'
import { Button, Menu, Container } from 'semantic-ui-react'

const NavBar = () => {
    return (
      <Menu fixed='top' inverted size="small">
          <Container>
            <Menu.Item header>
                <img src="/assets/zenithlogo.png" alt="logo" style={{marginRight: '10px'}}/>
                SmsMailApp
            </Menu.Item> 
            <Menu.Item name="home" />
            <Menu.Item name="messages" />

            <Menu.Menu position="right">
            <Menu.Item>
                <Button primary>Sign Out</Button>
            </Menu.Item>
            </Menu.Menu>
          </Container>
      </Menu>
    );
}

export default NavBar
