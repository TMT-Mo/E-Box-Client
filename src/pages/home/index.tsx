import { Fragment, useEffect, useMemo } from "react";
import { useState } from "react";
import styled from "@emotion/styled";
import {
  Box,
  Stack,
  Backdrop,
  Typography,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  CircularProgress,
  TextField,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Autocomplete,
} from "@mui/material";
import bg from "@/assets/background-student.jpg";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  createPost,
  getPostCategoryList,
  getPostList,
  onChangePostPage,
} from "@/slices/post";
import { useDispatch, useSelector } from "@/hooks";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Footer from "@/components/UI/Footer";
import ClearIcon from "@mui/icons-material/Clear";
import { LoadingButton } from "@mui/lab";
import React from "react";
import CustomPagination from "@/components/Pagination";

const BackgroundImg = styled(
  Box,
  {}
)({
  width: "100%",
  height: "50vh",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundImage: `url(${bg})`,
  // position: "relative",
});

const BackgroundBox = styled(
  Box,
  {}
)({
  display: 'flex',
  width: "100%",
  height: "50vh",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundImage: `url(${bg})`,
});
const CustomTextField = styled(
  TextField,
  {}
)({
  borderRadius: 8,
  color: "#fff",
  border: "1px #fff solid",
});
const SubmitPostBtn = styled(
  Button,
  {}
)({
  padding: 15,
  background: "#000",
  textTransform: "none",
  color: "#fff",
  fontWeight: "bold",
  ":hover": {
    background: "#130f40",
  },
});

const CustomButton = styled(
  LoadingButton,
  {}
)({
  background: "rgb(63 128 255)",
  borderRadius: "6px",
  textTransform: "none",
  color: "white",
  fontWeight: "bold",
  ":hover": {
    background: "rgb(29 78 216)",
  },
});

const CustomList = styled(
  Stack,
  {}
)({
  borderRadius: "18px",
  flexDirection: "column",
  alignItems: "center",
  margin: "auto",
  maxWidth: 800,
  width: "80%",
});

const SecondSection = styled(
  Box,
  {}
)({
  display: "flex",
  height: "fit-content",
  background:
    "linear-gradient(159deg, rgba(233,241,255,1) 9%, rgba(115,152,221,1) 95%)",
  zIndex: 20,
  padding: 100,
});

interface SubmitForm {
  title?: string;
  description?: string;
  category?: string;
  creator?: string;
}

interface OnChangePage {
  (event: React.ChangeEvent<unknown>, page: number): void;
}

