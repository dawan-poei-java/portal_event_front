import { React, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX,faUser, faCartShopping} from "@fortawesome/free-solid-svg-icons";
import "../styles/header.scss";
import { useAuth } from "../context/authProvider";


export default function header() {
  const { isAuthenticated } = useAuth();
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
                  <Link className="nav-link" to={"/cities"}>
                    Évènements
                  </Link>
                </li>
                <li onClick={handleToggleOpen}>
                  <Link className="nav-link" to={"/contact"}>
                    Contact
                  </Link>
                </li>
                {!isAuthenticated ? (
                  <li onClick={handleToggleOpen}>
                    <Link className="nav-link" to={"/login"}>
                      Login
                    </Link>
                  </li>
                ) : (
                  <li onClick={handleToggleOpen}>
                    <Link className="nav-link" to={"/profileclient"}>
                      Profile
                    </Link>
                  </li>
                )}
                <li onClick={handleToggleOpen}>
                <Link className="nav-link" to={"/profileClient"}>
                  <FontAwesomeIcon icon={faUser}/>
                </Link>
              </li>
                <li onClick={handleToggleOpen}>
                <Link className="nav-link" to={"/cart"}>
                  <FontAwesomeIcon icon={faCartShopping}/>
                </Link>
              </li>
            </ul>
            </nav>
            {isToggleOpen ? (
              <div className="menu-toggle" onClick={handleToggleOpen}>
                <FontAwesomeIcon className="fa-2x" icon={faX} />
              </div>
            ) : (
              <div className="menu-toggle" onClick={handleToggleOpen}>
                <FontAwesomeIcon className="fa-2x" icon={faBars} />
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
