import React from 'react'
import { useParams } from 'react-router-dom'

export default function event() {
    const {eventId} = useParams()
    console.log(eventId)
  return (
    <div className="bg-red-500 flex">event : {eventId}</div>
  )
}
