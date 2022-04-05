import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import {
  fetchFavouriteList,
  removeFavouritePost,
  logoutUser,
  setCurrentUser,
} from "../redux/actions/authActions";
import moment from "moment";
import registerIcon from "../assets/images/pointerBtn.png";
import NavBar from "../components/navbar";

const WebinarContainer = styled.section`
  padding: 80px 93.5px;
  background: gray;
  display: flex;
  flex-wrap: wrap;
  min-height: 68vh;
`;

const WebinarCard = styled.div`
  width: 380px;
  height: 300px;
  background: #ffffff;
  border: 1px solid #d6d6d6;
  box-sizing: border-box;
  box-shadow: 1px 2px 6px rgba(219, 219, 219, 0.5);
  border-radius: 4px;
  margin-right: 20px;
  margin-bottom: 20px;
  color: ${(props) => props.theme.darkBlue};
  padding: 20px;
  display: flex;
  flex-flow: column;
`;

const ItemCreatedAt = styled.h4`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 900;
  font-size: 14px;
  line-height: 20px;
`;

const ItemTitle = styled.h3`
  font-weight: 900;
  font-size: 16px;
  line-height: 24px;
  margin-top: 20px;
`;

const ItemContent = styled.div`
  margin-top: 12px;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: rgba(0, 0, 0, 0.65);
`;

const ItemTimestamp = styled.div`
  margin-top: 20px;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: rgba(0, 0, 0, 0.65);
`;

const RegisterRow = styled.div`
  display: flex;
  flex-grow: 2;
  align-items: flex-end;
  font-weight: 900;
  font-size: 16px;
  line-height: 24px;
  color: #6bb718;

  div {
    :hover {
      cursor: pointer;
    }
  }
`;

const RegisterIcon = styled.div`
  display: flex;
  flex-grow: 2;
  justify-content: end;
`;

const MyWebinars = ({
  fetchFavouriteList,
  auth,
  logoutUser,
  removeFavouritePost,
}) => {
  const [webinarList, setWebinarList] = useState("");

  useEffect(() => {
    const getFavouriteLists = async () => {
      const result = await fetchFavouriteList();

      if (result.code === 200) {
        setWebinarList([...result.data]);
      }
    };

    getFavouriteLists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUnfav = async (id) => {
    const result = await removeFavouritePost(id);

    console.log("handleUnfav ", result);
    if (result.code === 200) {
      let temp = [...webinarList];
      setWebinarList([...temp.filter((x) => x.id !== id)]);
    }
  };

  return (
    <>
      <NavBar isAuthed={auth.isAuthenticated} logoutUser={logoutUser} />
      <WebinarContainer>
        {webinarList &&
          webinarList.map((p) => {
            return (
              <WebinarCard key={p.id}>
                <ItemCreatedAt>
                  {moment(p.created_at).format("DD/MM/YYYY")}
                </ItemCreatedAt>
                <ItemTitle>{p.title}</ItemTitle>
                <ItemContent>{p.content.slice(0, 45) + "..."}</ItemContent>
                <ItemTimestamp>
                  {moment(p.created_at).format("YYYY/MM/DD hh:mm") +
                    " - " +
                    moment(p.created_at)
                      .add(10, "days")
                      .format("YYYY/MM/DD hh:mm")}
                </ItemTimestamp>
                <RegisterRow
                  onClick={() => {
                    handleUnfav(p.id);
                  }}>
                  <div>Unregister</div>
                  <RegisterIcon>
                    <img src={registerIcon} alt="registerIcon" />
                  </RegisterIcon>
                </RegisterRow>
              </WebinarCard>
            );
          })}
      </WebinarContainer>
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, {
  fetchFavouriteList,
  removeFavouritePost,
  logoutUser,
  setCurrentUser,
})(MyWebinars);
