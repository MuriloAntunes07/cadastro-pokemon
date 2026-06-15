import React from "react";
import { Link } from "react-router-dom";

export default function PokemonCard({ pokemon, onDelete }) {
  const image = pokemon.imagem || "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png";

  return (
    <article className="pokemon-card">
      <div className="pokemon-art">
        <img src={image} alt={`Imagem de ${pokemon.nome}`} loading="lazy" />
      </div>

      <div className="pokemon-card-body">
        <span className="dex-number">{pokemon.numero ? `#${String(pokemon.numero).padStart(3, "0")}` : "Sem numero"}</span>
        <h3>{pokemon.nome}</h3>
        <p>{pokemon.tipo}</p>
        <div className="tag-row">
          {pokemon.regiao && <span>{pokemon.regiao}</span>}
          {pokemon.treinador && <span>{pokemon.treinador}</span>}
        </div>
      </div>

      <div className="card-actions">
        <Link className="text-link" to={`/pokemons/${pokemon.id}`}>
          Ver
        </Link>
        <Link className="text-link" to={`/editar/${pokemon.id}`}>
          Editar
        </Link>
        <button className="text-link danger" type="button" onClick={() => onDelete(pokemon.id)}>
          Excluir
        </button>
      </div>
    </article>
  );
}
