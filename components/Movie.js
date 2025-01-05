import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar, faVideo } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/Movie.module.css";
import { useDispatch } from "react-redux";
import { watchMovie } from "../reducers/user";

function Movie(props) {
  const dispatch = useDispatch();

  // Average evaluation
  const stars = [];
  for (let i = 0; i < 10; i++) {
    let style = {};
    if (i < props.voteAverage - 1) {
      style = { color: "#f1c40f" };
    }
    stars.push(<FontAwesomeIcon key={i} icon={faStar} style={style} />);
  }

  // Watch movie
  const handleWatchMovie = (title) => {
    dispatch(watchMovie(title));
  };
  let videoIconStyle = { cursor: "pointer" };
  if (props.watch && props.watch.count > 0) {
    videoIconStyle = { color: "#e74c3c", cursor: "pointer" };
  }

  // Like movie
  const handleLikeMovie = () => {
    props.updateLikedMovies(props.title);
  };

  let heartIconStyle = { cursor: "pointer" };
  if (props.isLiked) {
    heartIconStyle = { color: "#e74c3c", cursor: "pointer" };
  }

  // Personal note
  const personalStars = [];
  for (let i = 0; i < 10; i++) {
    let style = { cursor: "pointer" };
    if (props.personalNote && i < props.personalNote.count) {
      style = { color: "#2196f3", cursor: "pointer" };
    }
    personalStars.push(
      <FontAwesomeIcon
        key={i}
        icon={faStar}
        onClick={() => props.handleUpdatePersonnalNote(props.title, i + 1)}
        style={style}
        className="note"
      />
    );
  }

  return (
    <div className={styles.card}>
      <img className={styles.image} src={props.poster} alt={props.title} />
      <div className={styles.textContainer}>
        <div>
          <span className={styles.name}>{props.title}</span>
          <p className={styles.description}>{props.overview}</p>
        </div>
        <div className={styles.iconContainer}>
          <span className={styles.vote}>
            {stars} ({props.voteCount})
          </span>
          <span>
            {personalStars} ({props.personalNote && props.personalNote.count})
          </span>
          <span>
            <FontAwesomeIcon
              icon={faVideo}
              onClick={() => handleWatchMovie(props.title)}
              style={videoIconStyle}
              className="watch"
            />{" "}
            ({props.watch && props.watch.count})
          </span>
          <span>
            <FontAwesomeIcon
              icon={faHeart}
              onClick={() => handleLikeMovie()}
              style={heartIconStyle}
              className="like"
            />
          </span>
        </div>
      </div>
    </div>
  );
}

export default Movie;
