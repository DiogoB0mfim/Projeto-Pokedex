import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from "../screens/Home/Home"
import Pokedex from "../screens/Pokedex/Pokedex"
import PokemonDetails from "../screens/PokemonDetails/PokemonDetails"

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Home/>}/>
                <Route path="/pokedex" element={<Pokedex/>}/>
                <Route path="/pokemon/:name" element={<PokemonDetails/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;