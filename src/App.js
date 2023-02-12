
import './App.css';
import { motion, useTransform, useScroll, useSpring } from "framer-motion";
import { auth } from './auth';
import { useAuthState } from 'react-firebase-hooks/auth';



function App() {
   const [user, loading] = useAuthState(auth);
   let { scrollYProgress } = useScroll() ;

     const scaleX = useSpring(scrollYProgress, {
       stiffness: 10000,
       damping: 1000,
     });
  let y = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 100 * 16])
  );
  let x = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -100 * 16])
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
    hidden: { opacity: 0, x: 10 },
    show: { opacity: 1, x:0 },
  };
  return (
    <div className="App">
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
          className="bg-red-500 w-[160px] h-[160px] left-[80px] top-[200px] flex -z-50 absolute items-center justify-center"
        >
          {user?.displayName}
        </motion.div>
        <motion.div
          initial={{ opacity: 1 }}
          style={{ x: x, rotateZ: x, scale: 2 }}
          className="bg-yellow-500 w-[160px] h-[160px] right-[80px] top-[600px] flex -z-50 absolute "
        >
          {user?.displayName}
        </motion.div>

        <motion.div
          variants={item}
          initial={{ opacity: 1 }}
          style={{ x: y, rotateZ: y, scale: 2 }}
          className="bg-red-500 w-[160px] h-[160px] left-[160px] top-[1000px] flex -z-50 absolute"
        >
          {user?.displayName}
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

export default App;
