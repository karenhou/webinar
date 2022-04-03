import React from "react";
import styled from "styled-components";

const HeroContainer = styled.section`
  width: 800px;
  margin: auto;
  text-align: center;
`;

const ContentBox = styled.div`
  padding: 87px 0px;
`;

const H3 = styled.h3`
  font-size: 28px;
  font-weight: 500;
  color: #01254f;
  margin-bottom: 20px;
`;

const Content = styled.div`
  font-size: 16px;
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
