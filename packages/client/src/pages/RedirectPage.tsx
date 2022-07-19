import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RedirectPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  });

  return <div>RedirectPage</div>;
};

export default RedirectPage;
