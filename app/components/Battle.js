const React = require('react');
const PropTypes = require('prop-types');
const { Link } = require('react-router-dom');

const PlayerPreview = (props) => (
  <div> 
    <div className="column">
      <img 
        src={props.avatar} 
        alt={`Avatar for ${props.userName}`} 
        className="avatar"
      />
      <h2 className="username">@{props.userName}</h2>
    </div>
    <button 
      className="reset"
      onClick={props.onReset.bind(null, props.id)}
    >
    Reset
    </button>
  </div>
)

PlayerPreview.propTypes = {
  avatar: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired,
}

class PlayerInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;

    this.setState(() => ({userName: value}));
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.onSubmit(
      this.props.id,
      this.state.userName
    )
  }
  
  render() {
    return (
      <form className="column" onSubmit={this.handleSubmit}>
        <label htmlFor="userName" className="header">
          {this.props.label}
        </label>
        <input 
          id = 'userName'
          placeholder = 'github username'
          type = "text"
          autoComplete = 'off'
          value = {this.state.userName}
          onChange = {this.handleChange}
        />
        <button 
          className="button"
          type = 'submit'
          disabled = {!this.state.userName}
        >
          Submit
        </button>
      </form>
    )
  }
}

PlayerInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,  
  onSubmit: PropTypes.func.isRequired,
}

class Battle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playerOneName: '',
      playerTwoName: '',
      playerOneImage: null,
      playerTwoImage: null,
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    
  }

  handleSubmit(id, userName) {
    this.setState(() => {
      let newState = {};
      newState[`${id}Name`] = userName;
      newState[`${id}Image`] = `https://github.com/${userName}.png?size=200`;
      return newState;
    })
  }

  handleReset(id) {
    this.setState(() => {
      let newState = {};
      newState[`${id}Name`] = '';
      newState[`${id}Image`] = null;
      return newState;
    })
  }

  render() {
    const match = this.props.match;
    const playerOneName = this.state.playerOneName;
    const playerTwoName = this.state.playerTwoName;
    const playerOneImage = this.state.playerOneImage;
    const playerTwoImage = this.state.playerTwoImage;
    
    return(
      <div>
        <div className="row">
          {
            !playerOneName &&
            <PlayerInput 
              id = 'playerOne'
              label = 'Player One'
              onSubmit = {this.handleSubmit}
            />
          }

          {
            playerOneImage &&
              <PlayerPreview 
                avatar={playerOneImage}
                userName={playerOneName}
                onReset={this.handleReset}
                id='playerOne'
              />
          }

          {
            !playerTwoName &&
            <PlayerInput 
              id = 'playerTwo'
              label = 'Player Two'
              onSubmit = {this.handleSubmit}
            />
          }

          {
            playerTwoImage &&
              <PlayerPreview 
                avatar={playerTwoImage}
                userName={playerTwoName}
                onReset={this.handleReset}
                id='playerTwo'
              />
          }
        </div>
        {
          playerOneImage && playerTwoImage &&
          <Link
            className='button'
            to={{
              pathname: `${match.url}/results`,
              search: `?playerOneName=${playerOneName}&playerTwoName=${playerTwoName}`
            }}
          >
          Battle
          </Link>
        }
      </div>
    )
  }
}

module.exports = Battle;
