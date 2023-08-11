import React from 'react';
import styles from './Card.module.css';

const Card = ({ pokemon, loading, infoPokemon }) => {
    if (loading || !pokemon) {
        return (
            <div className={styles.skeleton}>
                <div className={styles.skeletonImage}></div>
                <h2 className={styles.skeletonText}></h2>
                <div className={styles.skeletonText}></div>
            </div>
        );
    }

    return (
        <div className={styles.card} key={pokemon.id} onClick={() => infoPokemon && infoPokemon(pokemon)}>
            <div className={styles.cardContent}>
                <h2>{pokemon.name}</h2>
                <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            </div>
        </div>
    );
}

export default Card;



