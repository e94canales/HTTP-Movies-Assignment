import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";


function Movie(props) {
  const { setMovieList } = props
  const [movie, setMovie] = useState(null);
  const [ updating, setUpdating ] = useState(false)
  const params = useParams();
  const { push } = useHistory()

  useEffect(() => {
        if (updating){
            axios.get('http://localhost:3333/api/movies')
                .then(res => {
                  // console.log(res.data)
                  setMovieList(res.data)
                })
        }
    }, [updating, setMovieList])

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:3333/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    props.addToSavedList(movie);
  };
  const updateMovie = e => {
    e.preventDefault()

    push(`/update-movie/${params.id}`)
  }
  const deleteMovie = e => {
    e.preventDefault()

    axios.delete(`http://localhost:3333/api/movies/${params.id}`)
      .then( res => {
        setUpdating(true)
        push('/')
      })
    
  }

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>

      <button onClick={updateMovie}>
        Update
      </button>
      <button onClick={deleteMovie}>
        Delete
      </button>
    </div>
  );
}

export default Movie;
