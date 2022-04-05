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
import {
  WebinarListContainer,
  WebinarCard,
  ItemTitle,
  ItemContent,
  ItemTimestamp,
  RegisterRow,
  RegisterIcon,
} from "../components/webinarList";

const WebinarContainer = styled(WebinarListContainer)`
  display: flex;
  flex-wrap: wrap;
  min-height: 68vh;
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
                <h4>{moment(p.created_at).format("DD/MM/YYYY")}</h4>
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
});

export default connect(mapStateToProps, {
  fetchFavouriteList,
  removeFavouritePost,
  logoutUser,
  setCurrentUser,
})(MyWebinars);
