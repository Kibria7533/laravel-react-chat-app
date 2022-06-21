import React from 'react';
import ReactDOM from 'react-dom/client';
import {PusherProvider} from "@harelpls/use-pusher";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
const config = {
    clientKey: "e07a1de7d158f0f09e94",
    cluster: "ap2",
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <PusherProvider {...config}>
          <App />
      </PusherProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
