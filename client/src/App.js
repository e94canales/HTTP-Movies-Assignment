import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import axios from 'axios';
import UpdateMovie from './Movies/UpdateMovie'
import AddMovie from './Movies/AddMovie'

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const getMovieList = () => {
    axios
      .get("http://localhost:3333/api/movies")
      .then(res => {
        setMovieList(res.data) 
        // console.log(res)
      })
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route 
        exact 
        path='/add-movie'
        render={props => <AddMovie {...props} setMovieList={setMovieList}/>} />

      <Route 
        exact 
        path='/update-movie/:id'
        render={props => <UpdateMovie {...props} setMovieList={setMovieList} movieList={movieList}/>} />
        
      

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} setMovieList={setMovieList}/>
      </Route>
    </>
  );
};

export default App;
