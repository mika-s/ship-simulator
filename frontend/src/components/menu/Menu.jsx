import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Menu.css';

class Menu extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { items } = this.props;

    return (
      <nav>
        <ul className="nav">
          {
            items.map(menuitem => (
              <li className="nav-item" key={menuitem.name.toString()}>
                <Link to={menuitem.href} className="nav-link">{menuitem.name}</Link>
              </li>
            ))
          }
        </ul>
      </nav>
    );
  }
}

Menu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    number: PropTypes.number,
  })).isRequired,
};

export default Menu;
