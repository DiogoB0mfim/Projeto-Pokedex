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

    const teste = (param) => {
        navigate(`/pokemon/${param}`)
    }

    const onChangeSearch = (event) => {
        setSearch(event.target.value)
    }

    const scrollTop = () => {
        window.scrollTo(0, 0)
    }

    const render = pokemons && pokemons.map((pokemon, index) => {
        let typesPoke = []
        pokemon.types.map((type) => {typesPoke.push(type.type.name)})
        typesPoke.map((type, index) => {<div key={index}><p>{type}</p></div>})

        if (search === "") {
            return <div className='card-pokemon' key={pokemon.id}> 
                    {isPokemonInPokedex(pokemon.id) ? 
                        <div className='greyPoke'><img src={pokemon.sprites.other['official-artwork'].front_default} alt="pokemon de frente"/></div>
                        : 
                        <div className='normalPoke'><img src={pokemon.sprites.other['official-artwork'].front_default} alt="pokemon de frente"/></div>
                    } 
                    
                        <p>{pokemon.name[0].toUpperCase() + pokemon.name.substring(1)}</p>
                        <div id="card-types" key={index}>
                        {typesPoke.map((type) => {return <div key={type} className={type} id="type-bar"><p>{type[0].toUpperCase() + type.substring(1)}</p></div>})}
                    </div>
                    <div className="btn-card">
                        <Button size='small' variant='outlined' onClick={() => teste(pokemon.name)}>Ver detalhes</Button>
                        <Button size='small' variant='contained' onClick={() => addParaPokedex(pokemon.id, pokemon.sprites.other['official-artwork'].front_default, pokemon.name, pokemon.types)}>Add Pokémon</Button>
                    </div>
               </div>
        }

        else {
            if (pokemon.name.includes(search.toLowerCase())) {
                return <div className='card-pokemon' key={pokemon.id}>
                            {isPokemonInPokedex(pokemon.id) ? 
                                <div className='greyPoke'><img src={pokemon.sprites.other['official-artwork'].front_default} alt="pokemon de frente"/></div>
                                : 
                                <div className='normalPoke'><img src={pokemon.sprites.other['official-artwork'].front_default} alt="pokemon de frente"/></div>
                            } 
                            <p>{pokemon.name[0].toUpperCase() + pokemon.name.substring(1)}</p>
                            <div id="card-types" key={index}>
                                {typesPoke.map((type) => {return <div key={type} className={type} id="type-bar"><p>{type[0].toUpperCase() + type.substring(1)}</p></div>})}
                            </div>
                            <div className="btn-card">
                                <Button size='small' variant='outlined' onClick={() => teste(pokemon.name)}>Ver detalhes</Button>
                                <Button size='small' variant='contained' onClick={() => addParaPokedex(pokemon.id, pokemon.sprites.other['official-artwork'].front_default, pokemon.name, pokemon.types)}>Add Pokémon</Button>
                            </div>
                       </div>
            }
        }
    })

    return (
        <div className="container-home">          
            <Header scrollOrNavBack={scrollTop}/>
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
                <div><img onMouseOver={() => setPokedexImg("open")} onClick={() => navigate("/pokedex")} src={pokebola} alt="pokebola aberta"/></div>
                :
                <div id="pokebola-open"><img className="open" onMouseOut={() => setPokedexImg("closed")} onClick={() => navigate("/pokedex")} src={pokebolaAberta} alt="pokebola fechada"/></div>
            }
        
            </div>
            <div className="container-pokemons">
                {render}
            </div>
            
            <div className="show-more" onClick={() => verMaisPokemons()}>
                <img src={seta} alt="seta ver mais"/>
            </div>
        </div>
    )
}

export default Home;