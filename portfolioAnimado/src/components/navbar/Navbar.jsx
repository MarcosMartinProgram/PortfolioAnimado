import Sidebar from "../siderbar/Sidebar"
import "./navbar.scss"
import {motion} from "framer-motion"


const Navbar = () => {
    return(
        <div className="navbar" >
            {/* Sidebar*/}
            <Sidebar/>
            <div className="wrapper">
                <motion.span 
                    initial={{ opacity: 0, scale: 0.5}}
                    animate={{opacity: 0.5, scale: 1}}
                    transition={{ duration: 0.5 }}
                >
                    Marcos Dev
                </motion.span>
                <div className="social">
                    <a href="#"><img src="/facebook.svg" alt="Link Facebbok" /></a>
                    <a href="#"><img src="/instagram.svg" alt="Link Instagram" /></a>
                    <a href="#"><img src="/linkedin.svg" alt="Link Linkedin" /></a>
                    <a href="#"><img src="/github3.svg" alt="Link Github" /></a>

                </div>
            </div>
        </div>
    )
}

export default Navbar