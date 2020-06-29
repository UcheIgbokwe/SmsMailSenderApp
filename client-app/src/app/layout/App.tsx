import React, { useState, Fragment } from 'react';
import { List, Container } from 'semantic-ui-react'
import { IToken } from '../../models/login';
import NavBar from '../../features/nav/NavBar';
import UploadDashboard from '../../features/upload/dashboard/UploadDashboard'

const App = () => {

  const [token] = useState<IToken>()
  

  

  return (
    <Fragment>
      <NavBar/>
      <Container style={{marginTop: '10em'}}>
      <UploadDashboard/>
      </Container>
      <List>
        <List.Item>{token?.token}</List.Item>
      </List>
    </Fragment>
  );
}

export default App;
