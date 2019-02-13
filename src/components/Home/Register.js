import React, {Component} from 'react';
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {updateUser} from '../../ducks/reducer'
import './Register.scss'

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
        if(password !== checkPassword){
            return alert('Check YoSelf')
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
                    <div className='cancel' onClick={() => this.props.regFn()}>X</div>
                    <div className='user-input'>
                        <h2>Register</h2>
                        <input onChange={(e)=>this.handleInput('email', e)} type="text" placeholder='email'/>
                        <input onChange={(e)=>this.handleInput('username', e)} type="text" placeholder='username'/>
                        <input onChange={(e)=>this.handleInput('password', e)} type="password" placeholder='password'/>
                        <input onChange={(e)=>this.handleInput('checkPassword', e)} type="password" placeholder='confirm password'/>
                        <div className='register' onClick={this.register}>Register</div>
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