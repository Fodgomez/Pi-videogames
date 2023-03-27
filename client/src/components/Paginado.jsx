/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import './paginado.css'

export default function Paginado({gamesPerPage, allGames, paginado}){
    const pageNumbers = []

    for(let i=0; i<=Math.ceil(allGames/gamesPerPage); i++){
        pageNumbers.push(i+1)
    }
    return(
        <nav className='paginado'>
        <ul>
        {
        pageNumbers?.map(number=>(
        <li key={number}>
        <a onClick={()=>paginado(number)}>{number}</a>
        </li>
            ))
        }
    </ul>
</nav>
    )
}