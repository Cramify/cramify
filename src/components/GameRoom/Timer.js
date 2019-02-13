import React, {Component} from 'react'
import ReactCountdownClock from 'react-countdown-clock'
import {withRouter} from 'react-router-dom'

class Timer extends Component{

    func = () => {
        this.props.history.push('/dashboard')
    }

    render(){
        return(
            <div>
                <ReactCountdownClock seconds={3}
                     color="#000"
                     alpha={0.9}
                     size={100}
                     onComplete={this.func} />
            </div>
        )
    }
}

export default withRouter(Timer)