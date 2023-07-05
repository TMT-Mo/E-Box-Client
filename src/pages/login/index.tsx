import React, { useState } from "react";
import introVideo from "@/assets/video_background.mp4";
import bg from "@/assets/school.png";
import classes from "./login.module.css";
import { Link, useNavigate } from "react-router-dom";
import {
  Backdrop,
  Box,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
  colors,
  
} from "@mui/material";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "@/hooks";
import { login } from "@/slices/user";
import { LoginArgument } from "@/models/user";
import { LoadingButton } from "@mui/lab";
import { apis } from "@/util/api";
import { httpClient } from "@/util/http-client";

const BackgroundImg = styled(
  Box,
  {}
)({
  width: "100%",
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

const LoginForm = styled(
  Stack,
  {}
)({
  borderRadius: "18px",
  flexDirection: "column",
  margin: "auto",
  width: 400,
  position: "relative",
});

const CustomTextField = styled(
  TextField,
  {}
)({
  background: "rgb(55 65 81)",
  borderRadius: "6px",
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

interface IForm {
  username?: string,
  password?: string
}
function Login() {
  const [form, setForm] = useState<LoginArgument>({password: '', username: ''})
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {isLoginLoading} = useSelector(state => state.user)

  const loginHandler = async (e: {preventDefault: () => void}) => {
    e.preventDefault()
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await dispatch(login(form!)).unwrap()
    // navigate('/home')
  }
  const onToggleFormHandler = async (e: {preventDefault: () => void}) => {
    e.preventDefault()
    const res = await httpClient.get({url: apis.post.getPostList})
    console.log(res)
  };


  return (
    <Stack minHeight="100vh">
      <BackgroundBox>
        {/* <img src={bg} /> */}

        <BackgroundImg />
        <video
          src={introVideo}
          autoPlay
          playsInline
          muted
          loop
          className="w-screen hidden lg:block"
        ></video>
        <Backdrop
          open
          style={{
            background:
              "linear-gradient(150deg, rgba(89,149,238,0.8004866180048662) 3%, rgba(109,162,240,0.7329306722689075) 25%, rgba(6,55,128,1) 43%, rgba(2,6,9,1) 69%)",
            opacity: "57%",
          }}
        />
      </BackgroundBox>
      <LoginForm>
        <div className="absolute top-0 bg-black w-full h-full opacity-70 lg:rounded"></div>
        <Stack p={5} style={{ zIndex: 10 }} spacing={5}>
          <Typography color="#fff" variant="h5">
            Login
          </Typography>
          <CustomTextField
            placeholder="Username"
            inputProps={{ style: { color: "white" } }}
            value={form?.username}
            onChange = {(value) => setForm({...form, username: value.target.value})}
          />
          <CustomTextField
            placeholder="Password"
            inputProps={{ style: { color: "white" } }}
            value={form?.password}
            onChange = {(value) => setForm({...form, password: value.target.value})}
          />
          <CustomButton onClick={loginHandler} loading={isLoginLoading}>Submit</CustomButton>
          <button className={` btn-primary bg-lightBlue`} onClick={onToggleFormHandler}>
                  <Link to="/home">Đăng Nhập</Link>
                </button>
          <Typography color="#fff">*Note: Only students from IT can access to system!</Typography>
        </Stack>
      </LoginForm>
    </Stack>
  );
}

export default Login;
