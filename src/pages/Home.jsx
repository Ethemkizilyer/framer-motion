import "../App.css";
import { motion, useTransform, useScroll, useSpring } from "framer-motion";
import { useSelector } from "react-redux";
import Tilty from "react-tilty";
import { useRef, useState } from "react";

function Home() {

 const [say,setSay]=useState(1)
 const [data,setData]=useState(10)
  const user = useSelector((state) => state.auth.user);


 const slideContainerRef = useRef(null);

 const handleSlide = (direction) => {
   const slideContainer = slideContainerRef.current;

   if (direction === "left") {
   setSay(say-1)
     slideContainer.scrollBy({
       left: -240,
       behavior: "smooth",
     });
   } else {
  setSay(say + 1);
     slideContainer.scrollBy({
       left: 240,
       behavior: "smooth",
     });
   }
 };

  let { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 10000,
    damping: 1000,
  });
  let y = useSpring(useTransform(scrollYProgress, [0, 1], [0, 100 * 16]));
  let x = useSpring(useTransform(scrollYProgress, [0, 1], [0, -100 * 16]));

  let container = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
      },
    },
  };

  const item = {
    hidden: { opacity: 1, x: 10 },
    show: { opacity: 1, x: 0 },
  };
  return (
    <div>
      <motion.div
        style={{ scaleX: scaleX }}
        className="bg-gradient-to-r from-yellow-400 to-red-500 fixed top-0 left-0 right-0 h-[4px] origin-left -z-10"
      />

      <div className="relative left-[50%] translate-x-[-50%] p-8 w-[25vw] flex items-center justify-center mt-20 h-[25vh]    bg-green-500 rounded">
        {" "}
        <button
          disabled={say == 1}
          onClick={() => handleSlide("left")}
          className={`${
            say == 1 && "hidden"
          } absolute flex items-left text-center  justify-start left-1 text-[22px] bg-blue-300 px-[0.5rem] rounded-[100%]`}
        >
          <span className="-translate-x-[0.1rem]">◀</span>
        </button>
        <div
          ref={slideContainerRef}
          className="w-[260px] relative z-20 h-[20vh] bg-blue-gray-400 px-[10px] rounded flex  items-center justify-left  transition-width duration-1000 overflow-hidden"
        >
          {Array(data)
            .fill(1)
            .map((_, index) => (
              <Tilty>
                <div className="min-w-[100px] flex  items-center justify-center mx-[10px] h-[100px] bg-orange-400">
                  {index + 1}
                </div>
              </Tilty>
            ))}
        </div>
        <button
          disabled={say == data / 2 }
          onClick={() => handleSlide("right")}
          className={`${
            say >= data / 2  && "hidden"
          } absolute flex items-center justify-center right-1 text-[22px] bg-blue-300 px-[0.5rem]  rounded-[100%] `}
        >
          <span className="translate-x-[0.1rem]">▶</span>
        </button>
        <div className="absolute  z-[1000000000000] flex  bottom-1 left-[50%]   -translate-x-[50%]">
          {Array(data / 2)
            .fill(1)
            .map((_, index) => (
              <span
                key={index}
                className={`w-[10px]  h-[10px] rounded-[50%] bottom-[0px]  border`}
              ></span>
            ))}
          <div className="absolute h-[10px] bottom-[10px] rounded-[50%] w-[50px]">
            {Array(say)
              .fill(1)
              .map((_, index) => (
                <span
                  key={index}
                  className={`  rounded-[100%] bg-black text-[7px] px-[2.6px] py-[0.1px]`}
                >
                  +
                </span>
              ))}
          </div>
        </div>
      </div>

      <motion.div
        className="w-full flex flex-col gap-20 py-20"
        variants={container}
        initial="hidden"
        whileInView="show"
      >
        <motion.div
          initial={{ opacity: 1 }}
          style={{ x: y, rotateZ: y, scale: 2 }}
          className="bg-red-500 w-[160px] h-[160px] left-[80px] top-[250px] flex -z-50 absolute items-center justify-center"
        >
          {user?.username}
        </motion.div>
        <motion.div
          initial={{ opacity: 1 }}
          style={{ x: x, rotateZ: x, scale: 2 }}
          className="bg-yellow-500 w-[160px] h-[160px] right-[80px] top-[650px] flex -z-50 absolute items-center justify-center"
        >
          {user?.username}
        </motion.div>

        <motion.div
          variants={item}
          initial={{ opacity: 1 }}
          style={{ x: y, rotateZ: y, scale: 2 }}
          className="bg-red-500 w-[160px] h-[160px] left-[80px] top-[1050px] flex -z-50 absolute items-center justify-center"
        >
          {user?.username}
        </motion.div>

        <motion.div variants={item} className="flex flex-col"></motion.div>

        <motion.div className="" variants={item}></motion.div>

        <motion.div
          className="flex gap-10 sm:items-center sm:flex-row flex-col"
          variants={item}
        ></motion.div>

        <hr className="opacity-10" />
      </motion.div>
    </div>
  );
}

export default Home;
