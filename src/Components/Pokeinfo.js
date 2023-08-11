import React from "react";

const Pokeinfo = ({ data }) => {
    if (!data) return null;

    return (
        <>
            <h1>{data.name}</h1>
            <img src={`https://img.pokemondb.net/sprites/black-white/anim/normal/${data.name.toLowerCase()}.gif`} alt={data.name} />
            <div className="abilities">
                {
                    data.abilities.map(poke => (
                        <div className="group" key={poke.ability.name}>
                            <h2>{poke.ability.name}</h2>
                        </div>
                    ))
                }
            </div>
            <div className="base-stat">
                {
                    data.stats.map(poke => (
                        <h3 key={poke.stat.name}>{poke.stat.name}:{poke.base_stat}</h3>
                    ))
                }
            </div>
            <div className="moves">
                <h2>Moves:</h2>
                <ul>
                    {
                        data.moves.slice(0, 4).map(move => (
                            <li key={move.move.name}>{move.move.name}</li>
                        ))
                    }
                </ul>
            </div>
        </>
    )
}
export default Pokeinfo;


