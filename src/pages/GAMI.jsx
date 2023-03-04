import { motion, AnimatePresence, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useAnimation } from "framer-motion";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Text } from "@chakra-ui/core";



const Progress = ({ strokeWidth, percentage }) => {
  const radius = 50 - strokeWidth / 2;
  const pathDescription = `
      M 50,50 m 0,-${radius}
      a ${radius},${radius} 0 1 1 0,${2 * radius}
      a ${radius},${radius} 0 1 1 0,-${2 * radius}
    `;

  const diameter = Math.PI * 2 * radius;
  const progressStyle = {
    stroke: "url(#myGradient)",
    strokeLinecap: "round",
    strokeDasharray: `${diameter}px ${diameter}px`,
    strokeDashoffset: `${((100 - percentage) / 100) * diameter}px`,
    animate:"1000"
  };

  return (
    <svg
      className={"CircularProgressbar"}
      fill="url(#myGradient)"
      viewBox="0 0 100 100"
      width="50"
      height="50"

    >

      <defs>
        <linearGradient id="myGradient" gradientTransform="rotate(90)">
          <stop offset="0%" stop-color="#f4756c" />
          <stop offset="100%" stop-color="#ffc371" />
        </linearGradient>
      </defs>
      <path
        className="CircularProgressbar-trail"
        d={pathDescription}
        strokeWidth={strokeWidth}
        fillOpacity={0}
        style={{
          stroke: "#d6d6d6",
        }}
      />

      <path
        className="CircularProgressbar-path"
        d={pathDescription}
        strokeWidth={strokeWidth}
        fillOpacity={0}
        style={progressStyle}
        
      />

      <text
        className="CircularProgressbar-text"
        x={50}
        y={50}
        style={{
          fill: "url(#myGradient)",
          fontSize: "32px",
          fontWeight: "bolder",
          dominantBaseline: "central",
          textAnchor: "middle",
          // fill: "red", // Metnin iç rengini kırmızı yapmak için "fill" özelliğini kullanıyoruz.
        }}
      >
        {`${percentage}%`}
      </text>
    </svg>
  );
};

const ca = [
  {
    id: 1,
    title: "Card 1",
    content: "Content of Card 1",
  },
  {
    id: 2,
    title: "Card 2",
    content: "Content of Card 2",
  },
  {
    id: 3,
    title: "Card 3",
    content: "Content of Card 3",
  },
  {
    id: 4,
    title: "Card 4",
    content: "Content of Card 3",
  },
  {
    id: 5,
    title: "Card 5",
    content: "Content of Card 3",
  },
  {
    id: 6,
    title: "Card 6",
    content: "Content of Card 3",
  },
  {
    id: 7,
    title: "Card 7",
    content: "Content of Card 3",
  },
];

export const Header = styled.header`
  background: green;
  position: relative;
  display: flex;
  padding: 1rem;
  justify-content: flex-end;
  z-index: 2;
  padding-right: 2rem;
`;

export const Nav = styled(motion.nav)`
  background-color: red;
  height: 90vh;
  width: 100vw;
  position: absolute;
  top: 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Link = styled(motion.li)`
  color: white;
  margin-bottom: 1.6rem;
  font-size: 1.4rem;
