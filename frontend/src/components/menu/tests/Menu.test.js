import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Menu from '../Menu';

it('renders without crashing', () => {
  const items = [
    { name: 'Menu item 1', href: '/1' },
    { name: 'Menu item 2', href: '/2' },
  ];

  const div = document.createElement('div');
  ReactDOM.render((
    <BrowserRouter>
      <div>
        <Menu items={items} />
        <Switch>
          <Route exact path="/" render={() => <div />} />
        </Switch>
      </div>
    </BrowserRouter>), div);
});
