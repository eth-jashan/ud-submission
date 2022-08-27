import React, { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { setGithub } from "../store/actions/auth-action";
import { supabase } from "../utils/supabase";

const TwitterFallback = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const search = useLocation().search;
  const code = new URLSearchParams(search).get("code");

  useEffect(() => {
    console.log("herer");
    checkUser();
    window.addEventListener("hashchange", function () {
      checkUser();
    });
  }, []);

  async function checkUser() {
    const user = supabase.auth.user();
    console.log("userr..", user);
    if (user) {
      dispatch(setGithub(user));
      navigate("/");
    }
  }

  return <div />;
};

export default TwitterFallback;
