import React from "react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PokemonCard from "../components/PokemonCard.jsx";
import { usePokemons } from "../hooks/usePokemons.js";

export default function ListaPage() {
  const { pokemons, deletePokemon } = usePokemons();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const types = useMemo(() => {
    const allTypes = pokemons.flatMap((pokemon) =>
      String(pokemon.tipo)
        .split(",")
        .map((type) => type.trim())
        .filter(Boolean)
    );
    return [...new Set(allTypes)].sort();
  }, [pokemons]);

  const filteredPokemons = useMemo(() => {
    const term = search.trim().toLowerCase();

    return pokemons.filter((pokemon) => {
      const matchesText =
        !term ||
        [pokemon.nome, pokemon.numero, pokemon.treinador, pokemon.regiao]
          .join(" ")
          .toLowerCase()
          .includes(term);

      const matchesType = !typeFilter || String(pokemon.tipo).toLowerCase().includes(typeFilter.toLowerCase());

      return matchesText && matchesType;
    });
  }, [pokemons, search, typeFilter]);

  function handleDelete(id) {
    const confirmed = window.confirm("Deseja excluir este Pokemon?");
    if (confirmed) deletePokemon(id);
  }

  return (
    <section className="content-layout">
      <div className="page-title row-title">
        <div>
          <span className="eyebrow">Consulta</span>
          <h1>Pokemon cadastrados</h1>
          <p>Pesquise, filtre, visualize detalhes, edite ou remova registros salvos.</p>
        </div>
        <Link className="button button-primary" to="/cadastro">
          Novo
        </Link>
      </div>

      <div className="filters">
        <label className="search-field">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar por nome, numero, treinador ou regiao"
          />
        </label>
        <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)} aria-label="Filtrar por tipo">
          <option value="">Todos os tipos</option>
          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {filteredPokemons.length ? (
        <div className="pokemon-grid">
          {filteredPokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} onDelete={handleDelete} />
          ))}
        </div>
      ) : (
        <section className="empty-state">
          <h2>Nenhum Pokemon encontrado</h2>
          <p>Cadastre um novo Pokemon ou ajuste os filtros de consulta.</p>
        </section>
      )}
    </section>
  );
}
