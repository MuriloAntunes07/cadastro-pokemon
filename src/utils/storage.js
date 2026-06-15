const STORAGE_KEY = "pokeCadastro:pokemons";

export function loadPokemons() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function savePokemons(pokemons) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(pokemons));
}

export function createId() {
  return crypto.randomUUID ? crypto.randomUUID() : String(Date.now());
}
