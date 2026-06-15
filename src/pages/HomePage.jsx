import React from "react";
import { Link } from "react-router-dom";
import { usePokemons } from "../hooks/usePokemons.js";

export default function HomePage() {
  const { pokemons } = usePokemons();
  const uniqueTypes = new Set(pokemons.flatMap((pokemon) => String(pokemon.tipo).split(",").map((type) => type.trim()).filter(Boolean)));

  return (
    <section className="home-layout">
      <div className="hero-panel">
        <div>
          <h1>Sistema de cadastro e consulta de Pokemon</h1>
          <p>
            Projeto simples feito em React para cadastrar, consultar, editar e excluir Pokemon.
          </p>
        </div>
        <Link className="button button-primary" to="/cadastro">
          Novo cadastro
        </Link>
      </div>

      <div className="stats-grid">
        <article>
          <strong>{pokemons.length}</strong>
          <span>Pokemon cadastrados</span>
        </article>
        <article>
          <strong>{uniqueTypes.size}</strong>
          <span>Tipos registrados</span>
        </article>
        <article>
          <strong>API</strong>
          <span>Consulta externa por Fetch</span>
        </article>
      </div>
    </section>
  );
}
