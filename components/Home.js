import { useEffect, useState } from "react";
import { Popover, Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import Movie from "./Movie";
import "antd/dist/antd.css";
import styles from "../styles/Home.module.css";

function Home() {
  const [likedMovies, setLikedMovies] = useState([]);
  const [moviesData, setMoviesData] = useState([]);

  const urlImg = "https://image.tmdb.org/t/p/original";
  useEffect(() => {
    fetch(`https://mymoviz-backend-rosy.vercel.app/movies`)
      .then((response) => response.json())
      .then((data) => {
        const newKeys = {
          vote_average: "voteAverage",
          vote_count: "voteCount",
          poster_path: "poster",
        };
        const updatedMovies = data.movies.map((movie) => {
          return Object.entries(movie).reduce((acc, [key, value]) => {
            const newKey = newKeys[key] || key;
            acc[newKey] = value; // On ajoute la nouvelle clé avec sa
            return acc;
          }, {});
        });
        for (let movie of updatedMovies) {
          const poster = movie.poster;
          movie.poster = urlImg + poster;
          if (movie.overview.length > 250) {
            const overview = movie.overview.slice(0, 250);
            movie.overview = overview + "...";
          }
        }
        setMoviesData(updatedMovies);
      });
  }, []);

  // Liked movies (inverse data flow)
  const updateLikedMovies = (movieTitle) => {
    if (likedMovies.find((movie) => movie === movieTitle)) {
      setLikedMovies(likedMovies.filter((movie) => movie !== movieTitle));
    } else {
      setLikedMovies([...likedMovies, movieTitle]);
    }
  };

  const likedMoviesPopover = likedMovies.map((data, i) => {
    return (
      <div key={i} className={styles.likedMoviesContainer}>
        <span className="likedMovie">{data}</span>
        <FontAwesomeIcon
          icon={faCircleXmark}
          onClick={() => updateLikedMovies(data)}
          className={styles.crossIcon}
        />
      </div>
    );
  });

  const popoverContent = (
    <div className={styles.popoverContent}>{likedMoviesPopover}</div>
  );

  const movies = moviesData.map((data, i) => {
    const isLiked = likedMovies.some((movie) => movie === data.title);
    return (
      <Movie
        key={i}
        updateLikedMovies={updateLikedMovies}
        isLiked={isLiked}
        title={data.title}
        overview={data.overview}
        poster={data.poster}
        voteAverage={data.voteAverage}
        voteCount={data.voteCount}
      />
    );
  });

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.logocontainer}>
          <img src="logo.png" alt="Logo" />
          <img className={styles.logo} src="logoletter.png" alt="Letter logo" />
        </div>
        <Popover
          title="Liked movies"
          content={popoverContent}
          className={styles.popover}
          trigger="click"
        >
          <Button>♥ {likedMovies.length} movie(s)</Button>
        </Popover>
      </div>
      <div className={styles.title}>LAST RELEASES</div>
      <div className={styles.moviesContainer}>{movies}</div>
    </div>
  );
}

export default Home;