`;

export const SvgBox = styled(motion.div)``;

const GAMI = () => {
  const [isOpen, setIsOpen] = useState(false);

  const iconVariants = {
    opened: {
      rotate: 135,
    },
    closed: {
      rotate: 0,
    },
  };

  const menuVariants = {
    opened: {
      top: 0,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.5,
      },
    },
    closed: {
      top: "-90vh",
    },
  };

  const linkVariants = {
    opened: {
      opacity: 1,
      y: 50,
    },
    closed: {
      opacity: 0,
      y: 0,
    },
  };

  const [arr, setArr] = useState(ca);

  const animation = useAnimation();

  const list = {
    hidden: { opacity: 1 },
    visible: {
      transition: {
        staggerChildren: "infinite",
      },
    },
  };
  const item = {
    visible: {
      x: 0,
      opacity: 1,
    },
    hidden: {
      x: "-500px",
      opacity: 0,
      height: "50px",
      width: "50px",
      y: "500px",
    },
  };

  const handleClick = (id) => {
    const selectedCardIndex = arr.findIndex((item) => item.id === id);
    const selectedCard = arr[selectedCardIndex];

    const newList = [
      ...arr.slice(0, selectedCardIndex),
      ...arr.slice(selectedCardIndex + 1),
      selectedCard,
    ];

    setArr(newList);
  };

 const [percentage, setPercentage] = useState(0);

 useEffect(() => {
   setTimeout(() => {
     if (percentage < 90) {
       setPercentage(percentage + 1);
     }
   }, 50);
 }, [percentage]);

const [say, setSay] = useState(1);
 const slideContainerRef = useRef(null);

  const handleSlide = (direction) => {
    const slideContainer = slideContainerRef.current;

    if (direction === "left") {
      setSay(say - 1);
      slideContainer.scrollBy({
        left: "-100%",
        behavior: "smooth",
      });
    } else {
      setSay(say + 1);
      slideContainer.scrollBy({
        left: "100%",
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="mt-20 w-100 h-[90vh] border bg-orange-100 relative overflow-hidden">
      <Header>
        <SvgBox
          variants={iconVariants}
          animate={isOpen ? "opened" : "closed"}
          whileHover={{ scale: 1.4 }}
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 4C11.4477 4 11 4.44772 11 5V11H5C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13H11V19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19V13H19C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11H13V5C13 4.44772 12.5523 4 12 4Z"
              fill="#fff"
            />
          </svg>
        </SvgBox>
      </Header>

      <Nav
        initial={false}
        variants={menuVariants}
        animate={isOpen ? "opened" : "closed"}
      >
        <Link variants={linkVariants}>home</Link>
        <Link variants={linkVariants}>about</Link>
        <Link variants={linkVariants}>gallery</Link>
      </Nav>

      <motion.div
        animate={{ scale: [0.8, 1.1, 0.8] }}
        transition={{ duration: 1, repeat: Infinity }}
        style={{ display: "inline-block" }}
      >
        <Progress strokeWidth={12} percentage={75} />
      </motion.div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: " center",
          alignItems: "center",
          height: "80vh",
          backgroundColor: " #bfacf7",
          position: "relative",
        }}
      >
        {" "}
        <button
          disabled={say == 1}
          onClick={() => handleSlide("left")}
          className="absolute left-8 top-[50%]"
        >
          ◀
        </button>
        <button
          onClick={() => handleSlide("right")}
          className="absolute top-[50%] right-8"
        >
          ▶
        </button>
        <div
          ref={slideContainerRef}
          style={{
            border: "3px solid #6a6aff",
            borderRadius: "15px",
            backgroundColor: "#cfbfff",
          }}
          className="card-list w-[700px] bg-slate-500 overflow-hidden border "
        >
          <AnimatePresence
            style={{
              background: "red",
              width: "300px",
              display: "inline-block",
              marginRight: "10px",
            }}
          >
            <motion.div
              style={{
                width: "1560px",
                height: "500px",

                overflow: "hidden",
                gap: "1rem",
                display: "flex",
                padding: "0 1rem",
                alignItems: "center",
                position: "relative",
              }}
              initial={"hidden"}
              animate={"visible"}
              variants={list}
            >
              {arr.map(({ title, id }, i) => {
                return (
                  <motion.div
                    key={id}
                    style={{
                      padding: "5px 20px",
                      fontSize: "23px",
                      display: "inline-block",
                      justifyContent: "space-between",
                      textAlign: "center",
                      fontFamily: "Lato",
                      color: "#fff",
                      cursor: "pointer",
                      width: "200px",
                      height: "400px",
                      backgroundColor: "red",
                    }}
                    custom={i}
                    transition={{ duration: 0.5 }}
                    animate={animation}
                    variants={item}
                    className="card"
                    layout
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}

                    // onTap={async (e, info) => {
                    //   await animation.start((j) => {
                    //     if (i === j) {
                    //       console.log("here");
                    //       return {
                    //         opacity: 0,
                    //         x: -600,
                    //         transition: { delay: i * 0.1, duration: 1 },
                    //       };
                    //     } else {
                    //       return {
                    //         opacity: 1,
                    //       };
                    //     }
                    //   });
                    //   setArr(arr.filter((item) => item.id !== id));
                    // }}
                  >
                    <span>{title}</span>
                    <div className="mt-[300px] ml-7 flex gap-4">
                      <button
                        onClick={async () => {
                          await animation.start((j) => {
                            if (i === j) {
                              console.log("here");
                              return {
                                opacity: 0,
                                x: -600,
                                transition: { delay: i * 0.1, duration: 0.5 },
                              };
                            } else {
                              return {
                                opacity: 1,
                              };
                            }
                          });
                          setArr(arr.filter((item) => item.id !== id));
                        }}
                      >
                        ❤
                      </button>
                      <button
                        onClick={async () => {
                          await animation.start((j) => {
                            if (i === j) {
                              console.log("here");
                              return {
                                opacity: 0,
                                y: 300,
                                transition: { delay: i * 0.1, duration: 0.5 },
                                height: "10px",
                                width: "200px",
                                textAlign: "center",
                                alignItems: "center",
                              };
                            } else {
                              return {
                                opacity: 1,
                              };
                            }
                          });
                          setArr(arr.filter((item) => item.id !== id));
                        }}
                      >
                        ❌
                      </button>
                      <button onClick={() => handleClick(id)}>↪</button>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default GAMI;
