import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { loginUser } from "../redux/actions/authActions";

const LoginContainer = styled.section`
  margin: auto;
  margin-top: 10rem;
  width: 500px;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const LoginForm = styled.form`
  color: blue;
  padding: 24px;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const InputLabel = styled.label`
  line-height: 22px;
  color: #4a4a4a;
  margin-bottom: 8px;
`;

const TextInput = styled.input`
  background: #ffffff;
  border: 1px solid #c6c6c6;
  box-sizing: border-box;
  border-radius: 4px;
  height: 40px;
  padding: 4px 12px;
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

  :hover {
    cursor: pointer;
  }
  :disabled {
    cursor: not-allowed;
    background-color: gray;
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

  :hover {
    cursor: pointer;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const H3 = styled.div`
  text-align: center;
  padding: 24px 0 0 0;
  font-size: 24px;
`;

const Login = ({ loginUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await loginUser({ email, password });

    if (result.code === 200) {
      navigate("/");
    }
  };

  return (
    <LoginContainer>
      <H3>Login</H3>
      <LoginForm>
        <InputBox>
          <InputLabel>Account</InputLabel>
          <TextInput
            type="email"
            value={email || ""}
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputBox>

        <InputBox>
          <InputLabel>Password</InputLabel>
          <TextInput
            type="password"
            value={password || ""}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputBox>

        <ButtonContainer>
          <ButtonD
            type="button"
            onClick={(e) => handleLogin(e)}
            disabled={email === "" || password === ""}>
            Login
          </ButtonD>
          <Link to="/">
            <ButtonL>Cancel</ButtonL>
          </Link>
        </ButtonContainer>
      </LoginForm>
    </LoginContainer>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(Login);
