import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { fetchPostList } from "../redux/actions/authActions";
import registerIcon from "../assets/images/pointerBtn.png";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const WebinarContainer = styled.section`
  padding: 80px 93.5px;
  background: gray;
`;

const WebniarBox = styled.div`
  height: 655px;
  display: flex;
  flex-direction: column;
  overflow-x: scroll;
  flex-wrap: wrap;
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
  color: ${(props) => props.theme.dk};
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

  :hover {
    cursor: pointer;
  }
`;

const RegisterIcon = styled.div`
  display: flex;
  flex-grow: 2;
  justify-content: end;
`;

const WebinarList = ({
  fetchPostList,
  scrollDown,
  formSection,
  auth,
  setFormTopic,
  setPostID,
}) => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const [pageNum, setPageNum] = useState(1);

  const getPosts = async () => {
    const res = await fetchPostList(pageNum);

    if (res.code === 200) {
      if (pageNum > 1) {
        let tempArr = [...posts, ...res.data];
        setPosts(tempArr);
      } else {
        setPosts(res.data);
      }
    }
  };

  const eventListener = (e) => {
    let left =
      e.target.scrollWidth - e.target.scrollLeft - e.target.clientWidth < 50;

    if (left) {
      let pg = pageNum + 1;
      setPageNum(pg);
      getPosts();
    }
  };

  useEffect(() => {
    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <WebinarContainer>
      <WebniarBox onScroll={eventListener}>
        {posts
          .filter((x) => x.favourited === false)
          .map((p) => {
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
                    if (auth.isAuthenticated) {
                      setFormTopic(p.title);
                      setPostID(p.id);
                      scrollDown(formSection);
                    } else {
                      navigate("/login");
                    }
                  }}>
                  <div>Register Now</div>
                  <RegisterIcon>
                    <img src={registerIcon} alt="registerIcon" />
                  </RegisterIcon>
                </RegisterRow>
              </WebinarCard>
            );
          })}
      </WebniarBox>
    </WebinarContainer>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { fetchPostList })(WebinarList);
