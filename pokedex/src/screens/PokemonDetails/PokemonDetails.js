import { useEffect, useState } from 'react';	
import { useNavigate, useParams } from "react-router";
import axios from "axios"
import { BASE_URL } from '../../constants/url';
// Estilos
import "./styles.css"
import Header from "../../components/Header/Header"
import pokebola from "../../assets/pokebola.png"

const PokemonDetails = () => {
    const navigate = useNavigate()
    const {name} = useParams()
    const [selectedPokemon, setSelectedPokemon] = useState({})

    useEffect(() => {selectedPokemonDetails()} ,[])
    
    const selectedPokemonDetails = () => {
        axios
            .get(`${BASE_URL}/pokemon/${name}`)
            .then((response) => {
                setSelectedPokemon(response.data)
            })
            .catch((error) => {
                console.data(error)
            })
    }

    const renderPokemonStats = selectedPokemon.stats && selectedPokemon.stats.map((stat) => {
        return <div className='progress' key={stat.stat.name}>
                    <p>{stat.stat.name[0].toUpperCase() + stat.stat.name.substring(1)}</p>
                    <progress value={stat.base_stat} max="150">teste</progress>
                </div>
    })
    
    const renderPokemonMoves = selectedPokemon.abilities && selectedPokemon.abilities.map((abilities, index) => {
         if (index < 1) {  
            return <span key={index}>{abilities.ability.name[0].toUpperCase() + abilities.ability.name.substring(1)}</span>
        }}
    )

    const renderPokemonType = selectedPokemon.types && selectedPokemon.types.map((type, index) => {
        return <div id='type-bar' key={index} className={type.type.name}>
                    <p>{type.type.name[0].toUpperCase() + type.type.name.substring(1)}</p>
               </div>
    })
    
    const deleteLocalPokemon = (param) => {
        localStorage.removeItem("pokemon")
        navigate(param)
    }

    return (    
        <div className='container-details'>
            <Header scrollOrNavBack={() => navigate("/")}/>
            <div className='pokebola-pokedex'>
                <img src={pokebola} onClick={() => deleteLocalPokemon("/pokedex")}/>
            </div>
            <div>
                <div className="container-pokemon">
                    <div className='pokemon-splash'>
                        {selectedPokemon && selectedPokemon.sprites && (
                            <img src={selectedPokemon.sprites.other['official-artwork'].front_default} alt="pokemon de frente"/>
                        )}
                    </div>
                    
                    <h2>{name[0].toUpperCase() + name.substring(1)}</h2>
                    
                    <div className="pokemon-type">
                        {renderPokemonType}
                    </div>
                    
                    <div className="pokemon-infos">
                        <div className="info">
                            <p>Height</p>
                            {selectedPokemon.height / 10}m
                        </div>
                        
                        <div className="info">
                            <p>Weight</p>
                            {selectedPokemon.weight / 10}kg
                        </div>
                        
                        <div className="info">
                            <p>Ability</p>
                            {renderPokemonMoves}
                        </div>
                    </div>
                    {renderPokemonStats}
                </div>
            </div>
        </div>
    )
}

export default PokemonDetails;