import React from "react";

const Welcome = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontFamily: "Arial",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1>🎉 Welcome!</h1>
        <p>Login Successful.</p>
      </div>
    </div>
  );
};

export default Welcome;