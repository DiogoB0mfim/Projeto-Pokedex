import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../constants/url";
import GlobalStateContext from "./GlobalStateContext";

const GlobalState = (props) => {
  const [pokemonNames, setPokemonNames] = useState([]);
  const [pokemons, setPokemons] = useState([]);
  const [pokedex, setPokedex] = useState([]);
  const [qtdPokemons, setQtdPokemons] = useState(20);

  useEffect(() => {getPokemonNames()}, [qtdPokemons]);
  useEffect(() => {getPokemonDetails()}, [pokemonNames]);

  // Pegar detalhes do pokemon
  const getPokemonDetails = () => {
    const newList = [];
    pokemonNames.forEach((item) => {
      axios
        .get(`${BASE_URL}/pokemon/${item.name}`)
        
        .then((response) => {
          newList.push(response.data);
          if (newList.length === pokemonNames.length) { 
          setPokemons(newList);
        }})
        
        .catch((error) => 
            console.log(error.message));
      })
  }
  
  // Pegar nomes dos pokemons
  const getPokemonNames = () => {
    axios
      .get(`${BASE_URL}/pokemon?limit=${qtdPokemons}`)
      .then((response) => {
        setPokemonNames(response.data.results);
      })
      
      .catch((error) => {
        console.log(error.message)
      })
  }

  // Adicionar pokemon a pokedex
  const addParaPokedex = (id,image, name) => {
    const index = pokedex.findIndex((inPokedex) => {
        if (inPokedex.id === id) {
            return true;
        }
        
        else {
            return false;
        }
    })

    if (index === -1) {
        const newPoke = {
            id : id,
            image : image,
            name : name
        }
        const pokedexCopy = [...pokedex, newPoke]
        setPokedex(pokedexCopy)
        alert("Pokemon adicionado a pokedex")
    }
}

  // Apagar pokemon da pokedex
  const deltest = (index) => {
    if(window.confirm("deseja mesmo deletar?")) {
        pokedex.splice(index, 1)
    }
    getPokemonDetails()
  }

  // Adicionar mais Pokemons a home
  const verMaisPokemons = () => {
    setQtdPokemons(qtdPokemons + 20)
    getPokemonNames()
  }

  const data = {
    // Estados
    pokemons,
    pokedex,
    
    // Set States
    setPokemons,
    setPokedex,

    // Requisições
    getPokemonDetails,
    getPokemonNames,

    // Funções
    deltest,
    addParaPokedex,
    verMaisPokemons
  };

  return <GlobalStateContext.Provider value={data}>
          {props.children}
        </GlobalStateContext.Provider>
  
};

export default GlobalState;
