import React from "react";
import { useEffect, useState } from "react";
import { fetchPokemonFromApi } from "../utils/pokemonApi.js";

const initialValues = {
  numero: "",
  nome: "",
  tipo: "",
  altura: "",
  peso: "",
  habilidades: "",
  treinador: "",
  regiao: "",
  imagem: "",
  observacoes: ""
};

export default function PokemonForm({ initialData, onSubmit, submitLabel = "Cadastrar" }) {
  const [values, setValues] = useState(initialValues);
  const [apiQuery, setApiQuery] = useState("");
  const [errors, setErrors] = useState({});
  const [apiMessage, setApiMessage] = useState("");
  const [loadingApi, setLoadingApi] = useState(false);

  useEffect(() => {
    setValues(initialData ? { ...initialValues, ...initialData } : initialValues);
  }, [initialData]);

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  }

  function validate() {
    const nextErrors = {};

    if (!String(values.nome).trim()) nextErrors.nome = "Nome e obrigatorio.";
    if (!String(values.tipo).trim()) nextErrors.tipo = "Informe pelo menos um tipo.";
    if (!String(values.treinador).trim()) nextErrors.treinador = "Informe o treinador responsavel.";
    if (values.numero && Number(values.numero) <= 0) nextErrors.numero = "O numero deve ser positivo.";
    if (values.altura && Number(values.altura) <= 0) nextErrors.altura = "A altura deve ser positiva.";
    if (values.peso && Number(values.peso) <= 0) nextErrors.peso = "O peso deve ser positivo.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleApiSearch() {
    setApiMessage("");
    setLoadingApi(true);

    try {
      const pokemon = await fetchPokemonFromApi(apiQuery);
      setValues((current) => ({ ...current, ...pokemon }));
      setApiMessage("Dados carregados com sucesso. Complete os campos do cadastro.");
    } catch (error) {
      setApiMessage(error.message);
    } finally {
      setLoadingApi(false);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!validate()) return;

    onSubmit({
      ...values,
      numero: values.numero ? Number(values.numero) : "",
      altura: values.altura ? Number(values.altura) : "",
      peso: values.peso ? Number(values.peso) : ""
    });
  }

  function resetForm() {
    setValues(initialValues);
    setApiQuery("");
    setErrors({});
    setApiMessage("");
  }

  return (
    <form className="form-grid" onSubmit={handleSubmit} noValidate>
      <section className="form-section form-section-wide">
        <div className="section-heading">
          <h2>Buscar na PokeAPI</h2>
          <p>Use o nome ou numero para preencher os dados principais automaticamente.</p>
        </div>

        <div className="api-search">
          <label>
            Nome ou numero
            <input
              value={apiQuery}
              onChange={(event) => setApiQuery(event.target.value)}
              placeholder="Ex.: pikachu ou 25"
              type="text"
            />
          </label>
          <button className="button button-secondary" type="button" onClick={handleApiSearch} disabled={loadingApi}>
            {loadingApi ? "Buscando..." : "Importar"}
          </button>
        </div>
        {apiMessage && <p className="form-message">{apiMessage}</p>}
      </section>

      <section className="form-section">
        <div className="section-heading">
          <h2>Informacoes do Pokemon</h2>
        </div>

        <label>
          Numero da Pokedex
          <input name="numero" value={values.numero} onChange={handleChange} min="1" type="number" />
          {errors.numero && <span className="field-error">{errors.numero}</span>}
        </label>

        <label>
          Nome
          <input name="nome" value={values.nome} onChange={handleChange} placeholder="Ex.: Bulbasaur" type="text" />
          {errors.nome && <span className="field-error">{errors.nome}</span>}
        </label>

        <label>
          Tipo
          <input name="tipo" value={values.tipo} onChange={handleChange} placeholder="Grama, veneno" type="text" />
          {errors.tipo && <span className="field-error">{errors.tipo}</span>}
        </label>

        <div className="inline-fields">
          <label>
            Altura (m)
            <input name="altura" value={values.altura} onChange={handleChange} min="0" step="0.1" type="number" />
            {errors.altura && <span className="field-error">{errors.altura}</span>}
          </label>

          <label>
            Peso (kg)
            <input name="peso" value={values.peso} onChange={handleChange} min="0" step="0.1" type="number" />
            {errors.peso && <span className="field-error">{errors.peso}</span>}
          </label>
        </div>

        <label>
          Habilidades
          <input
            name="habilidades"
            value={values.habilidades}
            onChange={handleChange}
            placeholder="overgrow, chlorophyll"
            type="text"
          />
        </label>
      </section>

      <section className="form-section">
        <div className="section-heading">
          <h2>Dados do Cadastro</h2>
        </div>

        <label>
          Treinador responsavel
          <input name="treinador" value={values.treinador} onChange={handleChange} placeholder="Nome do treinador" />
          {errors.treinador && <span className="field-error">{errors.treinador}</span>}
        </label>

        <label>
          Regiao
          <select name="regiao" value={values.regiao} onChange={handleChange}>
            <option value="">Selecione</option>
            <option>Kanto</option>
            <option>Johto</option>
            <option>Hoenn</option>
            <option>Sinnoh</option>
            <option>Unova</option>
            <option>Kalos</option>
            <option>Alola</option>
            <option>Galar</option>
            <option>Paldea</option>
          </select>
        </label>

        <label>
          URL da imagem
          <input name="imagem" value={values.imagem} onChange={handleChange} placeholder="https://..." type="url" />
        </label>

        <label>
          Observacoes
          <textarea
            name="observacoes"
            value={values.observacoes}
            onChange={handleChange}
            placeholder="Anote curiosidades, nivel, status ou comentarios."
            rows="5"
          />
        </label>

        <div className="form-actions">
          <button className="button button-primary" type="submit">
            {submitLabel}
          </button>
          <button className="button button-ghost" type="button" onClick={resetForm}>
            Limpar
          </button>
        </div>
      </section>
    </form>
  );
}
