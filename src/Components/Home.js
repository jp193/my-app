// import React, { useState, useEffect } from 'react';
// import styles from './Home.module.css';

// const POKEMON_COUNT = 15; 
// const POKEMON_API = "https://pokeapi.co/api/v2/pokemon?limit=" + POKEMON_COUNT;

// function Slideshow() {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [images, setImages] = useState([]);
//   const [isFullScreen, setIsFullScreen] = useState(true);

//   const fullScreenImage = 'https://j.gifs.com/vO9x7P.gif';

//   useEffect(() => {
//     fetch(POKEMON_API)
//       .then(response => response.json())
//       .then(data => {
//         const imageUrls = data.results.map(pokemon => 
//           `https://img.pokemondb.net/sprites/black-white/anim/normal/${pokemon.name}.gif`
//         );
//         setImages(imageUrls);
//       })
//       .catch(error => console.error("Failed to fetch Pokémon:", error));
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prevSlide) =>
//         prevSlide === images.length - 1 ? 0 : prevSlide + 1
//       );
//     }, 6000);

//     return () => {
//       clearInterval(interval);
//     };
//   }, [images.length]);

//   useEffect(() => {
//     if (isFullScreen) {
//       const timeout = setTimeout(() => {
//         setIsFullScreen(false);
//       }, 3000); 

//       return () => {
//         clearTimeout(timeout);
//       };
//     }
//   }, [isFullScreen]);

//   return (
//     <div className={styles.slideshowContainer}>
//       {isFullScreen && (
//         <img
//           className={styles.fullScreenImage}
//           src={fullScreenImage}
//           alt="Fullscreen Display"
//         />
//       )}
//       {!isFullScreen && (
//         <>
//           <h1>WelCome to the Poke show</h1>
//           <img src={images[currentSlide]} alt={`Slide ${currentSlide + 1}`} />
//           <div className={styles.dotContainer}>
//             {images.map((image, index) => (
//               <span
//                 key={index}
//                 className={currentSlide === index ? `${styles.dot} ${styles.active}` : styles.dot}
//                 onClick={() => setCurrentSlide(index)}
//               ></span>
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default Slideshow;

import React from 'react';
import styles from './Home.module.css';

const fullScreenImage = 'https://j.gifs.com/vO9x7P.gif';

function Slideshow() {
  return (
    <div className={styles.fullScreenContainer}>
      <img
        className={styles.fullScreenImage}
        src={fullScreenImage}
        alt="Fullscreen Display"
      />
    </div>
  );
}

export default Slideshow;
