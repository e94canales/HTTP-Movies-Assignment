import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useHistory } from 'react-router-dom'

const initialMovie = {
    title: '',
    director: '',
    metascore: '',
    stars: [],
}

const UpdateMovie = props => {
    const { setMovieList } = props
    const [movie, setMovie ] = useState(initialMovie)
    const [ updating, setUpdating ] = useState(false)
    const params = useParams()
    const { push } = useHistory()

    useEffect(() => {
        axios
            .get(`http://localhost:3333/api/movies/${params.id}`)
            .then(res => {
                setMovie(res.data)
            })
    }, [params.id])
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

        setMovie({
            ...movie,
            [name]: value
        })
    }
    const updateHandler = e => {
        e.preventDefault()

        axios
            .put(`http://localhost:3333/api/movies/${params.id}`, movie)
            .then(res => {
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

            <button onClick={updateHandler}>Update</button>
        </form>
    )
}

export default UpdateMovie