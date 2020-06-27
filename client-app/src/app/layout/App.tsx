import React, { useState, useEffect } from 'react';
import { Header, Icon, List } from 'semantic-ui-react'
import { IToken } from '../../models/login';
import axios from 'axios';

const App = () => {

  const [token, setToken] = useState<IToken>()
  

  useEffect(() => {
    const requestData = {email: 'uchechukwu.igbokwe',pinAndToken:'1234'};
    
    axios
    .post<IToken>('https://localhost:44398/api/AuthenticateUser',requestData)
    .then(response => {
      setToken(response.data)
    });
  },[]);

  return (
    <div>
      <Header as='h2'>
        <Icon name='shipping fast' />
        <Header.Content>SmsMailSenderApp</Header.Content>
      </Header>

      <List>
        <List.Item>{token?.token}</List.Item>
      </List>
    </div>
  );
}

export default App;
