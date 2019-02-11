import React, {Component} from 'react';

export default class Login extends Component{
    constructor(props){
        super(props);
        
        this.state = {
            emailInput: '',
            passwordInput: ''
        }
    }
    render(){
        return(
            <div>Login
                <input type="text"/>
                <input type="password"/>
                <button>Login</button>
            </div>
        )
    }
}