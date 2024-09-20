import React from 'react'



export default function SideBar({ listButton }) {
 
  return (
    <div className="flex flex-col gap-4">
      {listButton.map((Element) => {
        return <li>{Element}</li>;
      })}
    </div>
  );
}
