import React, { useState } from 'react'



export default function SideBar({ listButton }) {
  const handleClick =(event)=>{
    const value = event.target.getAttribute('data-value')
    setPageSelected(value)
  }
  return (
    <div className="flex flex-col gap-4">
      {listButton.map((Element) => {
        return <button data-value={Element} onClick={handleClick}>{Element}</button>;
      })}
    </div>
  );
}
