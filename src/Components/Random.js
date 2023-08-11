import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import CardBack from "./CardBack";
import styles from './battle.module.css';

const RandomBattle = () => {
  const [pokeData, setPokeData] = useState([]);
  const [player1, setPlayer1] = useState(null);
  const [player2, setPlayer2] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const LIMIT = 150;  // To fetch all 150 Pokémon for random selection
  const baseURL = "https://pokeapi.co/api/v2/pokemon";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${baseURL}?limit=${LIMIT}`);
        const results = await Promise.all(
          res.data.results.map(async item => {
            return await axios.get(item.url);
          })
        );

        const allPokemon = results.map(result => result.data);
        setPokeData(allPokemon);

        // Randomly select two different Pokémon
        const randomIndices = getRandomIndices(allPokemon.length);
        setPlayer1(allPokemon[randomIndices[0]]);
        setPlayer2(allPokemon[randomIndices[1]]);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching Pokémon data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getRandomIndices = (length) => {
    let index1 = Math.floor(Math.random() * length);
    let index2 = Math.floor(Math.random() * length);
    while (index1 === index2) {
      index2 = Math.floor(Math.random() * length);
    }
    return [index1, index2];
  };

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>{error}</h1>;

  return (
    <div className={styles.battleContainer}>
      <h1>Random Pokémon Battle</h1>
      <CardBack pokemon={player1} loading={loading} />
      <Card pokemon={player2} loading={loading} />
    </div>
  );
}

export default RandomBattle;
