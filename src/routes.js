import React from 'react';
import {Switch, Route} from 'react-router-dom';

//imported components
import Home from './components/Home/Home';
import CreateRoom from './components/CreateRoom/CreateRoom';
import Dashboard from './components/Dashboard/Dashboard';
import GameRoom from './components/GameRoom/GameRoom';
import JoinRoom from './components/JoinRoom/JoinRoom';
import CreateSet from './components/Dashboard/CreateSet';
import EditSet from './components/Dashboard/EditSet'

export default (
    <Switch>
        <Route exact path = '/' component={Home}></Route>
        <Route path = '/create' component={CreateRoom}></Route>
        <Route path = '/dashboard' component={Dashboard}></Route>
        <Route path = '/gameroom/:setID' component={GameRoom}></Route>
        <Route path = '/join' component={JoinRoom}></Route>
        <Route path = '/newset' component={CreateSet}></Route>
        <Route path = '/editset/:setID' component={EditSet}></Route>
    </Switch>
)