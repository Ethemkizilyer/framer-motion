import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";
import { useAnimation } from "framer-motion";


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

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: " center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: " #bfacf7",
        }}
      >
        <div
          style={{
            border: "3px solid #6a6aff",
            borderRadius: "15px",
            backgroundColor: "#cfbfff",
          }}
          className="card-list w-[670px] bg-slate-500 overflow-hidden border"
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
                                height: "50px",
                                width: "50px",
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
