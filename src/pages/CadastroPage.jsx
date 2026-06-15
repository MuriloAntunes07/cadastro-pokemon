import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import PokemonForm from "../components/PokemonForm.jsx";
import { usePokemons } from "../hooks/usePokemons.js";

export default function CadastroPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addPokemon, updatePokemon, findPokemon } = usePokemons();
  const pokemon = id ? findPokemon(id) : null;

  function handleSubmit(data) {
    if (id) {
      updatePokemon(id, data);
      navigate(`/pokemons/${id}`);
      return;
    }

    const created = addPokemon(data);
    navigate(`/pokemons/${created.id}`);
  }

  if (id && !pokemon) {
    return (
      <section className="empty-state">
        <h1>Pokemon nao encontrado</h1>
        <p>O registro pode ter sido removido do armazenamento local.</p>
      </section>
    );
  }

  return (
    <section className="content-layout">
      <div className="page-title">
        <span className="eyebrow">{id ? "Editar registro" : "Novo registro"}</span>
        <h1>{id ? `Editar ${pokemon.nome}` : "Cadastro de Pokemon"}</h1>
        <p>Preencha os campos obrigatorios e use a busca externa para acelerar o cadastro.</p>
      </div>

      <PokemonForm initialData={pokemon} onSubmit={handleSubmit} submitLabel={id ? "Salvar alteracoes" : "Cadastrar"} />
    </section>
  );
}
