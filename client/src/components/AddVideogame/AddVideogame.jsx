import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { getGenres, getPlatforms, postVideogame } from '../../actions/index'

export default function AddVideogame(){
    const dispatch = useDispatch()
    const allGenres = useSelector((state) => state.genres)
    const allPlatforms = useSelector((state) => state.platforms)
    
    const [input, setInput] = useState({
        name: '', 
        description: '', 
        image: '',
        releaseDate: '', 
        rating: '', 
        genres: [], 
        platforms: []
    })
    
    useEffect(()=>{
        dispatch(getGenres())
    }, [dispatch])

    useEffect(()=>{
        dispatch(getPlatforms())
    }, [dispatch])

    function handleChange(event) {
        setInput({
            ...input,
            [event.target.name]: event.target.value, 
        })
    }

    function handleSelectGenres(event) {
        setInput({
            ...input,
            genres: [...input.genres, event.target.value]
        })
    }

    function handleSelectPlatforms(event) {
        setInput({
            ...input,
            platforms: [...input.platforms, event.target.value]
        })
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log(input);
        dispatch(postVideogame(input))
        alert('Game created succesfully')
        setInput({
            name: '', 
            description: '', 
            image: '',
            releaseDate: '', 
            rating: '', 
            genres: [], 
            platforms: []
        })

    
    }

    function handleDelete(event) {
        setInput({
            ...input,
            platforms: input.platforms.filter( plat => plat !== event )
        })
    }

    function handleDeleteGenres(event) {
        setInput({
            ...input,
            genres: input.genres.filter( gen => gen !== event )
        })
    }

    return(
        <div>
            <Link to='/home'>
            <button className="btn" >Volver</button>
            </Link>
            <h1>Crear Juego</h1>
            <form className="form" onSubmit={e=>handleSubmit(e)}>
                <div>
                    <label className=".form input">Nombre</label>
                    <input
                    type = 'text'
                    value = {input.name}
                    name='name'
                    onChange = {handleChange}    
                    required
                />
                </div>
                <div>
                    <label className=".form input">Description</label>
                    <input
                    type = 'text'
                    value = {input.description}
                    name='description'
                    onChange={handleChange} 
                    required
                />
                </div>
                <div>
                    <label className=".form input">Imagen</label>
                    <input
                    type = 'text'
                    value = {input.background_image}
                    name= 'background_image'
                    onChange={handleChange} 
                    required
                />
                </div>
                <div>
                    <label>Fecha de lanzamiento</label>
                    <input
                    onChange = {handleChange} 
                    type = 'date'
                    value = {input.releaseDate}
                    name='releaseDate'
                />
                </div>
                <div>
                    <label>Rating</label>
                    <input
                    onChange = {handleChange} 
                    type = 'number'
                    value = {input.rating}
                    name='rating'
                    required
                />
                </div>
                <div>
                    <label>Géneros</label>
                    <select onChange={event => handleSelectGenres(event)}>
                    <option value='All' key='unique1'>
                    All
                    </option>
                    {allGenres.map((el) => {
                    return (
                    <option value={el.name} key={el.id}>{el.name}</option>
                    )
                    })}
                    </select>
                    <ul>    
                    {input.genres.map( ( event, index) =>
                        <li key={index}>{event}
                        <button onClick={()=>handleDeleteGenres(event)} >x</button>
                    </li>
                    )}
                    </ul>
                </div>
                <div>
                    <label>Plataformas</label>
                    <select onChange={ event => handleSelectPlatforms(event)}>
                    <option value='All' key='unique2'>
                    All
                    </option>
                    {allPlatforms.map((el) => {
                    return (
                    <option value={el.name} key={el.id}>{el.name}</option>
                    )
                    })}
                    </select>
                    <ul>    
                    {input.platforms.map( ( event, index) =>
                    <li key={index}>{event}
                    <button onClick={()=>handleDelete(event)} >x</button>
                    </li>
                    )}
                    </ul>
                </div>
                <button className="btn" type='submit'>crear personaje</button>
            </form>
        </div>
    )
}