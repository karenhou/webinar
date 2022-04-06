import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import CompanyLogo from "../assets/images/ACYBanner.png";
import { device } from "../utils/device";

const Header = styled.header`
  padding: 0 90px;
  display: flex;
  border-bottom: solid ${(props) => props.theme.white} 2px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  height: 132px;
  align-items: center;

  @media ${device.tablet} {
    padding: 0 34px;
    height: 80px;

    img {
      height: 52px !important;
    }
  }
`;

const Button = styled.button`
  padding: 10px 16px;
  border-radius: 2px;
  width: 115px;
  height: 40px;
  a {
    text-decoration: none;
  }

  :hover {
    cursor: pointer;
  }

  :disabled {
    cursor: not-allowed;
    background-color: gray;
  }
`;

export const ButtonD = styled(Button)`
  border: none;
  background-color: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.white};
  margin-right: 24px;

  a {
    color: ${(props) => props.theme.white};
  }
`;

export const ButtonL = styled(Button)`
  border: solid ${(props) => props.theme.primary} 2px;
  background-color: ${(props) => props.theme.white};
  color: ${(props) => props.theme.primary};

  a {
    color: ${(props) => props.theme.primary};
  }
`;

const LeftContainer = styled.div`
  flex-grow: 1;
`;

const RightContainer = styled.div`
  flex-grow: 1;
  text-align: end;
`;

const NavBar = ({ isAuthed, logoutUser }) => {
  return (
    <Header>
      <LeftContainer>
        <Link to="/">
          <img src={CompanyLogo} alt="CompanyLogo" />
        </Link>
      </LeftContainer>
      <RightContainer>
        {isAuthed ? (
          <>
            <ButtonD>
              <Link to="/my_webinars">My Webinar</Link>
            </ButtonD>
            <ButtonL
              onClick={() => {
                logoutUser();
              }}>
              Logout
            </ButtonL>
          </>
        ) : (
          <ButtonL>
            <Link to="/login">Login</Link>
          </ButtonL>
        )}
      </RightContainer>
    </Header>
  );
};

export default NavBar;
