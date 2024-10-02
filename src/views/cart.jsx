import React, { useEffect, useState } from "react";
import "../styles/cart.scss";
import CartItem from "../components/cartItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useApi } from "../hooks/useApi";
import cartService from "../services/cart";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [discountCode, setdiscountCode] = useState([]);
  const [selectedDiscountCode, setSelectedDiscountCode] = useState();
  const [inputValue, setInputValue] = useState("");
  const [invalidCode, setInvalidCode] = useState(false);
  const [cartPrice, setCartPrice] = useState(0);
  const [cartFinalPrice, setCartFinalPrice] = useState(0);

  function handleChange(e) {
    setInputValue(e.target.value);
  }

  function handleDelete(e) {
    let delId = cartItems.filter((item) => item.id == parseInt(e.target.value));
    cartService.removeFromCart(delId[0].id);

    const updateItems = cartItems.filter(
      (item) => item.id !== parseInt(e.target.value)
    );
    setCartItems(updateItems);
  }

  function deleteDiscount() {
    setSelectedDiscountCode();
    setCartFinalPrice(cartPrice);
  }

  function handleDiscountCode() {
    let codefound = discountCode.find(
      (code) => code.name === inputValue.toLocaleUpperCase()
    );
    if (codefound) {
      setSelectedDiscountCode(codefound); // Mémorise le code sélectionné
      setInvalidCode(false); // Pas d'erreur, le code est valide
      setInputValue(""); // Réinitialise le champ de saisie
    } else {
      setInvalidCode(true); // Affiche l'erreur si le code est invalide
    }
  }

  console.log(cartItems.length);
  useEffect(() => {
    if (cartItems) {
      let sum = cartItems.reduce((acc, item) => acc + item.price, 0); // Somme des prix des items

      setCartPrice(sum); // Mets à jour le prix total du panier

      // Si un code promo est sélectionné, applique la réduction
      if (selectedDiscountCode) {
        let discountedPrice = sum - (sum * selectedDiscountCode.discount) / 100;
        setCartFinalPrice(discountedPrice > 0 ? discountedPrice : 0); // S'assure que le prix ne soit pas négatif
      } else {
        setCartFinalPrice(sum); // Si pas de code promo, le prix final est égal au prix total
      }
    }
  }, [cartItems, selectedDiscountCode]); // Exécute à chaque changement de cartItems ou selectedDiscountCode

  useEffect(() => {
    setCartItems(cartService.getCart);
    setdiscountCode([
      { id: 1, name: "SUMMER2024", discount: 20 },
      { id: 2, name: "WELCOME10", discount: 10 },
      { id: 4, name: "BLACKFRIDAY", discount: 50 },
      { id: 5, name: "CYBERMONDAY", discount: 30 },
    ]);
  }, []);
  return (
    <section id="cart-page" className="page-container">
      {/* <h3>Panier</h3> */}

      <div className="split">
        <div className="flex flex-col gap-4 p-4 item-list">
          {cartItems.length > 0 ? (
            cartItems.map((item) => {
              return <CartItem items={item} handleDelete={handleDelete} />;
            })
          ) : (
            <h1>Panier vide</h1>
          )}
        </div>
        <div className="flex flex-col gap-4 cart-sidebar">
          <div className="resume">
            <h5>Résumé</h5>
            <div>
              {cartItems != undefined &&
                cartItems.map((e) => {
                  return (
                    <div className="grid grid-cols-2">
                      <p>1x {e.name}</p>
                      <p className="text-end">{e.price} €</p>
                    </div>
                  );
                })}
            </div>
          </div>
          <hr />
          <div className="grid gap-4 pay">
            <div className="discount-list">
              {selectedDiscountCode != undefined && (
                <div className="flex justify-between">
                  <div className="flex items-center gap-4">
                    <FontAwesomeIcon icon={faX} onClick={deleteDiscount} />
                    <p>{selectedDiscountCode.name}</p>
                  </div>
                  <p>-{selectedDiscountCode.discount} %</p>
                </div>
              )}
            </div>
            <div className="flex justify-between">
              <h5 className="font-bold">Total</h5>
              <p>
                {selectedDiscountCode ? cartFinalPrice.toFixed(2) : cartPrice} €
              </p>
            </div>
            <div>
              <p className={invalidCode ? "text-red-500" : "hidden"}>
                Code promo invalide
              </p>
              <div className="flex gap-4 discount">
                <input
                  placeholder="Code promo"
                  type="text"
                  id="discount-code"
                  onChange={handleChange}
                  value={inputValue}
                  className="w-9/12 px-2 py-1 border rounded-full code"
                />
                <button
                  onClick={handleDiscountCode}
                  className="w-3/12 px-3 py-1 text-white bg-black rounded-full apply-discount w-fit"
                >
                  Appliquer
                </button>
              </div>
            </div>

            <button className="w-full py-1 text-white bg-black rounded-full">
              Valider et payer
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
