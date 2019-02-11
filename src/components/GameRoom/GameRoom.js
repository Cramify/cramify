export default class GameRoom extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pointCount: 0,
            questions: [],
            correctAnswer: '',
            users: [],
            creator: false
        }
    }

    render() {
        return (
            <div>
                GameRoom
            </div>
        )
    }
}