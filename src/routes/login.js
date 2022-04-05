import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, Navigate } from "react-router-dom";
import styled from "styled-components";
import { loginUser } from "../redux/actions/authActions";
import { ButtonD, ButtonL } from "../components/navbar";

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

const ErrorText = styled.div`
  margin-top: 12px;
  color: red;
  text-align: center;
`;

const Login = ({ loginUser, auth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const result = await loginUser({ email, password });

    if (result.code === 200) {
      navigate("/");
    } else {
      setIsLoading(false);
      setErrorMsg("Either password/email incorrect, check again");
      setTimeout(() => {
        setErrorMsg("");
      }, 3000);
    }
  };

  if (auth.isAuthenticated) {
    return <Navigate to="/" />;
  }

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
            disabled={email === "" || password === "" || isLoading}>
            Login
          </ButtonD>
          <Link to="/">
            <ButtonL>Cancel</ButtonL>
          </Link>
        </ButtonContainer>
        {errorMsg && <ErrorText>{errorMsg}</ErrorText>}
      </LoginForm>
    </LoginContainer>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { loginUser })(Login);
