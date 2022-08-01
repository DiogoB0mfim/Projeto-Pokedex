import { useContext } from 'react';
import GlobalStateContext from '../../global/GlobalStateContext';
import { useNavigate } from 'react-router-dom';

const PokedexDetail = () => {
    const {pokedex, deltest} = useContext(GlobalStateContext)
    const navigate = useNavigate()

    const goToPokemonDetails = (pokemon) => {
        localStorage.setItem("pokemon", pokemon)

        if (localStorage.getItem("pokemon").length > 0) {
            navigate(`/pokemon/${localStorage.getItem("pokemon")}`)
        }
    } 
     
    const renderPokedex = pokedex.map((pokemon, index) => {
        return  <div key={index}>
                    <img src={pokemon.image}/>
                    <p>{pokemon.name}</p>
                    <button onClick={() => deltest(index)}>Deletar Pokemon</button>
                    <button onClick={() => goToPokemonDetails(pokemon.name)}>Ver detalhes</button>
                </div>
            }
        )
        
    return (
         <div>
            <h1>Pokedex</h1>
            <button onClick={() => navigate("/")}>Ir pra home</button>
            {renderPokedex}
        </div>
    )
}

export default PokedexDetail

