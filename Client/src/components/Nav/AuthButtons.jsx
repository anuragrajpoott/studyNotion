import React from "react";
import { Link } from "react-router-dom";
import Btn from "../common/Btn";

function AuthButtons() {
  return (
    <>
      <Btn linkto="/signup" active={true}>
        Sign Up
      </Btn>
      <Btn linkto="/login" active={false}>
      Log In
      </Btn>
    </>
  );
}

export default AuthButtons;