function Home() {
  const dispatch = useDispatch();
  const {
    currentPage,
    size,
    isGetPostListLoading,
    postList,
    isGetPostCategoryListLoading,
    categoryList,
    total,
    isCreatePostLoading,
  } = useSelector((state) => state.post);
  const { userInfo } = useSelector((state) => state.user);
  const [openPost, setOpenPost] = useState<boolean[]>([]);
  const [isOpenPostForm, setIsOpenPostForm] = useState(false);
  const [submitForm, setSubmitForm] = useState<SubmitForm>();
  const totalPages = useMemo(() => Math.ceil(total / 5), [total]);

  const handleCollapsePost = (index: number) => {
    setOpenPost((prevOpen) => {
      const posts = [...prevOpen];
      posts[index] = !posts[index];
      return posts;
    });
  };

  const handleToggleSubmitForm = () => {
    setIsOpenPostForm((prevState) => !prevState);
  };

  const onChangePage: OnChangePage = (e, value) => {
    dispatch(onChangePostPage({ selectedPage: --value }));
  };

  const onSubmitPostHandler = () => {
    dispatch(createPost({ ...submitForm, creator: userInfo?.id }));
    setSubmitForm({ category: "", creator: "", description: "", title: "" });
    handleToggleSubmitForm();
  };

  useEffect(() => {
    const getPostListHandler = async () => {
      await dispatch(getPostList({ currentPage, size })).unwrap();
      await dispatch(getPostCategoryList()).unwrap();
    };

    getPostListHandler();

    // return () => {
    //   getPostListHandler.abort()
    // }
  }, []);

  return (
    <Stack>
      <BackgroundBox>
        {/* <BackgroundImg /> */}

        <Backdrop
          open
          style={{
            background:
              "linear-gradient(150deg, rgba(89,149,238,0.8004866180048662) 3%, rgba(109,162,240,0.7329306722689075) 25%, rgba(6,55,128,1) 43%, rgba(2,6,9,1) 69%)",
            opacity: "57%",
          }}
        />
        <Stack
          direction="row"
          margin='auto'
          spacing={5}
          zIndex={20}
        >
          <Typography color="#fff" variant="h4">
            Search post
          </Typography>
          <CustomTextField inputProps={{ style: { color: "white" } }} />
        </Stack>
      </BackgroundBox>

      <SecondSection>
        <CustomList spacing={5}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography color="#000">Category:</Typography>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              sx={{ width: 300, background: "#fff" }}
              loading={isGetPostCategoryListLoading}
              options={categoryList}
              onChange={(e, value) =>
                setSubmitForm((prevState) => ({
                  ...prevState,
                  category: value?.id,
                }))
              }
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {isGetPostCategoryListLoading ? (
                          <CircularProgress color="primary" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  }}
                />
              )}
            />
          </Stack>
          <List
            sx={{
              width: "100%",
              maxWidth: 800,
              bgcolor: "background.paper",
            }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Nested List Items
              </ListSubheader>
            }
          >
            {postList.map((post, i) => (
              <Fragment key={post.id}>
                <ListItemButton onClick={() => handleCollapsePost(i)}>
                  <ListItemIcon>
                    <HelpOutlineIcon />
                  </ListItemIcon>
                  <ListItemText primary={post.title} />
                  {openPost[i] ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openPost[i]} timeout="auto" unmountOnExit>
                  <Box style={{ padding: 15 }}>
                    <Typography>{post.description}</Typography>
                  </Box>
                </Collapse>
              </Fragment>
            ))}
          </List>
          {isGetPostListLoading && (
            <CircularProgress style={{ color: "#fff" }} />
          )}
          <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onChangePage={onChangePage}
          />
          <SubmitPostBtn onClick={handleToggleSubmitForm}>
            Submit a post
          </SubmitPostBtn>
        </CustomList>
      </SecondSection>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isOpenPostForm}
        // onClick={handleOpenSubmitForm}
      >
        <Stack minWidth={500} bgcolor="#fff" borderRadius={5} p={5} spacing={3}>
          <Stack alignItems="end">
            <ClearIcon
              style={{ color: "#000" }}
              onClick={handleToggleSubmitForm}
            />
          </Stack>
          <Typography
            color="#000"
            textAlign="center"
            fontWeight={600}
            fontSize="1.5rem"
          >
            Create a post
          </Typography>
          <Stack spacing={1}>
            <Typography color="#000">Title:</Typography>
            <TextField
              value={submitForm?.title}
              onChange={(value) =>
                setSubmitForm((prevState) => ({
                  ...prevState,
                  title: value.target.value,
                }))
              }
            />
          </Stack>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography color="#000">Category:</Typography>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              sx={{ width: 300 }}
              loading={isGetPostCategoryListLoading}
              options={categoryList}
              onChange={(e, value) =>
                setSubmitForm((prevState) => ({
                  ...prevState,
                  category: value?.id,
                }))
              }
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {isGetPostCategoryListLoading ? (
                          <CircularProgress color="primary" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  }}
                />
              )}
            />
          </Stack>

          <Stack spacing={1}>
            <Typography color="#000">Description:</Typography>
            <TextField
              rows={3}
              multiline
              value={submitForm?.description}
              onChange={(value) =>
                setSubmitForm((prevState) => ({
                  ...prevState,
                  description: value.target.value,
                }))
              }
            />
          </Stack>
          <CustomButton
            onClick={onSubmitPostHandler}
            loading={isCreatePostLoading}
          >
            Submit
          </CustomButton>
        </Stack>
      </Backdrop>
    </Stack>
  );
}

export default Home;
