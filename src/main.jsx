// lib/main.dart + lib/app.dart
import React from 'react';
import ReactDOM from 'react-dom/client';
import { EditBar } from './components/editable';
import Account from './screens/Account';
import Credit from './screens/Credit';
import EasyInvest from './screens/EasyInvest';
import Home from './screens/Home';
import Loan from './screens/Loan';
import { Block, Charge, Deposit, Payment, Pix, Recharge, Refer, Transfer } from './screens/Sheets';
import { AppStateProvider, NavigatorProvider, useAppState } from './state';
import './theme.css';

const screens = {
  Home,
  Account,
  Credit,
  Loan,
  EasyInvest,
  Pix,
  Payment,
  Deposit,
  Transfer,
  Recharge,
  Charge,
  Refer,
  Block,
};

function Shell() {
  const { editMode } = useAppState();
  return (
    <div className={`shell ${editMode ? 'editing' : ''}`}>
      <NavigatorProvider home="Home" screens={screens} />
      <EditBar />
    </div>
  );
}

function App() {
  return (
    <AppStateProvider>
      <Shell />
    </AppStateProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
