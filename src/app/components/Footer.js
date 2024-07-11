import React from "react";
import  Container from "@mui/material/Container";
import Typography  from "@mui/material/Typography";

const domainname=process.env.domainname
const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "lightgrey", // Replace with your desired background color
        padding: 20,
        marginTop:50
      }}
    >
      <Container maxWidth="lg">
   
        <Typography variant="body2" color="textSecondary" align="center">
          © {new Date().getFullYear()} Glumzi.com. Her hakkı saklıdır.
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;