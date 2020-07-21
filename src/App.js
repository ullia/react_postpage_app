import React, { Component } from 'react';
import { Header } from './components';
import { PostContainer } from './container';
// import Header from './components/Header/Header';
// import PostContainer from './container/PostContainer/PostContainer';

class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <PostContainer/>
      </div>
    );
  }
}

export default App;