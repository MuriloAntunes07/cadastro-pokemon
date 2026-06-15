# Sistema de Cadastro de Pokemon

Projeto desenvolvido para a atividade avaliativa final: um sistema web em React para cadastrar, consultar, editar e excluir informacoes de Pokemon.

## Funcionalidades

- Cadastro de Pokemon com validacao de campos obrigatorios.
- Consulta externa pela PokeAPI usando `fetch`.
- Listagem com busca textual e filtro por tipo.
- Pagina de detalhes, edicao e exclusao de registros.
- Persistencia dos dados no `localStorage`.
- Navegacao entre paginas com React Router.
- Layout responsivo com HTML semantico e CSS.

## Tecnologias utilizadas

- React
- React Router
- Vite
- JavaScript
- HTML5
- CSS3
- LocalStorage
- Fetch API

## Como executar

Instale as dependencias:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash 
npm run dev
```

Acesse a URL exibida no terminal, geralmente `http://localhost:5173`.

Para abrir em outra porta: 

npm.cmd run dev -- --port "3000"
## Estrutura

```text
src/
  components/      Componentes reutilizaveis
  hooks/           Hook de gerenciamento dos Pokemon
  pages/           Paginas da aplicacao e rotas
  utils/           Funcoes de armazenamento e API
```

## Observacoes

Os dados cadastrados ficam salvos no navegador do usuario. Para usar em varios computadores ou navegadores, uma melhoria futura seria conectar o sistema a uma API propria com banco de dados.

## integrantes:
João Vitor de Souza Nascimento RA 25164789-2
Gabriel Ceolin Assein Arus RA 25004575-2
Vitor Bahena Correa RA 25229921-2
Ryan Andreski RA 25181918-2
Murilo Antunes da Luz RA 25014370-2
