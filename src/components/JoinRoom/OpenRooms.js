import React, {Component} from 'react';
import axios from 'axios';
import './OpenRooms.scss'


export default class OpenRooms extends Component {
    constructor(props){
        super(props);
        
        this.state={
            rooms: []
        }
    }

    componentDidMount = async () => {
        await this.getRooms()
    }
    getRooms = async () => {
        const res = await axios.get('/game/rooms');
        this.setState({
            rooms: res.data
        })
        console.log(this.state.rooms)
    }
    
    
    render(){
        const rooms = this.state.rooms.map(room => {
            return(
                <div className='game' key={room.room_id}>
                    <h1 className='gameCode'>{room.game_code}</h1>
                    <button className='joinBtn' onClick={()=>this.props.openRoomJoin(room.game_code)}>Join Game</button>
                </div>
            )
        })
        return(
            <div className='openRoom'>
                <h1 className='openTitle'>Open Rooms</h1>
                {rooms}
            </div>
        )
    }
}