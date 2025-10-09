import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { Product } from "../models/Produkt";
import { PRODUCTS_URL } from "../utils/constants";

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchBarRef = useRef(null);

  const searchResults = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setShowSuggestions(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowSuggestions(false);
    }, 200);
  };

  const handleFocus = () => {
    if (searchTerm.length > 0) {
      setShowSuggestions(true);
    }
  };

  useEffect(() => {
    fetch(PRODUCTS_URL)
      .then((response) => {
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        setProducts(data);
      });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      const searchBar = document.getElementById("search-bar");
      if (searchBar && !searchBar.contains(event.target)) {
        setShowSearchBar(false);
      }
    };

    if (showSearchBar) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showSearchBar]);

  return (
    <div ref={searchBarRef}>
      <div
        className="d-none d-md-block position-relative"
        style={{ paddingLeft: "400px" }}
      >
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          onBlur={handleBlur}
          onFocus={handleFocus}
          placeholder="Produkt suchen..."
          className="form-control"
          style={{ paddingLeft: "30px", right: "-1px" }}
        />
        <FontAwesomeIcon
          icon={faSearch}
          style={{
            position: "absolute",
            left: "410px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "gray",
          }}
        />
      </div>
      <div className="d-block d-md-none position-absolute d-flex justify-content-center align-items-center">
        {!showSearchBar && (
          <div
            className="position-absolute"
            style={{
              left: "150px",
              top: "50%",
              transform: "translateY(-50%)",

              padding: "10px",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
            }}
            onClick={() => setShowSearchBar(true)}
          >
            <FontAwesomeIcon icon={faSearch} style={{ color: "white" }} />
          </div>
        )}
        {showSearchBar && (
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            onBlur={handleBlur}
            onFocus={handleFocus}
            placeholder="Produkt suchen..."
            className="form-control"
            style={{ paddingLeft: "30px" }}
            autoFocus
          />
        )}
      </div>
      {showSuggestions && searchTerm && (
        <ul
          className="list-group"
          style={{
            position: "absolute",
            width: "100%",
            zIndex: 1,
          }}
        >
          {searchResults.length > 0 ? (
            searchResults.slice(0, 6).map((product) => (
              <li key={product.id} className="list-group-item">
                {product.name}
              </li>
            ))
          ) : (
            <li className="list-group-item text-center">
              Kein Produkt mit diesem Namen gefunden
            </li>
          )}
          {searchResults.length > 6 && (
            <li className="list-group-item text-center">
              ... et {searchResults.length - 6} de plus
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
