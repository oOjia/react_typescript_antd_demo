import * as React from 'react';
// import {Button} from 'antd';
// import Button from 'antd/lib/button';
import './App.css';
import Main from './view/Main';
import { Route } from 'react-router-dom';

// import logo from './logo.svg';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header> */}
        <div className="layout">
            <Route path="/" component={Main as any} />
        </div>
        {/* <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
          <Button type="primary">Button</Button> */}
      </div>
    );
  }
}

export default App;
