import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const initialMovie = {
    title: '',
    director: '',
    metascore: '',
    stars: [],
}

const AddMovie = props => {

    const [movie, setMovie ] = useState(initialMovie)
    const [ updating, setUpdating ] = useState(false)
    const { push } = useHistory()
    const { setMovieList } = props

    useEffect(() => {
        if (updating){
            axios.get('http://localhost:3333/api/movies')
                .then(res => {
                    setMovieList(res.data)
                })
        }
    }, [updating, setMovieList])

    const inputHandler = e => {
        const name = e.target.name
        const value = e.target.value

        if (name !== 'stars'){
            setMovie({
                ...movie,
                [name]: value
            })
        } else {
            setMovie({
                ...movie,
                [name]: [value]
            })
        }
    }
    const addMovie = e => {
        e.preventDefault()

        axios.post('http://localhost:3333/api/movies', movie)
            .then( res => {
                // console.log(res)
                setUpdating(true)
                push('/')
            })
    }


    return (
        <form>
            <input
            name='title'
            value={movie.title}
            type='text'
            onChange={inputHandler}
            placeholder='Title'>
            </input>

            <input
            name='director'
            value={movie.director}
            type='text'
            onChange={inputHandler}
            placeholder='Director'>
            </input>

            <input
            name='metascore'
            value={movie.metascore}
            type='text'
            onChange={inputHandler}
            placeholder='Metascore'>
            </input>

            <input
            name='stars'
            value={movie.stars}
            type='text'
            onChange={inputHandler}
            placeholder='Stars'>
            </input>

            <button onClick={addMovie}>Add</button>
        </form>
    )
}

export default AddMovie