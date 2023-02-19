import "../App.css";
import { motion, useTransform, useScroll, useSpring } from "framer-motion";
import { useSelector } from "react-redux";
import Tilty from "react-tilty";
function Home() {
  const user = useSelector((state) => state.auth.user);

  let { scrollYProgress } = useScroll();
  console.log(user);
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
    <div >
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
        <Tilty className="w-64 h-64 bg-orange-500 rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 absolute top-[25vh] left-[40%] hover:-translate-y-2 z-[1]">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <h2 className="text-2xl font-bold mb-2">Welcome to my website</h2>
            <p className="text-lg text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
        </Tilty>
        
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
          className="bg-red-500 w-[160px] h-[160px] left-[160px] top-[1050px] flex -z-50 absolute items-center justify-center"
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
