import React, { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { Content } from "./hero";

const RegisterFormContainer = styled.section`
  padding: 0 93px;
  text-align: center;
  margin: 80px 0;
  display: flex;
  justify-content: center;
`;

const FormCard = styled.div`
  background: #ffffff;
  border: 1px solid #dbdbdb;
  box-sizing: border-box;
  box-shadow: 0px 4px 14px rgba(132, 132, 132, 0.5);
  border-radius: 20px;
  width: 1180px;
  height: 748px;
  padding: 80px 300px;
`;

const TitleH3 = styled.h3`
  font-weight: 500;
  line-height: 30px;
  color: ${(props) => props.theme.darkBlue};
  margin-bottom: 20px;
`;

const Form = styled.form`
  margin-top: 40px;
  text-align: left;
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

  span {
    color: red;
    font-size: 12px;
  }
`;

const DropDown = styled.select`
  border: 1px solid #c6c6c6;
  box-sizing: border-box;
  border-radius: 4px;
  line-height: 40px;
  min-height: 55px;
  font-size: 16px;
  color: ${(props) => props.theme.white};
  white-space: pre-line;
  padding: 4px 12px;
`;

const Option = styled.option`
  min-height: 40px;
`;

const TextInput = styled.input`
  border: 1px solid #c6c6c6;
  box-sizing: border-box;
  border-radius: 4px;
  height: 40px;
  padding: 4px 12px;
`;

const SubmitButton = styled.button`
  height: 48px;
  background-color: #013b81;
  width: 100%;
  border-radius: 4px;
  border: none;
  color: ${(props) => props.theme.white};
  padding-top: 13px;
  padding-bottom: 13px;
  margin-top: 30px;

  :hover {
    cursor: pointer;
    background-color: #013b81de;
  }

  :disabled {
    background: #e9e9e9;
    color: #d1d1d1;
    cursor: not-allowed;
  }
`;

const ErrorText = styled.div`
  color: red;
`;

const RegisterForm = React.forwardRef(
  ({ formTopic, postID, addFavouritePost }, ref) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [emailError, setEmailError] = useState("");

    const [error, setError] = useState("");

    const navigate = useNavigate();

    const isFormValid = () => {
      if (firstName.trim().length === 0) {
        setFirstNameError("Field required, cannot be empty");
      }

      if (lastName.trim().length === 0) {
        setLastNameError("Field required, cannot be empty");
      }

      if (email.trim().length === 0) {
        setEmailError("Field required, cannot be empty");
      }
      //eslint-disable-next-line
      const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

      if (!email.trim().match(emailFormat)) {
        setEmailError("Incorrect email format");
      }

      if (emailError || lastNameError || firstNameError) return false;
      else return true;
    };

    const handleRegister = async (e) => {
      e.preventDefault();
      setFirstNameError("");
      setLastNameError("");
      setEmailError("");
      if (isFormValid() === false) {
        //form failed
        console.log("test failed");
        return;
      } else {
        const useData = {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          formTopic: formTopic,
          postID: postID,
        };
        //call api
        const result = await addFavouritePost(useData);

        if (result.code === 200) {
          //if succsssful goes to favorite page
          navigate("/my_webinars");
        } else {
          setError("Something went wrong, please try again later");
          setTimeout(() => {
            setError("");
          }, 3000);
        }
      }
    };
    return (
      <RegisterFormContainer ref={ref}>
        <FormCard>
          <TitleH3>Register for a Webinar now</TitleH3>
          <Content>
            Please fill in the form below and you will be contacted by one of
            our professional business experts.
          </Content>

          <Form>
            <InputBox>
              <InputLabel>Topic</InputLabel>
              <DropDown>
                <Option>{formTopic}</Option>
              </DropDown>
            </InputBox>

            <InputBox>
              <InputLabel>
                First Name {firstNameError ? <span>{firstNameError}</span> : ""}
              </InputLabel>
              <TextInput
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </InputBox>

            <InputBox>
              <InputLabel>
                Last Name {lastNameError ? <span>{lastNameError}</span> : ""}
              </InputLabel>
              <TextInput
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </InputBox>

            <InputBox>
              <InputLabel>
                Email {emailError ? <span>{emailError}</span> : ""}
              </InputLabel>
              <TextInput
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputBox>

            <SubmitButton
              disabled={
                firstName.length === 0 ||
                lastName.length === 0 ||
                email.length === 0 ||
                formTopic === "N/A"
              }
              onClick={(e) => handleRegister(e)}>
              Register
            </SubmitButton>
            {error && <ErrorText>{error}</ErrorText>}
          </Form>
        </FormCard>
      </RegisterFormContainer>
    );
  }
);

export default RegisterForm;
