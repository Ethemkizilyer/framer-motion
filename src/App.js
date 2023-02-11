
import './App.css';
import { motion, useTransform, useScroll, useSpring } from "framer-motion";
import { useState } from 'react';
import NavBar from './components/NavBar';

function App() {
   let { scrollYProgress } = useScroll() ;

     const scaleX = useSpring(scrollYProgress, {
       stiffness: 10000,
       damping: 1000,
     });
  let y = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 100 * 15])
  );

  let container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, x: 0 },
    show: { opacity: 1, x:10 },
  };
  return (
    <div className="App">
      <NavBar />
      <motion.div
        style={{ scaleX: scaleX }}
        className="bg-gradient-to-r from-yellow-400 to-red-500 fixed top-0 left-0 right-0 h-[4px] origin-left -z-10"
      />
      <motion.div
        className="w-full flex flex-col gap-20 py-20"
        variants={container}
        initial="hidden"
        whileInView="show"
      >
        <motion.div
          initial={{ opacity: 1 }}
          style={{ x: y, rotateZ: y, scale: 2 }}
          className="bg-red-600 w-[100px] h-[100px] -left-[180px] top-[300px] flex -z-50 absolute "
        ></motion.div>

        <motion.div
          variants={item}
          initial={{ opacity: 1 }}
          style={{ x: y, rotateZ: y, scale: 2 }}
          className="bg-red-600 w-[100px] h-[100px] -left-[180px] top-[900px] flex -z-50 absolute"
        ></motion.div>

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

export default App;
