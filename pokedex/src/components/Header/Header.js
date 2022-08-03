import "./styles.css"
import pokelogo from "../../assets/pokelogo.png"
import github from "../../assets/github.png"
import { useState } from "react"

const Header = () => {
    const [menuScroll, setMenuScroll] = useState("fixed")

    document.addEventListener("scroll", function() {
        if (window.scrollY > 0) {
            setMenuScroll("scrolled")
        }

        else {
            setMenuScroll("fixed")
        } 
    })
    
    const scrollTop = () => {
        window.scrollTo(0, 0)
    }
 
    return (
        <div className={menuScroll}>
            <img src={pokelogo} onClick={() => scrollTop()}/>
            <h3>Pokédex</h3>
            <div className="social-midia">
                <a href="https://github.com/DiogoB0mfim" target='blank'><img src={github}/></a>
            </div>
        </div>
    )
}

export default Header;