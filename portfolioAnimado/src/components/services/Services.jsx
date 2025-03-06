import { useRef } from "react";
import "./services.scss";
import { motion, useInView } from "framer-motion";

const variants = {
  initial: {
    x: -500,
    y: 100,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      staggerChildren: 0.1,
    },
  },
};

const Services = () => {
  const ref = useRef();

  const isInView = useInView(ref, { margin: "-100px" });

  return (
    <motion.div
      className="services"
      variants={variants}
      initial="initial"
      // animate="animate"
      // whileInView="animate"
      ref={ref}
      animate={"animate"}
    >
      <motion.div className="textContainer" variants={variants}>
        <p>
        I specialize in fullstack development to help your
          <br /> digital presence grow and evolve
        </p>
        <hr />
      </motion.div>
      <motion.div className="titleContainer" variants={variants}>
        <div className="title">
          <img src="/people.webp" alt="" />
          <h1>
            <motion.b whileHover={{color:"orange"}}>Innovative</motion.b> Solutions 
          </h1>
        </div>
        <div className="title">
          <h1>
            <motion.b whileHover={{color:"orange"}}>For Your</motion.b> Business.
          </h1>
          <button>WHAT WE DO?</button>
        </div>
      </motion.div>
      <motion.div className="listContainer" variants={variants}>
        <motion.div
          className="box"
          whileHover={{ background: "lightgray", color: "black" }}
        >
          <h2>Ecommerce</h2>
          <p>
          "We develop custom eCommerce solutions for businesses, helping
           them expand their reach and optimize sales in the digital world. 
           We create functional, secure, and scalable online stores tailored 
           to each business's needs, integrating payment methods, inventory 
           management, and an optimized user experience."
          </p>
          <button>Go</button>
        </motion.div>
        <motion.div
          className="box"
          whileHover={{ background: "lightgray", color: "black" }}
        >
          <h2>Landing Page</h2>
          <p>
          "We design and develop optimized landing pages to turn visitors
           into customers. We create attractive, fast, and responsive 
           interfaces focused on enhancing user experience and maximizing 
           conversions. Our pages are strategically designed to capture 
           leads, boost sales, and strengthen your business's online presence."
          </p>
          <button>Go</button>
        </motion.div>
        <motion.div
          className="box"
          whileHover={{ background: "lightgray", color: "black" }}
        >
          <h2>Solutions</h2>
          <p>
          "We offer complete technological solutions for businesses and 
          entrepreneurs. We develop web and mobile applications, eCommerce 
          platforms, optimized landing pages, payment system integrations, 
          process automation, and much more. Our focus is on creating 
          efficient, secure, and scalable software tailored to each client's 
          needs."
          </p>
          <button>Go</button>
        </motion.div>
        
      </motion.div>
    </motion.div>
  );
};

export default Services;