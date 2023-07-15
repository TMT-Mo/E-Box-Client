import { useState } from "react";
import introVideo from "@/assets/video_background.mp4";
import bg from "@/assets/school.png";
import { useNavigate } from "react-router-dom";
import {
  Backdrop,
  Box,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "@/hooks";
import { login } from "@/slices/user";
import { LoginArgument } from "@/models/user";
import { LoadingButton } from "@mui/lab";
import Footer from "@/components/Layout/General/Footer/index";
import React from "react";

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
  // position: "relative",
});

const BackgroundBox = styled(
  Box,
  {}
)({
  position: "relative",
  display: "flex",
});

const LoginForm = styled(
  Stack,
  {}
)({
  borderRadius: "18px",
  flexDirection: "column",
  // margin: "auto",
  top: 0,
  left: "50%",
  transform: "translate(-50%, 50%)",
  width: 400,
  position: "absolute",
  // bottom: 0
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
  fill: "white",
  fontWeight: "bold",
  ":hover": {
    background: "rgb(29 78 216)",
  },
  "&.MuiLoadingButton-loading": {
    backgroundColor: "#fff",
    borderColor: "#407AFF",
  },
});

interface IForm {
  username?: string;
  password?: string;
}
function Login() {
  const [form, setForm] = useState<LoginArgument>({
    password: "",
    username: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoginLoading } = useSelector((state) => state.user);

  const loginHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await dispatch(login(form!)).unwrap();
    navigate("/home");
  };

  return (
    <Stack minHeight="100vh">
      <BackgroundBox>
        {/* <img src={bg} /> */}

        <BackgroundImg/>
        <video
          src={introVideo}
          autoPlay
          playsInline
          muted
          loop
          className="hidden min-h-screen min-w-full absolute top-0 lg:block"
        ></video>
        <Backdrop
          open
          style={{
            background:
              "linear-gradient(150deg, rgba(89,149,238,0.8004866180048662) 3%, rgba(109,162,240,0.7329306722689075) 25%, rgba(6,55,128,1) 43%, rgba(2,6,9,1) 69%)",
            opacity: "57%",
          }}
        />
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
              onChange={(value) =>
                setForm({ ...form, username: value.target.value })
              }
            />
            <CustomTextField
              placeholder="Password"
              inputProps={{ style: { color: "white" } }}
              value={form?.password}
              onChange={(value) =>
                setForm({ ...form, password: value.target.value })
              }
            />
            <CustomButton onClick={loginHandler} loading={isLoginLoading}>
              Submit
            </CustomButton>
            <Typography color="#fff">
              *Note: Only students from IT can access to system!
            </Typography>
          </Stack>
        </LoginForm>
      </BackgroundBox>
      <Footer/>
    </Stack>
  );
}

export default Login;
