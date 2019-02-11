import React, {Component} from 'react';
import axios from 'axios'

export default class Register extends Component{
    constructor(props){
        super(props);
        
        this.state = {
            email: '',
            password: '',
            checkPassword: '',
            username: '',
        }
    }
    
    handleInput = (prop, e) => {
        this.setState({
            [prop]: e.target.value
        })
    }

    register = async () =>{
        const {email, username, password, checkPassword} = this.state;
        if(password !== checkPassword){
            return alert('Check YoSelf')
        }
        const res = await axios.post('/auth/register', {email, username, password})
    }


    render(){
        return(
            <div>
                Register
                <input onChange={(e)=>this.handleInput('email', e)} type="text" placeholder='email'/>
                <input onChange={(e)=>this.handleInput('username', e)} type="text" placeholder='username'/>
                <input onChange={(e)=>this.handleInput('password', e)} type="password" placeholder='password'/>
                <input onChange={(e)=>this.handleInput('checkPassword', e)} type="password" placeholder='confirm password'/>
                <button onClick={this.register}>Register</button>
            </div>
        )
    }
}