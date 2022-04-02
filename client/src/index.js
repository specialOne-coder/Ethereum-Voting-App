import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import { ElectionProvider } from './context/ElectionContext';

ReactDOM.render(
  <React.StrictMode>
    <ElectionProvider>
      <App />
    </ElectionProvider></React.StrictMode>,
  document.getElementById('root')
);

