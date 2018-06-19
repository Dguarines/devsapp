import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import Reducers from './src/Reducers';

import Preload   from './src/screen/Preload';
import Home      from './src/screen/Home';
import Conversas from './src/screen/Conversas';
import SignUp    from './src/screen/SingUp';
import SignIn    from './src/screen/SignIn'; 

let store = createStore(Reducers, applyMiddleware(ReduxThunk));

const Navegador = StackNavigator({
  Preload:{
    screen:Preload
  },
  Home:{
    screen:Home
  },
  Conversas:{
    screen:Conversas
  },
  SignUp:{
    screen:SignUp
  },
  SignIn:{
    screen:SignIn
  }
});

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navegador />
      </Provider>
    );
  }
}