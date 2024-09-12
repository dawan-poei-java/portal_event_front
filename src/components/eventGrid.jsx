import React from 'react'
import EventCard from './eventCard'

export default function eventGrid(args) {

    console.log(args.title)
  return (
    <>
    <h2 >{args.title}</h2>
          <div className="flex flex-warp warp event-container-soon">
          {args.listeElement.map((element)=>{
            return((<EventCard/>))
          })}
          </div>
    </>
  )
}
