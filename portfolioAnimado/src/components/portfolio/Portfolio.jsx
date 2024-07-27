import { useRef } from "react";
import "./portfolio.scss";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";



const items = [
    {
        id: 1,
        title: "React e-commerce",
        img: "/Ecommerce.png" ,
        desc: "Proyecto con CRUD, uso de Api, creación de usuarios, rol admin con creacion, modificación y eliminación de Categorias y Productos. Carrito de Compras con persistencia",
    },
    {
        id: 2,
        title: "Ecommerce en Javascript y NodeJs",
        img: "/EcommerceNodeJs.png" ,
        desc: "Proyecto con CRUD, Creación de una Api con NodeJs, deploy de FrontEnd y BackEnd, Base de Datos en la Nuve. credenciales usuario: admin@admin.com contraseña: admin123",
    },
    {
        id: 3,
        title: "Tareas App",
        img: "/Todo.png" ,
        desc: "Registrador de tareas para el día a Dia, Realizado en ReactJs con Typescript, Almacenando en LocalStorage",
    },
    {
        id: 4,
        title: "Primer Portfolio",
        img: "/Portfolio.png" ,
        desc: "Registrador de tareas para el día a Dia, Realizado en ReactJs con Typescript, Almacenando en LocalStorage",
    },
    {
        id: 5,
        title: "Python y Django",
        img: "/Fundacion.png" ,
        desc: "Registrador de tareas para el día a Dia, Realizado en ReactJs con Typescript, Almacenando en LocalStorage",
    },
];

const Single = ({ item }) => {
    const ref = useRef();
  
    const { scrollYProgress } = useScroll({
      target: ref,
    });
  
    const y = useTransform(scrollYProgress, [0, 1], [-300, 300]);
  
    return (
      <section >
        <div className="container">
          <div className="wrapper">
            <div className="imageContainer" ref={ref}>
              <img src={item.img} alt="" />
            </div>
            <motion.div className="textContainer" style={{y}}>
              <h2>{item.title}</h2>
              <p>{item.desc}</p>
              <button>See Demo</button>
            </motion.div>
          </div>
        </div>
      </section>
    );
  };



const Portfolio = () => {


    const ref= useRef()

    const {scrollYProgress} = useScroll({
        target:ref, 
        offset:["end end" , "start start"]
    });

    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
    });

    return (
        <div className="portfolio" ref={ref}>
            <div className="progress">
                <h1>Featured Works</h1>
                <motion.div style={{ scaleX }} className="progressBar"></motion.div>
            </div>
            {items.map((item) => (
                <Single item={item} key={item.id} />
            ))}
        </div>
    );
};

export default Portfolio