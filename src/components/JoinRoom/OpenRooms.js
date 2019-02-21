import React, {Component} from 'react';
import axios from 'axios';


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
                <div key={room.room_id}>
                    <h1>{room.game_code}</h1>
            <button onClick={()=>this.props.openRoomJoin(room.game_code)}>Join Current Game</button>
                </div>
            )
        })
        return(
            <div>Open Rooms
                    {rooms}
            </div>
        )
    }
}