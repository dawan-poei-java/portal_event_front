import {React, useState } from 'react'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";

export default function header() {


  const [isToggleOpen, setIsToggleOpen] = useState(false);
    const handleToggleOpen = () => {
        setIsToggleOpen(!isToggleOpen);
      };
  
  return (
    <>
    <header id="headerHome" className="h-36">
      <div id="contain">
        <div id="flexable">
          <div id="nav-pic">
            <Link to={"/#"}>
              <img src="/logo.png" alt="logo" id="logo" />
            </Link>
          </div>

          <nav className={`nav ${isToggleOpen ? "nav-open" : ""}`}>
            <ul className="nav-link-container">
              <li onClick={handleToggleOpen}>
                <Link className="nav-link" to={"/"}>
                  Accueil
                </Link>
              </li>
              <li onClick={handleToggleOpen}>
                <Link className="nav-link" to={"/event"}>
                  Évènements
                </Link>
              </li>
              <li onClick={handleToggleOpen}>
                <Link className="nav-link" to={"/contact"}>
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
          {isToggleOpen ?(

          <div className="menu-toggle" onClick={handleToggleOpen}>
            <FontAwesomeIcon className="fa-2x" icon={faX} />
          </div>
          ):(
            <div className="menu-toggle" onClick={handleToggleOpen}>
            <FontAwesomeIcon className="fa-2x" icon={faBars} />
          </div>)
          }

        </div>
      </div>
    </header>
    </>
  )
}
