import { useContext, useState } from 'react';	
import GlobalStateContext from '../../global/GlobalStateContext';
import { useNavigate } from 'react-router-dom';
// imports MUI
import { Button, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
// imports imagens e estilos
import pokebola from "../../assets/pokebola.png"
import pokebolaAberta from "../../assets/pokebola-aberta.png" 
import seta from "../../assets/seta.png"
import "./styles.css"
import Header from "../../components/Header/Header"

const  Home = () => {
    const {pokemons, pokedex, addParaPokedex, verMaisPokemons, alertError} = useContext(GlobalStateContext)
    const [pokedexImg, setPokedexImg] = useState("closed")
    const [search, setSearch] = useState("")
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

    const onChangeSearch = (event) => {
        setSearch(event.target.value)
    }


    
    const render = pokemons && pokemons.map((pokemon, index) => {
        let typesPoke = []
        pokemon.types.map((type) => {typesPoke.push(type.type.name)})
        typesPoke.map((type, index) => {<div key={index}><p>{type}</p></div>})

        if (search === "") {
            return <div className='card-pokemon' key={pokemon.id}> 
                    {isPokemonInPokedex(pokemon.id) ? 
                        <div className='greyPoke'><img onClick={() => isPokemonInPokedexTrue()} src={pokemon.sprites.other['official-artwork'].front_default} alt="pokemon de frente"/></div>
                        : 
                        <div className='normalPoke'><img onClick={() => addParaPokedex(pokemon.id, pokemon.sprites.other['official-artwork'].front_default, pokemon.name)} 
                        src={pokemon.sprites.other['official-artwork'].front_default} alt="pokemon de frente"/></div>
                    } 
                    
                        <p>{pokemon.name[0].toUpperCase() + pokemon.name.substring(1)}</p>
                        <div id="card-types" key={index}>
                        {typesPoke.map((type) => {return <div key={type} className={type} id="type-bar"><p>{type[0].toUpperCase() + type.substring(1)}</p></div>})}
                    </div>
                    <Button variant='outlined' onClick={() => teste(pokemon.name)}>Ver detalhes</Button>
               </div>
        }

        else {
             
            if (pokemon.name.includes(search.toLowerCase())) {
                return <div className='card-pokemon' key={pokemon.id}>
                            {isPokemonInPokedex(pokemon.id) ? 
                                <div className='greyPoke'><img onClick={() => isPokemonInPokedexTrue()} src={pokemon.sprites.other['official-artwork'].front_default} alt="pokemon de frente"/></div>
                                : 
                                <div className='normalPoke'><img onClick={() => addParaPokedex(pokemon.id, pokemon.sprites.other['official-artwork'].front_default, pokemon.name)} 
                                src={pokemon.sprites.other['official-artwork'].front_default} alt="pokemon de frente"/></div>
                            } 
                            <p>{pokemon.name[0].toUpperCase() + pokemon.name.substring(1)}</p>
                            <div id="card-types" key={index}>
                                {typesPoke.map((type) => {return <div key={type} className={type} id="type-bar"><p>{type[0].toUpperCase() + type.substring(1)}</p></div>})}
                            </div>
                            <Button variant='outlined' onClick={() => teste(pokemon.name)}>Ver detalhes</Button>
                       </div>
            }
        }
    })


    return (
        <div id="test" className="container-home">          
            <Header/>
            <TextField 
            value={search}
            onChange={onChangeSearch}
            id="outlined-basic" 
            label="Pokémon"
            placeholder="Procure um Pokémon" 
            variant="outlined"
            InputProps={{
                endAdornment: <InputAdornment position="end"><SearchIcon/></InputAdornment>
            }}
            />
            
            <div id="pokebola">
                {pokedexImg === "closed" ? 
                <div><img onMouseOver={() => setPokedexImg("open")} onClick={() => navigate("/pokedex")} src={pokebola}/></div>
                :
                <div id="pokebola-open"><img className="open" onMouseOut={() => setPokedexImg("closed")} onClick={() => navigate("/pokedex")} src={pokebolaAberta}/></div>
            }
        
            </div>
        
            <div className="container-pokemons">
                {render}
            </div>
            
            <div className="show-more" onClick={() => verMaisPokemons()}>
                <img src={seta}/>
            </div>
        </div>
    )
}

export default Home;