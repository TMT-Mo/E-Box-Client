import React from 'react'
import bg from "@/assets/background-student.jpg";
import styled from '@emotion/styled';
import { Box, Backdrop } from '@mui/material';
const BackgroundBox = styled(
    Box,
    {}
  )({
    display: "flex",
    width: "100%",
    height: "100vh",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundImage: `url(${bg})`,
  });

const Activity = () => {
  return (
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
      </BackgroundBox>
  )
}

export default Activity