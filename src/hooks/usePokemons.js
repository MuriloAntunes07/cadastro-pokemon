import { useEffect, useMemo, useState } from "react";
import { createId, loadPokemons, savePokemons } from "../utils/storage.js";

export function usePokemons() {
  const [pokemons, setPokemons] = useState(() => loadPokemons());

  useEffect(() => {
    savePokemons(pokemons);
  }, [pokemons]);

  const orderedPokemons = useMemo(
    () =>
      [...pokemons].sort((a, b) => {
        const numberA = Number(a.numero) || Number.MAX_SAFE_INTEGER;
        const numberB = Number(b.numero) || Number.MAX_SAFE_INTEGER;
        return numberA - numberB || a.nome.localeCompare(b.nome);
      }),
    [pokemons]
  );

  function addPokemon(data) {
    const now = new Date().toISOString();
    const pokemon = { ...data, id: createId(), criadoEm: now, atualizadoEm: now };
    setPokemons((current) => [...current, pokemon]);
    return pokemon;
  }

  function updatePokemon(id, data) {
    setPokemons((current) =>
      current.map((pokemon) =>
        pokemon.id === id ? { ...pokemon, ...data, atualizadoEm: new Date().toISOString() } : pokemon
      )
    );
  }

  function deletePokemon(id) {
    setPokemons((current) => current.filter((pokemon) => pokemon.id !== id));
  }

  function findPokemon(id) {
    return pokemons.find((pokemon) => pokemon.id === id);
  }

  return { pokemons: orderedPokemons, addPokemon, updatePokemon, deletePokemon, findPokemon };
}
