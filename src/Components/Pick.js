import React, { useState, useEffect } from 'react';
import styles from './battle.module.css';


class Pokemon {
    constructor(name, sprite, hp, moves) {
        this.name = name;
        this.sprite = sprite;
        this.hp = hp;
        this.fullhp = hp;
        this.moves = moves;
    }
}

const pkmList = [
  ['Charizard', "https://img.pokemondb.net/sprites/black-white/anim/shiny/charizard.gif", 360, [
    ['Flamethrower', 'fire', 95, 0.95],
    ['Dragon claw', 'dragon', 80, 0.95],
    ['Air slash', 'fly', 75, 0.75],
    ['Slash', 'normal', 70, 0.70]
  ]],
  ['Blastoise', 'https://img.pokemondb.net/sprites/black-white/anim/shiny/blastoise.gif', 362, [
    ['Surf', 'water', 90, 0.90],
    ['Crunch', 'normal', 80, 0.95],
    ['Ice punch', 'ice', 75, 0.95],
    ['Flash cannon', 'steel', 80, 0.95]
  ]],
  ['Venusaur', 'https://img.pokemondb.net/sprites/black-white/anim/shiny/venusaur.gif', 364, [
    ['Petal Blizzard', 'grass', 90, 0.95],
    ['Sludge Bomb', 'poison', 90, 0.95],
    ['Earthquake', 'ground', 100, 0.95],
    ['Body slam', 'normal', 85, 0.95]
  ]],
  ['Pikachu', 'https://img.pokemondb.net/sprites/black-white/anim/shiny/pikachu.gif', 360, [
    ['Thunderbolt', 'electric', 90, 0.95],
    ['Iron tail', 'steel', 90, 0.95],
    ['Quick Attack', 'normal', 100, 0.95],
    ['Volt tackle', 'electric', 85, 0.95]
  ]]
];
const typeMatch = {
  'Charizard': [['ground'], ['water', 'rock'], ['fire', 'grass', 'steel']],
  'Blastoise': [['electric'], ['grass'], ['fire', 'water']],
  'Venusaur': [['poison'], ['fire', 'fly', 'ice', 'steel'], ['grass', 'water']],
  'Pikachu': [['ground'], ['rock'], ['electric']]
}

function PokemonGame() {
    const [pk1, setPk1] = useState(null);
    const [pk2, setPk2] = useState(null);
    const [comment, setComment] = useState('');

    useEffect(() => {
        setPk1(spawn(true));
        setPk2(spawn(false));
    }, []);

    const spawn = (bool) => {
        const p = pkmList[Math.floor(Math.random() * pkmList.length)];
        return new Pokemon(p[0], p[1], p[2], p[3]);
    };

    const attack = (move, attacker, receiver, updateHp) => {
        setComment(`${attacker.name} used ${move[0]}!`);
        if (Math.random() < move[3]) {
            let power = move[2] + Math.floor(Math.random() * 10);
            const rtype = typeMatch[receiver.name];
            const mtype = move[1];
            let scale = 1;

            rtype.forEach((typeArray, index) => {
                if (typeArray.includes(mtype)) {
                    switch (index) {
                        case 0:
                            scale = 0;
                            setComment('It had no effect!');
                            break;
                        case 1:
                            scale = 2;
                            setComment('It was super effective!');
                            break;
                        case 2:
                            scale = 0.5;
                            setComment('It was not very effective!');
                            break;
                    }
                }
            });

            power *= scale;
            updateHp(receiver, Math.floor(power));
        } else {
            setComment('Attack missed!');
        }
        checkWinner();
    };

    const updateHpForPk1 = (receiver, damage) => {
        setPk1(prev => ({ ...prev, hp: receiver.hp - damage }));
    };

    const updateHpForPk2 = (receiver, damage) => {
        setPk2(prev => ({ ...prev, hp: receiver.hp - damage }));
    };

    const checkWinner = () => {
        const faintedPokemon = (pk1.hp <= 0) ? pk1 : (pk2.hp <= 0) ? pk2 : null;
        if (faintedPokemon) {
            alert(`Game Over: ${faintedPokemon.name} fainted!`);
        }
    };

    if (!pk1 || !pk2) return <div>Loading...</div>;

    return (
        <div>
            <audio id="backgroundMusic" loop autoPlay>
                <source src="https://vgmsite.com/soundtracks/pokemon-sword-shield-ost/pnzlhjcndt/60%20-%20Battle%21%20%28Gym%20Leader%29.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
            <header>
                <h1>Pokemon Chapionship</h1>
                <p className={`${styles.hp} ${styles.hp1}`}>HP: {pk1.hp}/{pk1.fullhp}</p>
                <p className={`${styles.hp} ${styles.hp2}`}>HP: {pk2.hp}/{pk2.fullhp}</p>
                <div className={styles.comment}>
                    <h3>{comment}</h3>
                </div>
            </header>
            <div className={styles.pk1}>
                <img src={pk1.sprite} alt={pk1.name} />
            </div>
            <div className={styles.pk2}>
                <img src={pk2.sprite} alt={pk2.name} />
            </div>
            <div className={styles.movesContainer}>
                {pk1.moves.map((move, i) => (
                    <button 
                        key={i} 
                        className={styles.moveButton}
                        onClick={() => {
                            attack(move, pk1, pk2, updateHpForPk2);
                            setTimeout(() => {
                                const randomMove = pk2.moves[Math.floor(Math.random() * pk2.moves.length)];
                                attack(randomMove, pk2, pk1, updateHpForPk1);
                            }, 2000);
                        }}
                    >
                        {move[0]}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default PokemonGame;