import "./Header.scss";
import logo from "../../assets/logos/ReBit.svg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import backendApi from "../../utils";

function Header() {
  const [gamesList, setGamesList] = useState(null);
  const [searchedGames, setSearchedGames] = useState(null);

  const handleSearch = (event) => {
    setSearchedGames(
      gamesList.filter((game) => {
        return game.game.toLowerCase().includes(event.target.value);
      })
    );
  };

  useEffect(() => {
    backendApi.fetchAllGames(setGamesList);
  }, []);
  return (
    <header className="header">
      <Link to="/" className="header__logo-container">
        <h2 className="header__title">ReBit</h2>
        <img src={logo} className="header__logo" alt="logo" />
      </Link>
      <nav className="header__navbar">
        <ul className="header__nav-list">
          <li className="header__nav-item">
            <Link to="/" className="header__navlink">
              Home
            </Link>
          </li>
          <li className="header__nav-item">
            <Link to="/about" className="header__navlink">
              About
            </Link>
          </li>
          <li className="header__nav-item">
            <input
              name="search"
              className="header__search"
              placeholder="Search"
              onChange={(event) => {
                handleSearch(event);
              }}
            />
          </li>
          <li className="header__nav-item">
            <Link to="/login" className="header__navlink">
              Log in
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
