import React from "react";
import "./style.css";
export default function Slideshow({ array }) {
  const colors = ["#0088FE", "#00C49F", "#FFBB28"];
  console.log(array);
  const delay = 2500;
  const [index, setIndex] = React.useState(0);
  const timeoutRef = React.useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  React.useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === colors.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div className="slideshow">
      <div
        className="slideshowSlider"
        style={{
          transform: `translate3d(${-index * 100}%, 0, 0)`,
        }}
      >
        {array.map((x, index) => (
          <div
            className="slide"
            key={index}
            style={{
              background: "white",
              border: "solid #734bff 1px",
              padding: 18,
            }}
          >
            <div style={{ fontFamily: "books", fontSize: 24 }}>
              {x?.content}
            </div>
            <div style={{ fontFamily: "light", fontSize: 16, opacity: 0.5 }}>
              -{x?.senderAddress?.slice(0, 3)}...{x?.senderAddress?.slice(-5)}
            </div>
          </div>
        ))}
      </div>

      <div className="slideshowDots">
        {array.map((_, idx) => (
          <div
            key={idx}
            className={`slideshowDot${index === idx ? " active" : ""}`}
            onClick={() => {
              setIndex(idx);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
