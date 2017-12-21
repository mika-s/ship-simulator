import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

class Menu extends Component {
  constructor() {
    super();
    this.state = {
      menuitems: [
        { name: 'Dashboard', href: '/' },
        { name: 'Map', href: '/map' },
        { name: 'Power', href: '/power' },
        { name: 'Thrusters', href: '/thrusters' },
        { name: 'Sensors', href: '/sensors' },
        { name: 'Settings', href: '/settings' },
      ],
    };
  }

  render() {
    return (
      <nav>
        <ul className="nav">
          {
            this.state.menuitems.map(menuitem => (
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

export default Menu;
