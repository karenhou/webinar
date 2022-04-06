import React from "react";
import styled from "styled-components";
import { device } from "../utils/device";

const HeroContainer = styled.section`
  width: 800px;
  margin: auto;
  text-align: center;

  @media ${device.tablet} {
    width: 700px;
    margin: 0 34px;
  }
`;

const ContentBox = styled.div`
  padding: 87px 0px;

  @media ${device.tablet} {
    padding: 156px 0 56px 0px;
  }
`;

const H3 = styled.h3`
  font-size: 28px;
  font-weight: 500;
  color: ${(props) => props.theme.darkBlue};
  margin-bottom: 20px;
  line-height: 40px;
`;

export const Content = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: rgba(0, 0, 0, 0.65);
`;

const Hero = () => {
  return (
    <HeroContainer>
      <ContentBox>
        <H3>Forex Webinars</H3>
        <Content>
          Whether you are new to foreign exchange trading or already have some
          market experience, we believe that a solid FX trading education is
          vital to your success as a trader.
        </Content>
      </ContentBox>
    </HeroContainer>
  );
};

export default Hero;
