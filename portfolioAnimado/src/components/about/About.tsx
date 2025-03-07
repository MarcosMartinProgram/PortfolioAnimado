import { useRef } from "react";
import { motion } from "framer-motion";
import "./about.scss";

const variants = {
  initial: {
    y: 500,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
};

const About = () => {
  const ref = useRef();

  return (
    <motion.div
      ref={ref}
      className="about"
      variants={variants}
      initial="initial"
      whileInView="animate"
    >
      <motion.div className="wrapper" variants={variants}>
        <motion.h1 variants={variants}>About Me</motion.h1>
        <motion.p variants={variants}>
        I started getting interested in programming at the age of 35. 
        I've always been passionate about technology and computers, 
        but due to various circumstances, I pursued a different career 
        before. However, since I began programming, I’ve been captivated 
        by the field, and I haven’t stopped learning different 
        technologies, libraries, and topics related to programming. 
        There are times when I lose track of time and find myself in 
        front of my computer for over 12 hours. Outside of work, I 
        enjoy walking, and animals are my soft spot.
        </motion.p>
        <motion.div className="contactInfo" variants={variants}>
          <motion.p variants={variants}>
            <strong>Technical Skills</strong> HTML, CSS, Python, JavaScript
                Big Data, Java/Spring, React.js, Node.js, Genexus
                Agile Methodologies, Scrum
          </motion.p>
          <motion.p variants={variants}>
            <strong>Education:</strong> Informatorio (Subsecretariat of Employment of Chaco)

                Introduction to Programming (2022)
                Web Development [Python and Django, Databases] (2022)
                Java - Spring (2023)
                React (2023)
                Genexus (2024)
                English N1 (2023)
                National Technological University (UTN)

                Web Programming (2023)
                ANDIS and NIC Argentina

                How to Develop an Accessible Website
                Ministry of Education of Buenos Aires City

                Big Data (2023)
                Full Stack Java (2023)
                Backend Node.js (2024)
                Agile and Scrum (2024)
                Tecnicatura Superio en Desarrollo de Software (2024 -2026)
          </motion.p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default About;
