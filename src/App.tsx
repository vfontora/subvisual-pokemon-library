import { useState } from "react";
import "./App.css";

export function App() {
  const [searchInput, setSearchInput] = useState("");
  const [name, setName] = useState("");
  const [id, setId] = useState(0);
  const [sprite, setSprite] = useState("");
  const [errors, setErrors] = useState("");

  async function loadName(event) {
    event.preventDefault();

    await fetch(
      `https://pokeapi.co/api/v2/pokemon/${searchInput.toLowerCase()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Pokémon não encontrado");
        }
        return response.json();
      })
      .then((data) => {
        setName(data.name);
        setId(data.id);
        setSprite(data.sprites.front_default);
        setErrors("");
      })
      .catch((error) => {
        setErrors(error.message);
        setName("");
        setId(0);
        setSprite("");
      });
  }

  async function loadId(pokemonId) {
    await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Pokémon não encontrado");
        }
        return response.json();
      })
      .then((data) => {
        setName(data.name);
        setId(data.id);
        setSprite(data.sprites.front_default);
        setErrors("");
      })
      .catch((error) => {
        setErrors(error.message);
        setName("");
        setId(0);
        setSprite("");
      });
  }

  function onSearchInputChange(event) {
    setSearchInput(event.target.value);
  }

  function goToPreviousPage() {
    if (id > 1) {
      loadId(id - 1);
    }
  }

  function goToNextPage() {
    loadId(id + 1);
  }

  return (
    <div className="structure">
      <h1 className="title">Pokémon Library</h1>

      <form onSubmit={loadName}>
        <input
          type="text"
          value={searchInput}
          onChange={onSearchInputChange}
          placeholder="Insere o nome de um Pokémon"
        ></input>
        <button type="submit" className="buttonSbmt">
          Search Pokémon
        </button>
      </form>

      <div className="mainContent">
        {errors && <span>{errors}</span>}

        {name && (
          <p>
            Your Pokémon: {name.charAt(0).toUpperCase() + name.slice(1)}, nº{id}
          </p>
        )}
        {sprite && <img src={sprite} alt={name} className="pokemonImg" />}

        {id > 0 && (
          <div className="buttons">
            <button
              disabled={id === 1}
              onClick={goToPreviousPage}
              className="prev"
            >
              Previous
            </button>
            <button onClick={goToNextPage} className="nxt">
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
