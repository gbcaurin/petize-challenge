# 🔍 Petize Challenge — GitHub Profile Search

Aplicação React desenvolvida como desafio técnico para a vaga de Estágio Desenvolvedor(a) React na [Petize](https://petize.com.br/).

## 🚀 Deploy

[petize-challenge-xi.vercel.app](https://petize-challenge-xi.vercel.app/)

## 📋 Sobre o Desafio

Construir uma aplicação React que busque perfis de desenvolvedores na API pública do GitHub e exiba seus repositórios com scroll infinito.

## ✨ Funcionalidades

- 🔎 Busca de usuários pelo username do GitHub
- 💡 Autocomplete de usuários em tempo real com debounce
- 👤 Página de perfil com avatar, bio, seguidores e repositórios
- ♾️ Scroll infinito nos repositórios (10 por página)
- 🔃 Ordenação de repositórios por: último criado, último atualizado, último push e ordem alfabética
- 🔗 Links diretos para os repositórios no GitHub
- 🌐 Botão de site pessoal (exibido apenas se o usuário tiver)
- 🐦 Botão do Twitter/X (exibido apenas se o usuário tiver)
- 🕐 Tempo relativo de atualização dos repositórios
- 🌍 Internacionalização em Português e Inglês (i18n)
- 📱 Layout responsivo para desktop e mobile

## 🛠️ Tecnologias

| Tecnologia | Uso |
|---|---|
| React + Vite | Framework e build tool |
| Chakra UI v2 | Biblioteca de componentes |
| React Router DOM | Roteamento entre páginas |
| i18Next + react-i18next | Internacionalização |
| Zod | Validação e modelagem de dados |

## 📁 Estrutura do Projeto
```
src/
├── components/       # Componentes reutilizáveis
├── pages/            # Páginas da aplicação
│   ├── Home.jsx      # Página de busca
│   └── Profile.jsx   # Página de perfil
├── services/         # Funções de chamada à API do GitHub
│   └── github.js
├── schemas/          # Schemas de validação com Zod
│   ├── user.js
│   └── repository.js
├── utils/            # Funções utilitárias
│   └── dateUtils.js  # Formatação de datas relativas
└── locales/          # Arquivos de tradução
    ├── en/
    │   └── translation.json
    └── pt/
        └── translation.json
```

## 🔗 Rotas

| Rota | Descrição |
|---|---|
| `/` | Página de busca |
| `/profile/:username` | Perfil do usuário pesquisado |

A rota `/profile/:username` pode ser compartilhada diretamente como link.

## ⚙️ Como Rodar Localmente

**Pré-requisitos:** Node.js instalado

**1. Clone o repositório**
```bash
git clone https://github.com/gbcaurin/petize-challenge.git
cd petize-challenge
```

**2. Instale as dependências**
```bash
npm install
```

**3. Configure as variáveis de ambiente**

Crie um arquivo `.env` na raiz do projeto:
```
VITE_GITHUB_TOKEN=seu_token_aqui
```

> Você pode gerar um token em [github.com/settings/tokens](https://github.com/settings/tokens). Sem o token, a API do GitHub limita as requisições a 60 por hora.

**4. Rode o projeto**
```bash
npm run dev
```

## 🏗️ Decisões Técnicas

**Tema GitHub** — O visual foi inspirado no próprio GitHub, já que a aplicação consome a API deles. Uma decisão criativa que faz sentido do ponto de vista de produto.

**IntersectionObserver** — Utilizado para implementar o scroll infinito de forma nativa, sem bibliotecas externas.

**useRef para loading** — O controle de loading dos repositórios foi feito com `useRef` em vez de `useState` para evitar re-renders desnecessários e loops no `useEffect`.

**Debounce no autocomplete** — A busca de sugestões usa debounce de 300ms para não sobrecarregar a API a cada tecla digitada.

**Zod com safeParse** — Utilizado `safeParse` em vez de `parse` para evitar que erros de validação quebrem a aplicação, tratando os erros de forma controlada.

## 👨‍💻 Desenvolvido por

Gabriel Caurin de Souza — [github.com/gbcaurin](https://github.com/gbcaurin)
