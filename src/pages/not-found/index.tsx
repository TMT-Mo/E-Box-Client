import introVideo from "@/assets/video_background.mp4";
import bg from "@/assets/school.png";
import { Backdrop, Box, Stack, Typography } from "@mui/material";
import styled from "@emotion/styled";
import Footer from "@/components/UI/Footer";

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
});

function NotFound() {
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
        <Typography
          variant="h2"
          color="#fff"
          zIndex={20}
          position="absolute"
          top={0}
          left='50%'
          style={{transform:'translate(-50%,50%)'}}
        >
          404! Not Found
        </Typography>
      </BackgroundBox>
    </Stack>
  );
}

export default NotFound;
