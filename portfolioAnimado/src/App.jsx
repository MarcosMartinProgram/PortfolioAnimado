import "./app.scss";
import Navbar from "./components/navbar/Navbar";
import Hero from "./components/hero/Hero";
import Parallax from "./components/parallax/Parallax";
import Services from "./components/services/Services";
import Portfolio from "./components/portfolio/Portfolio";

function App() {
  

  return (
    
      <div>
        <section id="Home">
          <Navbar />
          <Hero />
        </section>
        <section id="Services">
          <Parallax type="services"/>
        </section>        
        <section>
          <Services/>
        </section>
        <section id="Portfolio">
          <Parallax type="portfolio"/>
        </section>
        <Portfolio />
        <section id="About">
          Portfiol1
        </section>
        <section id="Contact">
          Contac
          </section>
        
        
      </div>
      
    
  )
}

export default App
