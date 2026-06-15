import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import CadastroPage from "./pages/CadastroPage.jsx";
import ListaPage from "./pages/ListaPage.jsx";
import DetalhesPage from "./pages/DetalhesPage.jsx";
import SobrePage from "./pages/SobrePage.jsx";

const links = [
  { to: "/", label: "Inicio" },
  { to: "/cadastro", label: "Cadastro" },
  { to: "/pokemons", label: "Consulta" },
  { to: "/sobre", label: "Relatorio" }
];

export default function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <NavLink to="/" className="brand">
          PokeCadastro
        </NavLink>

        <nav className="main-nav" aria-label="Navegacao principal">
          {links.map(({ to, label }) => (
            <NavLink key={to} to={to} className="nav-link">
              {label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="page-frame">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cadastro" element={<CadastroPage />} />
          <Route path="/editar/:id" element={<CadastroPage />} />
          <Route path="/pokemons" element={<ListaPage />} />
          <Route path="/pokemons/:id" element={<DetalhesPage />} />
          <Route path="/sobre" element={<SobrePage />} />
          <Route
            path="*"
            element={
              <section className="empty-state">
                <h1>Pagina nao encontrada</h1>
                <p>Use o menu para voltar ao sistema.</p>
              </section>
            }
          />
        </Routes>
      </main>
    </div>
  );
}
