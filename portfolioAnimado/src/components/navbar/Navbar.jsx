import "./navbar.scss"


const Navbar = () => {
    return(
        <div className="navbar" >
            {/* Sidebar*/}
            <div className="wrapper">
                <span>Marcos Dev</span>
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