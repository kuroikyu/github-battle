const React = require('react');
const PropTypes = require('prop-types');

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
    {props.children}
  </div>
)

PlayerPreview.propTypes = {
  avatar: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
}

module.exports = PlayerPreview;
