import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { blue, yellow } from './elements';

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
    * {
      margin: 5px;
    }
  }
`;

const Title = styled.h1`
  margin: 0px;
  color: ${yellow};
  text-shadow: 1px 1px black, -1px -1px black, 1px -1px black, -1px 1px black;
`;

const Links = styled.div`
  position: relative;
  padding: 5px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavLinkWrapper = styled(Link)`
  color: #ffffff;
  font-weight: 600;
  text-decoration: none;
  margin: 0px 8px;
  :hover { text-decoration: underline; }
`;

const NavLink = ({ to, name, icon }) => <NavLinkWrapper to={to}><span role='img' aria-label="logs">{icon}</span> {name}</NavLinkWrapper>;

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
            onChange={e => this.props.changePassword(e.target.value)}
            style={{ fontWeight: 900 }}
          />
        </span>

        <Links>
          <NavLink to="/logs" name="Logs" icon="📜" />
          <NavLink to="/" name="Temp1" icon="🐎" />
          <NavLink to="/" name="Temp2" icon="🎥" />
        </Links>
      </NavBar>
    );
  }
}

export default Header;