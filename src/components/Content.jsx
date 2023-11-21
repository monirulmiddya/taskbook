import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

import "react-toastify/dist/ReactToastify.css";

import { ToastContainer, toast } from "react-toastify";

import Notes from "./Notes";
function Content() {
  // const notify = () => {
  //   toast.success("🦄 Wow so easy!");
  // };
  return (
    // <>
    // <Notes />
    // </>
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <CssBaseline />
      <Container>
        <Box sx={{ m: 2 }}>
          <Notes />
        </Box>
      </Container>
    </>
  );
}

export default Content;
