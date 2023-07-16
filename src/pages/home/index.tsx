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
  Autocomplete,
} from "@mui/material";
import bg from "@/assets/background-student.jpg";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  clearPost,
  getPostCategoryList,
  getPostList,
  onChangePostPage,
  onSearchPost,
} from "@/slices/post";
import { useDispatch, useSelector } from "@/hooks";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import React from "react";
import CustomPagination from "@/components/Pagination";
import SubmitForm from "@/pages/home/submit-form";
import { IPostCategory } from "@/models/post";

const BackgroundBox = styled(
  Box,
  {}
)({
  display: "flex",
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
  borderRadius: 3,
  color: "#fff",
  width: 350,
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
  padding: 50,
});

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
    searchItemValue,
  } = useSelector((state) => state.post);
  const [openPost, setOpenPost] = useState<boolean[]>([]);
  const [isOpenPostForm, setIsOpenPostForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<IPostCategory | null>();
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

  const onHandleSelectCategory = (value: IPostCategory | null) => {
    // console.log(value)
    // if (!value) {return;}
    setSelectedCategory(value);
    // dispatch(setFilter({ field: CATEGORY, value: value.id }))
  };

  useEffect(() => {
    const getPostListHandler = dispatch(
      getPostList({
        currentPage,
        size,
        title: searchItemValue,
        category:
          selectedCategory?.id ?? undefined,
      })
    );

    getPostListHandler.unwrap();

    return () => {
      getPostListHandler.abort();
    };
  }, [currentPage, dispatch, searchItemValue, selectedCategory, size]);

  useEffect(() => {
    const getPostCategoryListHandler = dispatch(getPostCategoryList());

    getPostCategoryListHandler.unwrap();
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(clearPost());
    };
  }, [dispatch]);

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
        <Stack margin="auto" spacing={5} zIndex={20} textAlign="center">
          <Typography color="#fff" variant="h4">
            Search post
          </Typography>
          <Stack direction="row">
            <CustomTextField
              onChange={(e) =>
                dispatch(onSearchPost({ value: e.target.value }))
              }
              inputProps={{ style: { color: "white" } }}
            />
            <SubmitPostBtn onClick={handleToggleSubmitForm}>
              Search
            </SubmitPostBtn>
          </Stack>
        </Stack>
      </BackgroundBox>

      <SecondSection>
        <CustomList spacing={5}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography color="#000" fontWeight={600}>
              Category:
            </Typography>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              sx={{ width: 300, background: "#fff" }}
              loading={isGetPostCategoryListLoading}
              options={categoryList}
              value={selectedCategory}
              onChange={(e, value) => onHandleSelectCategory(value)}
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
          {isGetPostListLoading && (
            <CircularProgress style={{ color: "#fff" }} />
          )}
          {postList.length !== 0 && (
            <>
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

              <CustomPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onChangePage={onChangePage}
              />
            </>
          )}

          <SubmitPostBtn onClick={handleToggleSubmitForm}>
            Submit a post
          </SubmitPostBtn>
        </CustomList>
      </SecondSection>

      <SubmitForm
        handleToggleSubmitForm={handleToggleSubmitForm}
        isOpenPostForm={isOpenPostForm}
      />
    </Stack>
  );
}

export default Home;
