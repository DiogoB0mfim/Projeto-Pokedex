import { useContext } from 'react';
import GlobalStateContext from '../../global/GlobalStateContext';
import { useNavigate } from 'react-router-dom';
import "./styles.css"
import Header from '../../components/Header/Header';
import { Button } from '@mui/material';
import setaCima from "../../assets/seta-cima.png"

const PokedexDetail = () => {
    const {pokedex, deltest} = useContext(GlobalStateContext)
    const navigate = useNavigate()

    const goToPokemonDetails = (pokemon) => {
        localStorage.setItem("pokemon", pokemon)

        if (localStorage.getItem("pokemon").length > 0) {
            navigate(`/pokemon/${localStorage.getItem("pokemon")}`)
        }
    }
    
    const scrollTop = () => {
        window.scrollTo(0, 0)
    }
     
    const renderPokedex = pokedex.map((pokemon, index) => {
        let typesPoke = []
        pokemon.types.map((type) => {typesPoke.push(type.type.name)})
        typesPoke.map((type, index) => {<div key={index}><p>{type}</p></div>})

        return  <div className="each-pokemon" key={index}>
                    <img src={pokemon.image} alt="imagem pokemon"/>
                    <p>{pokemon.name[0].toUpperCase() + pokemon.name.substring(1)}</p>
                    <div id="card-types" key={index}>
                                {typesPoke.map((type) => {return <div key={type} className={type} id="type-bar"><p>{type[0].toUpperCase() + type.substring(1)}</p></div>})}
                            </div>
                    <div className="btn-pokedex">
                        <Button size="small" variant="outlined" color="error" onClick={() => deltest(index)}>Deletar Poke</Button>
                        <Button size="small" variant="contained" onClick={() => goToPokemonDetails(pokemon.name)}>Ver detalhes</Button>
                    </div>
                </div>
            }
        )
        
    return (
         <div className="container-pokedex">
            <Header scrollOrNavBack={() => navigate("/")}/>
            <div className="pokemon-cards">
            {pokedex.length < 1 ? <div className="pokedex-empty"><p>Você não possui pokémons 😪</p></div> : renderPokedex}
            </div>
            <div className='btn-scrollTop'>
                <img src={setaCima} onClick={() => scrollTop()} alt="seta para cima"/>
            </div>
        </div>
    )
}

export default PokedexDetail

