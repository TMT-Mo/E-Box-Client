import { Fragment, useEffect } from "react";
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
} from "@mui/material";
import bg from "@/assets/school.png";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { getPostList } from "@/slices/post";
import { useDispatch, useSelector } from "@/hooks";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Footer from "@/components/UI/Footer";
import ClearIcon from "@mui/icons-material/Clear";
import { LoadingButton } from "@mui/lab";

const BackgroundImg = styled(
  Box,
  {}
)({
  width: "100vw",
  height: "100vh",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundImage: `url(${bg})`,
  position: "absolute",
});

const BackgroundBox = styled(
  Box,
  {}
)({
  position: "absolute",
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
    background: "rgb(29 78 216)"
  }
});

function Home() {
  const dispatch = useDispatch();
  const { currentPage, size, isGetPostListLoading, postList } = useSelector(
    (state) => state.post
  );
  const [openPost, setOpenPost] = useState<boolean[]>([]);
  const [isOpenPostForm, setIsOpenPostForm] = useState(false);

  const handleCollapsePost = (index: number) => {
    setOpenPost((prevOpen) => {
      const posts = [...prevOpen];
      posts[index] = !posts[index];
      return posts;
    });
  };

  const handleOpenSubmitForm = () => {
    setIsOpenPostForm((prevState) => !prevState);
  };

  useEffect(() => {
    const getPostListHandler = async () =>
      await dispatch(getPostList({ currentPage, size })).unwrap();

    getPostListHandler();

    // return () => {
    //   getPostListHandler.abort()
    // }
  }, []);

  return (
    <Stack minHeight="100vh">
      <BackgroundBox>
        <BackgroundImg />
        <Backdrop
          open
          style={{
            background:
              "linear-gradient(150deg, rgba(89,149,238,0.8004866180048662) 3%, rgba(109,162,240,0.7329306722689075) 25%, rgba(6,55,128,1) 43%, rgba(2,6,9,1) 69%)",
            opacity: "57%",
          }}
        />
      </BackgroundBox>

      <Stack
        m="auto"
        maxWidth={800}
        width="100%"
        alignItems="center"
        spacing={5}
        zIndex={10}
      >
        <Stack direction="row" alignItems="center" spacing={5}>
          <Typography color="#fff" variant="h4">
            Search post
          </Typography>
          <CustomTextField inputProps={{ style: { color: "white" } }} />
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
        {isGetPostListLoading && <CircularProgress style={{ color: "#fff" }} />}
        <SubmitPostBtn onClick={handleOpenSubmitForm}>
          Submit a post
        </SubmitPostBtn>
      </Stack>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isOpenPostForm}
        // onClick={handleOpenSubmitForm}
      >
        <Stack minWidth={500} bgcolor="#fff" borderRadius={5} p={5} spacing={3}>
          <Stack alignItems='end'><ClearIcon style={{color: "#000"}}/></Stack>
          <Typography color="#000" textAlign='center' fontWeight={600} fontSize='1.5rem'>Create a post</Typography>
          <Stack spacing={1}>
            <Typography color="#000">Title:</Typography>
            <TextField></TextField>
          </Stack>
          <Stack direction='row' alignItems='center' spacing={2}>
            <Typography color="#000">Category:</Typography>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Age"
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Stack>
          
          <Stack spacing={1}>
            <Typography color="#000">Description:</Typography>
            <TextField rows={3} multiline></TextField>
          </Stack>
          <CustomButton>Submit</CustomButton>
        </Stack>
      </Backdrop>
      <Footer />
    </Stack>
  );
}

export default Home;
