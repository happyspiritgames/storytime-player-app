import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

export default class MainNavigation extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <Navbar color="inverse" light expand="md">
        <NavbarBrand href="/">Happy Spirit Stories</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/library">Library</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/storybook">Story (hidden)</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/history">History</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/projects">Projects</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/account">Account</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}
