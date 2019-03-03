import React, { Component } from 'react';
import './App.css';
import Layout from './components/Layout';
import Header from './components/Header';

class App extends Component {
  render() {
    return (
      <Layout 
        header={() => <Header title="I'm in app" type="1" />}
        content={() => <div>I'm content</div>}
      />
    );
  }
}

export default App;
