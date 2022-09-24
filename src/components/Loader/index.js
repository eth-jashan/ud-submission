import React from "react";
import Lottie from "react-lottie";
import loaderSquishy from "../../assets/lottie/loader-quishy.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: loaderSquishy,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export default function Loader() {
  return (
    <Lottie
      options={defaultOptions}
      style={{ height: "150px", width: "150px" }}
    />
  );
}
