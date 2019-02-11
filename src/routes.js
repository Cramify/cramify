import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';

//imported components
import Home from './components/Home/Home';
import CreateRoom from './components/CreateRoom/CreateRoom';
import Dashboard from './components/Dashboard/Dashboard';
import GameRoom from './components/GameRoom/GameRoom';
import JoinRoom from './components/JoinRoom/JoinRoom';


export default (
    <Switch>
        <Route exact path = '/' component={Home}></Route>
        <Route path = '/create' component={CreateRoom}></Route>
        <Route path = '/dashboard' component={Dashboard}></Route>
        <Route path = '/gameroom' component={GameRoom}></Route>
        <Route path = '/join' component={JoinRoom}></Route>
    </Switch>
)