import React from "react";

export default function SobrePage() {
  return (
    <section className="report-page">
      <div className="page-title">
        <span className="eyebrow">Relatorio resumido</span>
        <h1>Documentacao do projeto</h1>
        <p>Resumo das escolhas tecnicas e funcionalidades implementadas.</p>
      </div>

      <div className="report-grid">
        <article>
          <h2>Proposta</h2>
          <p>
            Sistema web para cadastro e consulta de Pokemon, com campos de identificacao, tipo, treinador, regiao,
            atributos fisicos, habilidades, imagem e observacoes.
          </p>
        </article>
        <article>
          <h2>Tecnologias</h2>
          <p>React, React Router, JavaScript, HTML5 semantico, CSS responsivo, LocalStorage e Fetch API.</p>
        </article>
        <article>
          <h2>Componentizacao</h2>
          <p>
            A aplicacao usa componentes para formulario, cards, navegacao e paginas, mantendo estado com hooks e
            propriedades entre componentes.
          </p>
        </article>
        <article>
          <h2>Melhorias futuras</h2>
          <p>
            Autenticacao de usuarios, banco de dados em servidor, exportacao de relatorios e testes automatizados.
          </p>
        </article>
      </div>
    </section>
  );
}
