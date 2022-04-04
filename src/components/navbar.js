import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import CompanyLogo from "../assets/images/ACYBanner.png";

const Header = styled.header`
  padding: 0 90px;
  display: flex;
  border-bottom: solid #fff 2px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  height: 132px;
  align-items: center;
`;

const ButtonD = styled.button`
  padding: 10px 16px;
  border: none;
  border-radius: 2px;
  background-color: #013881;
  color: #fff;
  margin-right: 24px;
  width: 115px;
  height: 40px;

  a {
    text-decoration: none;
    color: #fff;
  }
`;

const ButtonL = styled.button`
  padding: 10px 16px;
  border: solid #013881 2px;
  border-radius: 2px;
  background-color: #fff;
  color: #013881;
  width: 115px;
  height: 40px;

  a {
    text-decoration: none;
    color: #013881;
  }

  :hover {
    cursor: pointer;
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
