import React, { useState } from "react";

export default function CartItem({items, handleDelete}) {
  const [isTogle, setIsToggle] = useState(false);

  function openInformation() {
    if(!isTogle){setIsToggle(true);}else{setIsToggle(false)}
  }
  
  return (
    <>
      <div key={items.id} className="cart-item">
        <div className="flex justify-between">
          <h5>{items.name}</h5>
          <h5>{items.price}€</h5>
        </div>
        <button value={items.id} onClick={handleDelete} className="text-start w-fit text-red-400">
          supprimer
        </button>
        {/* <div className="visiteur flex flex-col gap-5">
          <div className="flex justify-between">

          <button onClick={openInformation} className="text-start w-fit">
            Saisir les informations
          </button>
          </div>
          <div className={isTogle ? "info":"info-hidden"}>
            <hr />
            <div className="visiteur-input gap-6">
              <div className="grid gap-2">
                <label htmlFor="">Nom</label>
                <input type="text" className="rounded border" />
              </div>
              <div className="grid gap-2">
                <label htmlFor="">Prénom</label>
                <input type="text" className="rounded border" />
              </div>
              <div className="grid gap-2">
                <label htmlFor="">Email</label>
                <input type="text" className="rounded border" />
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
}
