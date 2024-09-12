import React from 'react'
import "../styles/events.scss"
import CityCard from '../components/cityCard.jsx'

export default function events() {

  const elements = [...Array(16)]

  
  return (
    <section className='page-container'>
    <div className='grid gap-10'>
    <h2>Les Villes</h2>
    <div className='cards-container flex'>
    {elements.map((elements)=>{
            return((<CityCard/>))
          })}
    </div>
    </div>
    </section>
  )
}
