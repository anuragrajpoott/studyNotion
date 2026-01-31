import Button from "../common/Button";
import React from "react";

export default function AuthButtons() {
  return (
    <div className="flex gap-3">
      <Button to="/signup" variant="primary">
        Sign Up
      </Button>

      <Button to="/login" variant="secondary">
        Log In
      </Button>
    </div>
  );
}
