import React, { useEffect } from "react";
import bg from "@/assets/background-student.jpg";
import styled from "@emotion/styled";
import {
  Box,
  Backdrop,
  ListItem,
  ListItemButton,
  ListItemText,
  List,
  ListItemIcon,
  ListSubheader,
  CircularProgress,
  Stack,
  Divider,
} from "@mui/material";
import post from "@/slices/post";
import { useDispatch, useSelector } from "@/hooks";
import { clearActivity, getActivityList, loadMoreActivity } from "@/slices/activity";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { LoadingButton } from "@mui/lab";
const BackgroundBox = styled(
  Stack,
  {}
)({
  display: "flex",
  width: "100%",
  height: "100vh",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundImage: `url(${bg})`,
  alignItems: "center",
  justifyContent: "center",
  flexDirection: 'column',

});

const CustomList = styled(
  List,
  {}
)({
  width: "100%",
  maxWidth: 1200,
  backgroundColor: "#000",
  padding: 20,
  borderRadius: 15,
  maxHeight: "60%",
  overflowY: "scroll",
  overflowX: "hidden",
  scrollbarWidth: "auto",
  scrollbarColor: "unset",
  
});

const LoadMoreBtn = styled(
  LoadingButton,
  {}
)({
  padding: '10px 20px',
  border: '1px solid #fff',
  background: "#000",
  textTransform: "none",
  color: "#fff",
  fontWeight: "bold",
  ":hover": {
    background: "#130f40",
  },
  "&.MuiLoadingButton-loading": {
    backgroundColor: "#fff",
    borderColor: "#407AFF",
  },
});

const DividerStyled = styled(Divider)({
  margin: "30px 0",
  background: "#fff",
});

const Activity = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const { activityList, isGetActivityListLoading, size, total } = useSelector(
    (state) => state.activity
  );

  const onLoadMoreActivity = () => {
      dispatch(loadMoreActivity())
  }
  useEffect(() => {
    const getActivityListHandler = dispatch(
      getActivityList({
        id: userInfo?.id,
        size,
      })
    );

    getActivityListHandler.unwrap();

    return () => {
      getActivityListHandler.abort();
    };
  }, [dispatch, size, userInfo?.id]);

  useEffect(() => {
    return () => {
      dispatch(clearActivity())
    }
  }, [dispatch]);

  return (
    <BackgroundBox spacing={2}>
      {/* <BackgroundImg /> */}

      <Backdrop
        open
        style={{
          background:
            "linear-gradient(150deg, rgba(89,149,238,0.8004866180048662) 3%, rgba(109,162,240,0.7329306722689075) 25%, rgba(6,55,128,1) 43%, rgba(2,6,9,1) 69%)",
          opacity: "57%",
        }}
      />
      {isGetActivityListLoading && activityList.length === 0 && (
        <CircularProgress style={{ color: "#fff" }} />
      )}
      <CustomList
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader
            disableSticky
            id="nested-list-subheader"
            sx={{
              background: "none",
              color: "#fff",
              fontWeight: 600,
              fontSize: 18,
              padding: 0,
            }}
          >
            My activity list
          </ListSubheader>
        }
      >
        {activityList?.length !== 0 &&
          activityList?.map((activity) => (
            <>
            <ListItem key={activity.id}>
              <Stack>
                <ListItemText
                  sx={{ color: "#fff" }}
                  primary={new Date(activity.createdAt).toDateString()}
                />
                <ListItemButton
                  sx={{ backgroundColor: "#18191A", marginBottom: 1 }}
                >
                  <ListItemIcon>
                    <AssignmentIcon fontSize="small" sx={{ color: "#fff" }} />
                  </ListItemIcon>
                  <Stack>
                    <ListItemText
                      sx={{ color: "#fff" }}
                      primary={activity.title}
                    />
                    <ListItemText
                      sx={{ color: "#fff" }}
                      primary={activity.description}
                    />
                  </Stack>
                </ListItemButton>
              </Stack>
            </ListItem>
            {/* <DividerStyled/> */}
            </>

          ))}
      </CustomList>
      {total > activityList?.length && <LoadMoreBtn loading={isGetActivityListLoading} onClick={onLoadMoreActivity}>See More</LoadMoreBtn>}
    </BackgroundBox>
  );
};

export default Activity;
