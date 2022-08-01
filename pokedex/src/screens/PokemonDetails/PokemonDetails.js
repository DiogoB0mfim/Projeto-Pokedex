import { useEffect, useState } from 'react';	
import { useNavigate, useParams } from "react-router";
import axios from "axios"
import { BASE_URL } from '../../constants/url';
// Estilos
import "./styles.css"

const PokemonDetails = () => {
    const navigate = useNavigate()
    const {name} = useParams()
    const [selectedPokemon, setSelectedPokemon] = useState({})
    
    useEffect(() => {selectedPokemonDetails()} ,[])
    
    console.log(selectedPokemon)
    const selectedPokemonDetails = () => {
        axios
            .get(`${BASE_URL}/pokemon/${ name }`)
            .then((response) => {
                setSelectedPokemon(response.data)
            })
            .catch((error) => {
                console.data(error)
            })
    }

    const renderPokemonStats = selectedPokemon.stats && selectedPokemon.stats.map((stat) => {
        return <div className='progress' key={stat.stat.name}>
                    <p>{stat.stat.name}</p>
                
                    <progress value={stat.base_stat} max="150">teste</progress> 
                    
                </div>
    })
    
    const renderPokemonMoves = selectedPokemon.abilities && selectedPokemon.abilities.map((abilities, index) => {
         if (index < 1) {  
            return <p key={index}>{abilities.ability.name}</p>
        }}
    )

    const renderPokemonType = selectedPokemon.types && selectedPokemon.types.map((type, index) => {
        return <div key={index}>
                <p>{type.type.name}</p>
               </div>
    })
    
    const deleteLocalPokemon = (param) => {
        localStorage.removeItem("pokemon")
        navigate(param)
    }

    return (
        <div>
            <h1>Detalhes do pokemon</h1>
            <button onClick={() => deleteLocalPokemon("/")}>Voltar para lista de pokemons</button>
            <button onClick={() => deleteLocalPokemon("/pokedex")}>Voltar para a pokedex</button>
            
            <div className='container-details'>
                <div className='pokemon-splash'>
                    {selectedPokemon && selectedPokemon.sprites && (
                        <div>
                            <img src={selectedPokemon.sprites.versions["generation-v"]["black-white"].animated.front_default} alt="pokemon de frente"/>
                            <img src={selectedPokemon.sprites.versions["generation-v"]["black-white"].animated.back_default} alt="pokemon de costas"/>
                        </div>   
                    )}
                </div>
                
                <h2>{name}</h2>
                
                <div className="pokemon-type">
                    {renderPokemonType}
                </div>
                
                <div className="pokemon-infos">
                    <div>
                        <p>Height</p>
                        {selectedPokemon.height}m
                    </div>
                    

                    <div>
                        <p>Weight</p>
                        {selectedPokemon.weight}kg
                    </div>
                    
                    <div>
                        <p>Principal Ability</p>
                        {renderPokemonMoves} 
                    </div>
                </div>

                
                
                {renderPokemonStats}
                
                
                
               
            </div>
        </div>
    )
}

export default PokemonDetails;