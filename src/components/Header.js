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
import { withRouter } from 'react-router-dom'

class MainNavigation extends Component {
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
    const { history } = this.props

    const handleNavClick = (destination) => history.push(destination)

    return (
      <Navbar color="inverse" light expand="md">
        <NavbarBrand onClick={() => handleNavClick('/')}>Happy Spirit Stories</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink onClick={() => handleNavClick('/library')}>Library</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={() => handleNavClick('/history')}>History</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={() => handleNavClick('/projects')}>Projects</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={() => handleNavClick('/account')}>Account</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    )
  }
}

export default withRouter(MainNavigation)
