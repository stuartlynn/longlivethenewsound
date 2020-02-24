import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import 'typeface-roboto'
import Notifier from './components/Notifier'
import HomePage from './components/HomePage'
import Admin from './components/Admin'
import Listen from './components/Listen'
import ListPage from './components/ListPage'
import { BrowserRouter, Route} from 'react-router-dom'

const Container = styled.div`
 display:grid;
 align-content: center;
 justify-content: center;
`;


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Container>
          <Route exact path='/' component={HomePage}/>

          <Route path='/admin' component={Admin}/>
          <Route exact={true} path='/listen/:slug' component={Listen}/>

          <Route exact={true} path='/episodes' component={ListPage}/>

          <Notifier />
        </Container>
      </BrowserRouter>

    );
  }
}

export default App;
