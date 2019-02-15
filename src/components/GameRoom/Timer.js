import React, {Component} from 'react'
import ReactCountdownClock from 'react-countdown-clock'
import {withRouter} from 'react-router-dom'

class Timer extends Component{

    reDirect = () => {
        this.props.history.push('/gameroom')
    }

    render(){
        return(
            <div>
                {/* Timer from react-countdown-clock*/}
                <ReactCountdownClock seconds={this.props.time}
                     color="#ea3546"
                     alpha={0.9}
                     size={this.props.size}
                     onComplete={this.props.timerFn} />
            </div>
        )
    }
}

export default withRouter(Timer)