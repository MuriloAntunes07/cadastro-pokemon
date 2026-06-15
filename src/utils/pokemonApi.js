export async function fetchPokemonFromApi(query) {
  const normalized = String(query).trim().toLowerCase();

  if (!normalized) {
    throw new Error("Informe o nome ou numero do Pokemon.");
  }

  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${normalized}`);

  if (!response.ok) {
    throw new Error("Pokemon nao encontrado na PokeAPI.");
  }

  const data = await response.json();

  return {
    numero: data.id,
    nome: data.name,
    tipo: data.types.map((item) => item.type.name).join(", "),
    altura: data.height / 10,
    peso: data.weight / 10,
    habilidades: data.abilities.map((item) => item.ability.name).join(", "),
    imagem: data.sprites.other["official-artwork"].front_default || data.sprites.front_default,
    origem: "PokeAPI"
  };
}
