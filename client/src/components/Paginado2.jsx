import React from 'react'
import  Style  from 'react'

export default function Paginado2({ videogamesPerPage, videogames, paginado2 }) {
    const pageNumbers = []
    for (let i = 0; i < Math.ceil(videogames / videogamesPerPage); i++) {
    pageNumbers.push(i + 1)
    }

    return (
    <div>
        <div>
        {
        pageNumbers && pageNumbers.map(event => (
        <div key={event} className={Style.number} onClick={() => paginado2(event)}>{event}</div>
        ))
        }
        </div>
    </div>
    )
}