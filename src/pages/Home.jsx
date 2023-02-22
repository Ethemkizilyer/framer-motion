import "../App.css";
import { motion, useTransform, useScroll, useSpring } from "framer-motion";
import { useSelector } from "react-redux";
import Tilty from "react-tilty";
import { useEffect, useRef, useState } from "react";
import axios from "axios";


function Home() {

 const [say,setSay]=useState(1)
 const [bas,setBas]=useState(true)
  const user = useSelector((state) => state.auth.user);
    const [earthquakeData, setEarthquakeData] = useState([]);

     useEffect(() => {
    // Sayfa yüklendiğinde ilk kez verileri çekeriz
    fetchEarthquakeData();

    // Her 5 dakikada bir verileri güncellemek için interval fonksiyonunu kullanırız
    const intervalId = setInterval(fetchEarthquakeData, 1 * 60 * 1000);

    // Component kaldırıldığında interval'ı temizlemek için kullanırız
    return () => clearInterval(intervalId);
  }, [bas]);

  const fetchEarthquakeData = () => {
    axios.get(`https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/${bas ? "all_hour": "all_day"}.geojson`)
      .then(response => {
        const europeEarthquakes = response.data.features.filter(
          (earthquake) => {
            console.log(earthquake.geometry.coordinates);
            const [enlem, boylam] = earthquake.geometry.coordinates;
            return (
              boylam >= 35.1738 &&
              boylam <= 71.3845 &&
              enlem >= -26.3613 &&
              enlem <= 45.8016
            );
          }
        );

        setEarthquakeData(bas ? response.data.features : europeEarthquakes);
      })
      .catch(error => {
        console.log(error);
      });
  }



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

      <div className="relative left-[50%] translate-x-[-50%] px-8 py-12 w-[25vw] flex items-center justify-center mt-20 h-[26vh]    bg-green-500 rounded">
        <h1 className="absolute whitespace-nowrap left-[50%] font-semibold -translate-x-[50%] top-0 cursor-pointer" onClick={()=>setBas(!bas)}>{bas ?  "Dünyadaki Saatlik Deprem Verileri" : "Avrupadaki Günlük Deprem Verileri"}</h1>{" "}
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
          className="w-[260px] relative z-20 h-[20vh] bg-blue-gray-400 px-[10px] rounded flex items-center justify-left  transition-width duration-1000 overflow-hidden"
        >
          {earthquakeData.map((earthquake, index) => (
            <Tilty key={index}>
              <div className="min-w-[100px] flex flex-col  items-center justify-center mx-[10px] h-[100px] bg-orange-400">
                <h3 className="font-bold text-[11px] text-center">
                  {earthquake.properties.place}
                </h3>
                <p className=" text-[10px]">
                  {earthquake.properties.mag} büyüklüğünde
                </p>
              </div>
            </Tilty>
          ))}
        </div>
        <button
          disabled={say == Math.ceil(earthquakeData.length / 2)}
          onClick={() => handleSlide("right")}
          className={`${
            say >= Math.ceil(earthquakeData.length / 2) && "hidden"
          } absolute flex items-center justify-center right-1 text-[22px] bg-blue-300 px-[0.5rem]  rounded-[100%] `}
        >
          <span className="translate-x-[0.1rem]">▶</span>
        </button>
        <div className="absolute  z-[1000000000000] flex  bottom-1 left-[50%]   -translate-x-[50%]">
          {Array(Math.ceil(earthquakeData.length / 2))
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
