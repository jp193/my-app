import React from "react";

const CardBack = ({ pokemon, loading }) => {
    if (loading || !pokemon) {
        return <h1>Loading...</h1>;
    }

    return (
        <div className="card" key={pokemon.id}>
            <h2>{pokemon.id}</h2>
            <img src={pokemon.sprites.back_default} alt={pokemon.name} />
            <h2>{pokemon.name}</h2>
        </div>
    );
}

export default CardBack;

