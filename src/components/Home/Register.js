import React, {Component} from 'react';
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {updateUser} from '../../ducks/reducer'
import '../../modal.scss';

class Register extends Component{
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
        if(email === ''){
            return alert('Please provide email')
        } else if(username === ''){
            return alert('Please choose a username')
        }else if(password === ''){
            return alert('Please create a password')
        }else 
        if(password !== checkPassword){
            return alert("Passwords don't match")
        }
        const res = await axios.post('/auth/register', {email, username, password})
        if (res.data.loggedIn) this.props.history.push('/dashboard')
        if (!res.data.loggedIn) alert(res.data.message)
        this.props.updateUser(res.data.userData)
    }


    render(){
        return(
            <div className='modal'>
                <div className='content'>
                    <i onClick={() => this.props.regFn()} className="fas fa-times fa-2x"></i>
                    <h2>Register</h2>
                    <div className='user-input'>
                        <input onChange={(e)=>this.handleInput('email', e)} type="text" placeholder='email'/>
                        <input onChange={(e)=>this.handleInput('username', e)} type="text" placeholder='username'/>
                        <input onChange={(e)=>this.handleInput('password', e)} type="password" placeholder='password'/>
                        <input onChange={(e)=>this.handleInput('checkPassword', e)} type="password" placeholder='confirm password'/>
                    </div>
                    <button className='button' onClick={this.register}>Register</button>
                    <div className='switch-modal'>
                        <h4>Already Have an Account?</h4>
                        <button onClick={() => {
                            this.props.regFn();
                            this.props.logFn();
                        }} className='button'>
                        Login
                    </button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {store}
}

export default connect(mapStateToProps, {updateUser})(withRouter(Register))