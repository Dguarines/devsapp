import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';
//import { connect } from 'react-redux';

import ConversasList from './ConversasList';
import ContatoList   from './ContatoList';
import Config        from './Config';

const ConversasNavigator = TabNavigator({
    ConversasList:{
        screen:ConversasList, 
    },
    ContatoList:{
        screen:ContatoList
    },
    Config:{
        screen:Config
    }
}, {
    tabBarPosition:'bottom'
})

export default ConversasNavigator;