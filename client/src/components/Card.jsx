import React from "react";
import '../index.css'

export default function Card({name, image, genres, index}){
    return(
    <section key={index}>
    <article >
    <h4>{name}</h4>
    <img 
        src={image} 
        alt='img not found' 
        width='200px' 
        height='250px'
    />
    <h5>{genres.map((event, index)=>(
    <div key={index}>
    <i>{event}</i>
    </div>
    ))}
    </h5> 
    </article>
    </section>
    )
}