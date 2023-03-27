import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {getVideoamesByName} from "../actions/index"

export default function SearchBar(){
    const dispatch = useDispatch()
    const [name, setName] = useState("")

    function handleInputChange(event){
        event.preventDefault()
        setName(event.target.value)
        console.log(name)    
    }

    function handleSubmit(event){
        event.preventDefault()
        dispatch(getVideoamesByName(name))
    }

    return (
        <div>
            <input
            type= 'text'
            placeholder="Buscar..."
            onChange={(event)=>handleInputChange(event)}
            />
            <button
            type="submit"
            onClick = {(event)=> handleSubmit(event)}
            >Buscar</button>
        </div>
    )
}