import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { blue, yellow } from './elements';
import { changePassword } from '../actions';
import { darken } from 'polished';

const NavBar = styled.div`
  width: 100%;
  height: 50px;
  background-color: ${blue};
  display: flex;
  justify-content: space-around;
  align-items: center;
  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    * { margin: 5px; }
  }
`;

const Title = styled.h1`
  margin: 0px;
  color: ${yellow};
  text-shadow: 1px 1px black, -1px -1px black, 1px -1px black, -1px 1px black;
`;

const Links = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavLinkWrapper = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-weight: 600;
  padding: 0px 8px;
  text-decoration: none;
  text-align: center;
  height: 100%;
  :hover { text-decoration: underline; background-color: ${darken(0.2, blue)}; }
`;

const NavBarLink = ({ name, icon, ...props }) => (
  <NavLinkWrapper {...props} activeStyle={{ backgroundColor: darken(0.2, blue) }}>
    <span role='img' aria-label="logs">{icon}</span>&nbsp;{name}
  </NavLinkWrapper>
);

class Header extends React.Component {
  render() {
    return (
      <NavBar>
        <Link to='/' style={{ textDecoration: 'none' }}>
          <Title>GSERVER</Title>
        </Link>

        <span style={{ fontWeight: 600, color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          Password:&nbsp;&nbsp;&nbsp;
          <input
            type="text"
            autoCorrect="off"
            autoCapitalize="none"
            value={this.props.password}
            onChange={e => this.props.dispatch(changePassword(e.target.value))}
            style={{ fontWeight: 900 }}
          />
        </span>

        <Links>
          <NavBarLink to="/logs" name="Logs" icon="📜" />
          <NavBarLink to="/" name="Temp1" icon="🐎" exact />
          <NavBarLink to="/" name="Temp2" icon="🍕" exact />
        </Links>
      </NavBar>
    );
  }
}

const mapStateToProps = ({ password }) => ({ password });
export default connect(mapStateToProps)(Header);