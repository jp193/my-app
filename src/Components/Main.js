// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Card from "./Card";
// import Pokeinfo from "./Pokeinfo";

// const Main = () => {
//     const [pokeData, setPokeData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [page, setPage] = useState(1);
//     const [pokeDex, setPokeDex] = useState();
//     const [searchTerm, setSearchTerm] = useState("");

//     const LIMIT = 20;  
//     const TOTAL_POKEMON = 150;  
//     const baseURL = "https://pokeapi.co/api/v2/pokemon";

//     useEffect(() => {
//         // If there's a search term, we won't auto-fetch the list of Pokémon
//         if (searchTerm) return;

//         const fetchData = async () => {
//             try {
//                 setLoading(true);
//                 const offset = (page - 1) * LIMIT;
//                 const res = await axios.get(`${baseURL}?limit=${LIMIT}&offset=${offset}`);
                
//                 const results = await Promise.all(
//                     res.data.results.map(async item => {
//                         return await axios.get(item.url);
//                     })
//                 );
                
//                 setPokeData(results.map(result => result.data).sort((a, b) => a.id - b.id));
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };
        
//         fetchData();
//     }, [page, searchTerm]);

//     const canGoNext = (page * LIMIT) < TOTAL_POKEMON;

//     const handleSearch = async () => {
//         setLoading(true);
//         try {
//             const res = await axios.get(`${baseURL}/${searchTerm.toLowerCase()}`);
//             setPokeData([res.data]);
//         } catch (error) {
//             console.error("Error fetching Pokémon:", error);
//             alert("Could not find Pokémon");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <>
//             <div className="container">
//                 <div className="search-bar">
//                     <input 
//                         type="text" 
//                         value={searchTerm}
//                         onChange={e => setSearchTerm(e.target.value)}
//                         placeholder="Search Pokémon"
//                     />
//                     <button onClick={handleSearch}>Search</button>
//                 </div>
//                 <div className="left-content">
//                     <Card pokemon={pokeData} loading={loading} infoPokemon={poke => setPokeDex(poke)} />
//                     <div className="btn-group">
//                         {page > 1 && <button onClick={() => {
//                             setPokeData([]);
//                             setPage(prevPage => prevPage - 1);
//                         }}>Previous</button>}

//                         {canGoNext && <button onClick={() => {
//                             setPokeData([]);
//                             setPage(prevPage => prevPage + 1);
//                         }}>Next</button>}
//                     </div>
//                 </div>
//                 <div className="right-content">
//                     <Pokeinfo data={pokeDex} />
//                 </div>
//             </div>
//         </>
//     )
// }

// export default Main;

// -----------------------------

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Card from "./Card";
// import Pokeinfo from "./Pokeinfo";
// import './Main.module.css'

// const Main = () => {
//     const [pokeData, setPokeData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [page, setPage] = useState(1);
//     const [pokeDex, setPokeDex] = useState();

//     const LIMIT = 20;  // Display 20 Pokémon at a time
//     const TOTAL_POKEMON = 150;  // Total number of Pokémon to fetch
//     const baseURL = "https://pokeapi.co/api/v2/pokemon";

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 setLoading(true);
//                 const offset = (page - 1) * LIMIT;
//                 const res = await axios.get(`${baseURL}?limit=${LIMIT}&offset=${offset}`);
                
//                 const results = await Promise.all(
//                     res.data.results.map(async item => {
//                         return await axios.get(item.url);
//                     })
//                 );
                
//                 setPokeData(results.map(result => result.data).sort((a, b) => a.id - b.id));
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//                 // Handle the error appropriately in the UI
//             } finally {
//                 setLoading(false);
//             }
//         };
        
//         fetchData();
//     }, [page]);

//     const canGoNext = (page * LIMIT) < TOTAL_POKEMON;

//     return (
//         <div>
//             <div className="container">
//                 <div className="left-content">
//                     <Card pokemon={pokeData} loading={loading} infoPokemon={poke => setPokeDex(poke)} />
//                     <div className="btn-group">
//                         {page > 1 && <button onClick={() => {
//                             setPokeData([]);
//                             setPage(prevPage => prevPage - 1);
//                         }}>Previous</button>}

//                         {canGoNext && <button onClick={() => {
//                             setPokeData([]);
//                             setPage(prevPage => prevPage + 1);
//                         }}>Next</button>}
//                     </div>
//                 </div>
//                 <div className="right-content">
//                     <Pokeinfo data={pokeDex} />
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Main;


import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import CardBack from "./CardBack";
import Pokeinfo from "./Pokeinfo";
import styles from './Main.module.css';  // Assuming this is where you've added your CSS

const Main = () => {
  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pokeDex, setPokeDex] = useState();

  const LIMIT = 20;
  const TOTAL_POKEMON = 150;
  const baseURL = "https://pokeapi.co/api/v2/pokemon";

  useEffect(() => {
      const fetchData = async () => {
          try {
              setLoading(true);
              const offset = (page - 1) * LIMIT;
              const res = await axios.get(`${baseURL}?limit=${LIMIT}&offset=${offset}`);
              
              const results = await Promise.all(
                  res.data.results.map(async item => {
                      return await axios.get(item.url);
                  })
              );
              
              setPokeData(results.map(result => result.data).sort((a, b) => a.id - b.id));
          } catch (error) {
              console.error("Error fetching data:", error);
              
          } finally {
              setLoading(false);
          }
      };
      
      fetchData();
    }, [page]);

    const canGoNext = (page * LIMIT) < TOTAL_POKEMON;

    return (
      <div className={styles.container}>
        <div className={styles.leftContent}>
          
          {loading ? (
            <div>Loading...</div>
          ) : (
            pokeData.map(poke => (
              <Card key={poke.id} pokemon={poke} infoPokemon={poke => setPokeDex(poke)} />
            ))
          )}
          
          <div className={styles.btnGroup}>
            {page > 1 && <button className={styles.btn} onClick={() => {
              setPokeData([]);
              setPage(prevPage => prevPage - 1);
            }}>Previous</button>}
  
            {canGoNext && <button className={styles.btn} onClick={() => {
              setPokeData([]);
              setPage(prevPage => prevPage + 1);
            }}>Next</button>}
          </div>
        </div>
        
        <div className={styles.rightContent}>
          <Pokeinfo data={pokeDex} />
        </div>
      </div>
    )
  }
  
  export default Main;
  