const React = require('react');
const { NavLink } = require('react-router-dom')

const Nav = (props) => {
  return (
    <ul className="nav">
      <li>
        <NavLink 
          exact activeClassName="active"
          to='/'
        >
        Home
        </NavLink>
      </li>
      <li>
        <NavLink 
          activeClassName="active"
          to='/battle'
        >
        Battle
        </NavLink>
      </li>
      <li>
        <NavLink 
          activeClassName="active"
          to='/Popular'
        >
        Popular
        </NavLink>
      </li>
    </ul>
  )
}

module.exports = Nav;
