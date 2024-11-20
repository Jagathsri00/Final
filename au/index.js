import React from 'react';
import ReactDOM, { render } from 'react-dom';
import './index.css';
import App from './App';
import {Auth0Provider} from '@auth0/auth0-react';

const clientId=process.env.REACT_APP_CLIENTID;
const domain=process.env.REACT_APP_DOMAIN;

ReactDOM.render(
<Auth0Provider
clientId={clientId}
domain={domain}
redirectUri={window.location.origin}
>
  <App />
</Auth0Provider>,
document.getElementById('root')
);


