import React from 'react'
import "../styles/events.scss"
import VilleCard from '../components/villeCard'

export default function events() {

  const elements = [...Array(16)]

  
  return (
    <section className='page-container'>
    <div className='grid gap-10'>
    <h2>Évènements</h2>
    <div className='cards-container flex'>
    {elements.map((elements)=>{
            return((<VilleCard/>))
          })}
    </div>
    </div>
    </section>
  )
}
