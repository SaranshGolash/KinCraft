import React from "react";

function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#20382E",
        color: "#FFFDF9",
        padding: "1.5rem",
        marginTop: "auto",
      }}
    >
      <p className="mb-0 text-center">
        &copy; {new Date().getFullYear()} KinCraft. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
