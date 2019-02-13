import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import EditUser from './EditUser';

export default class DashBoard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userInput: '',
            imgURL: '',
            score: 0,
            edit: false,
            editSet: false,
            sets: [],
            setName: ''
        }
    }

    componentDidMount = async () => {
        const res = await axios.get('/set/user');
        this.setState({
            sets: res.data
        })
    }
    logout = () => {
        axios.post('/auth/logout')
    }

    toggleEdit = () => {
        this.setState({
            edit: !this.state.edit
        })
    }

    deleteSet = async (set_id) => {
        const res = await axios.delete(`/set/user/delete/${set_id}`)
        await this.setState({
            sets: res.data 
        })
        this.componentDidMount()
    }

    editSet = async (setID) => {
        this.props.history.push(`/editset/${setID}` )
    }


    render() {
        let sets = this.state.sets.map((set,i) => {
            return (
                <div key={i}>
                <p >{set.set_name}</p>
                    <button onClick={()=>this.deleteSet(set.set_id)}>Delete</button>
                    <button onClick={()=>this.editSet(set.set_id)}>Edit Your Set</button>
                    {/* {this.state.editSet && 
                    <EditSet
                        setName={this.state.setName}
                        setID ={set.set_id}
                     />} */}

                </div>
            )
        })

        return (
            <div>
                Dashboard
                <i className="fas fa-pen" onClick={this.toggleEdit} />
                <Link to='/'><button onClick={this.logout}>Logout</button></Link>
                {this.state.edit && <EditUser toggleFn={this.toggleEdit}/>}
               <Link to="/newset"><button >Create New Question Set</button></Link>
                <h2>Sets:{sets}</h2>
            </div>
        )
    }
}