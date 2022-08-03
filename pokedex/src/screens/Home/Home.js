import { useContext } from 'react';	
import GlobalStateContext from '../../global/GlobalStateContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import "./styles.css"

const  Home = () => {
    const {pokemons, pokedex, addParaPokedex, verMaisPokemons, alertError} = useContext(GlobalStateContext)
    const navigate = useNavigate()

    const isPokemonInPokedex = (id) => {
         return pokedex.find((pokemon) => pokemon.id === id)
    } 

    const isPokemonInPokedexTrue = () => {
        return alertError("Pokémon já está na pokedex")
    }

    const teste = (param) => {
        navigate(`/pokemon/${param}`)
    }

    const render = pokemons && pokemons.map((pokemon, index) => {
        let typesPoke = []
        pokemon.types.map((type) => {typesPoke.push(type.type.name)})
        typesPoke.map((type, index) => {<div key={index}><p>{type}</p></div>})

        return <div className='card-pokemon' key={pokemon.id}> 
                    {isPokemonInPokedex(pokemon.id) ? 
                        <div className='greyPoke'><img onClick={() => isPokemonInPokedexTrue()} src={pokemon.sprites.other['official-artwork'].front_default} alt="pokemon de frente"/></div>
                        : 
                        <div className='normalPoke'><img onClick={() => addParaPokedex(pokemon.id, pokemon.sprites.other['official-artwork'].front_default, pokemon.name)} 
                        src={pokemon.sprites.other['official-artwork'].front_default} alt="pokemon de frente"/></div>
                    } 
                    
                    <p>{pokemon.name[0].toUpperCase() + pokemon.name.substring(1)}</p>
                    <div id="card-types" key={index}>
                        {typesPoke.map((type) => {return <div className={type} id="type-bar"><p>{type[0].toUpperCase() + type.substring(1)}</p></div>})}
                    </div>
                    <Button color="error" variant='outlined' onClick={() => teste(pokemon.name)}>Ver detalhes</Button>
               </div>
    })


    return (
        <div>          
            <h1>Pokemons</h1>
            <button onClick={ () => navigate("/pokedex")}>Ver pokedex</button>
            
            <div className='container-pokemons'>
                {render}
            </div>
            
            <button onClick={() => verMaisPokemons()}>Ver mais</button>
        </div>
    )
}

export default Home;