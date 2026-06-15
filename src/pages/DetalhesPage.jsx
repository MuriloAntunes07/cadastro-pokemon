import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { usePokemons } from "../hooks/usePokemons.js";

export default function DetalhesPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { findPokemon, deletePokemon } = usePokemons();
  const pokemon = findPokemon(id);

  if (!pokemon) {
    return (
      <section className="empty-state">
        <h1>Pokemon nao encontrado</h1>
        <p>Volte para a consulta e selecione outro registro.</p>
        <Link className="button button-primary" to="/pokemons">
          Voltar
        </Link>
      </section>
    );
  }

  function handleDelete() {
    if (window.confirm("Deseja excluir este Pokemon?")) {
      deletePokemon(id);
      navigate("/pokemons");
    }
  }

  return (
    <section className="details-layout">
      <Link className="back-link" to="/pokemons">
        Voltar para consulta
      </Link>

      <article className="details-panel">
        <div className="details-art">
          <img src={pokemon.imagem || "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"} alt={pokemon.nome} />
        </div>

        <div className="details-content">
          <span className="dex-number">{pokemon.numero ? `#${String(pokemon.numero).padStart(3, "0")}` : "Sem numero"}</span>
          <h1>{pokemon.nome}</h1>
          <p className="type-line">{pokemon.tipo}</p>

          <dl className="detail-list">
            <div>
              <dt>Treinador</dt>
              <dd>{pokemon.treinador || "Nao informado"}</dd>
            </div>
            <div>
              <dt>Regiao</dt>
              <dd>{pokemon.regiao || "Nao informada"}</dd>
            </div>
            <div>
              <dt>Altura</dt>
              <dd>{pokemon.altura ? `${pokemon.altura} m` : "Nao informada"}</dd>
            </div>
            <div>
              <dt>Peso</dt>
              <dd>{pokemon.peso ? `${pokemon.peso} kg` : "Nao informado"}</dd>
            </div>
            <div>
              <dt>Habilidades</dt>
              <dd>{pokemon.habilidades || "Nao informadas"}</dd>
            </div>
            <div>
              <dt>Origem dos dados</dt>
              <dd>{pokemon.origem || "Cadastro manual"}</dd>
            </div>
          </dl>

          {pokemon.observacoes && (
            <div className="notes">
              <strong>Observacoes</strong>
              <p>{pokemon.observacoes}</p>
            </div>
          )}

          <div className="form-actions">
            <Link className="button button-secondary" to={`/editar/${pokemon.id}`}>
              Editar
            </Link>
            <button className="button button-danger" type="button" onClick={handleDelete}>
              Excluir
            </button>
          </div>
        </div>
      </article>
    </section>
  );
}
