import { motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";
import { useAnimation } from "framer-motion";
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




  const [arr, setArr] = useState(
    ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"].map((item, i) => ({
      name: item,
      id: i,
    }))
  );

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
    hidden: { x: -60, opacity: 0 },
    visible: { x: 0, opacity: 1 },
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
          alignContent:" center",
          alignItems: "center",
          height:"100vh",
          backgroundColor:" #bfacf7",
        }}
      >
        <motion.div
          className={css`
            width: 320px;
            height: 100px;
            border: 3px solid #6a6aff;
            border-radius: 15px;
            background-color: #cfbfff;
            overflow: hidden;
          `}
          initial={"hidden"}
          animate={"visible"}
          variants={list}
        >
          {arr.map(({ name, id }, i) => {
            return (
              <motion.p
                key={id}
                className={css`
                  padding: 5px 20px;
                  font-size: 23px;
                  display: inline-block;
                  justify-content: space-between;
                  text-align: center;
                  font-family: "Lato";
                  color: #fff;
                  cursor: pointer;
                `}
                custom={i}
                animate={animation}
                variants={item}
                onTap={async (e, info) => {
                  await animation.start((j) => {
                    if (i === j) {
                      console.log("here");
                      return {
                        opacity: 0,
                        x: -100,
                        transition: { delay: i * 0.3 },
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
                <span>{name}</span>
              </motion.p>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}

export default GAMI