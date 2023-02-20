import "../App.css";
import { motion, useTransform, useScroll, useSpring } from "framer-motion";
import { useSelector } from "react-redux";
import Tilty from "react-tilty";
import { useRef, useState } from "react";

function Home() {

 const [say,setSay]=useState(0)
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
      <Tilty className="w-64 h-64 bg-orange-500 rounded-lg mt-20 shadow-md overflow-hidden transform transition-transform duration-300 absolute  left-[40%] hover:-translate-y-2 z-[1]">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <h2 className="text-2xl font-bold mb-2">Welcome to my website</h2>
          <p className="text-lg text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
      </Tilty>
      <div className="relative left-8 p-8 w-[350px] flex items-center justify-center h-[300px]   border-red-800 bg-green-500">
        {" "}
        <button
          disabled={say == 0}
          onClick={() => handleSlide("left")}
          className={`${
            say == 0 && "hidden"
          } absolute flex items-center justify-center left-2 text-[22px] bg-blue-800 p-1 rounded-[100%]`}
        >
          ◀
        </button>
        <div
          ref={slideContainerRef}
          className="w-[240px] absolute z-20 h-[200px] bg-blue-gray-400 border flex  items-center justify-left overflow-hidden transition-width duration-1000"
        >
          <Tilty>
            <div className="min-w-[100px] flex  items-center justify-center mx-[10px] h-[100px] bg-orange-400">
              1
            </div>
          </Tilty>
          <Tilty>
            <div className="min-w-[100px] flex  items-center justify-center  mx-[10px] h-[100px] bg-orange-400">
              2
            </div>
          </Tilty>
          <Tilty>
            <div className="min-w-[100px] flex  items-center justify-center  mx-[10px] h-[100px] bg-orange-400">
              3
            </div>
          </Tilty>
          <Tilty>
            <div className="min-w-[100px] flex  items-center justify-center  mx-[10px] h-[100px] bg-orange-400">
              4
            </div>
          </Tilty>
          <Tilty>
            <div className="min-w-[100px] flex  items-center justify-center  mx-[10px] h-[100px] bg-orange-400">
              5
            </div>
          </Tilty>
          <Tilty>
            <div className="min-w-[100px] flex  items-center justify-center  mx-[10px] h-[100px] bg-orange-400">
              6
            </div>
          </Tilty>
          <Tilty>
            {" "}
            <div className="min-w-[100px] flex  items-center justify-center  mx-[10px] h-[100px] bg-orange-400">
              7
            </div>
          </Tilty>
          <Tilty>
            {" "}
            <div className="min-w-[100px] flex  items-center justify-center  mx-[10px] h-[100px] bg-orange-400">
              8
            </div>
          </Tilty>
          <Tilty>
            {" "}
            <div className="min-w-[100px] flex  items-center justify-center  mx-[10px] h-[100px] bg-orange-400">
              9
            </div>
          </Tilty>
          <Tilty>
            <div className="min-w-[100px] flex  items-center justify-center  mx-[10px] h-[100px] bg-orange-400">
              10
            </div>
          </Tilty>
        </div>
        <button
          disabled={say == 5}
          onClick={() => handleSlide("right")}
          className={`${
            say >= 4 && "hidden"
          } absolute flex items-center justify-center right-2 text-[22px] bg-blue-800 p-1 rounded-[100%] `}
        >
          ▶
        </button>
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
