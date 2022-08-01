import { useContext} from 'react';	
import GlobalStateContext from '../../global/GlobalStateContext';
import { useNavigate } from 'react-router-dom';

const  Home = () => {
    const {pokemons, pokedex, addParaPokedex, verMaisPokemons} = useContext(GlobalStateContext)
    const navigate = useNavigate()

    const isPokemonInPokedex = (id) => {
        return pokedex.find((pokemon) => pokemon.id === id)
    } 

    const teste = (param) => {
        navigate(`/pokemon/${param}`)
    }

    const render = pokemons && pokemons.map((pokemon, index) => {
        return <div key={pokemon.id}>
                    <img src={pokemon.sprites.front_default} alt="pokemon de frente"/>
                    <p>{pokemon.name}</p>
                    <button onClick={() => teste(pokemon.name)}>Ver detalhes</button>
                    {isPokemonInPokedex(pokemon.id) ? 
                    <button>Adicionado</button> 
                    : 
                    <button onClick={() => addParaPokedex(pokemon.id, pokemon.sprites.front_default, pokemon.name)}>Adicionar</button>}
            
               </div>
        }
    )

    
    return (
        <div>          
            <h1>Pokemons</h1>
            <button onClick={ () => navigate("/pokedex")}>Ver pokedex</button>
            {render}
            <button onClick={() => verMaisPokemons()}>Ver mais</button>
        </div>
    )
}

export default Home;