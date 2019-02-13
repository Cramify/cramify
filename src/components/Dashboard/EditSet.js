import React, {Component} from 'react';
import axios from 'axios';


export default class EditSet extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            set: [],
            setName: '',
            questions: [],
            setID: {},
            junctionID: {},
        }
    }

    componentDidMount = async () => {
        const res = await axios.get(`/set/getedit/${this.props.match.params.setID}`);
        this.setState({
            sets: res.data[0].set_name
        })    
    }

    handleInput = (prop, e) => {
        this.setState({
            [prop]: e.target.value
        })
    }

    editSetName = async () => {

    }

    render(){
        return(
            <div>
                    <h3>{this.state.sets}</h3>
                <button>Edit Set</button>

            </div>
        )
    }
}