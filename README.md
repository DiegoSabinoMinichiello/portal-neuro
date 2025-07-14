# Portal web Neuro Connect

![logo](./frontend/public/images/logo-branca.png)

## Realizando o sonho da vida profissional dos neurodivergentes!

## Tecnologias e Ferramentas Utilizadas

<div align="center">

<img src="https://raw.githubusercontent.com/devicons/devicon/ca28c779441053191ff11710fe24a9e6c23690d6/icons/git/git-original.svg" height="50">
<img src="https://raw.githubusercontent.com/devicons/devicon/ca28c779441053191ff11710fe24a9e6c23690d6/icons/github/github-original.svg" height="50">
<img src="https://cdn.brandfetch.io/id2alue-rx/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1714556222178" height="55">
<img src="https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png" height="55">
<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaudX-IxZ8D2jGhWqPBQry-nbwmTm2onHgHQ&s" height="55">
<img src="https://tailwindcss.com/_next/static/media/tailwindcss-mark.d52e9897.svg" height="30">
<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_B9514BxgQrviAQi6_f9jlKTgLuwzeQL1ng&s" height="55">
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Sqlite-square-icon.svg/1024px-Sqlite-square-icon.svg.png" height="55">

</div>

- **Git e Github**: Para controle de versionamento.
- **Next.js** - Framework react para aplicações web fullstack.
- **React** - Biblioteca para construção de interfaces, é utilizado de forma indireta por conta do next.js.
- **Axios** - Cliente HTTP para comunicação com a API.
- **TailWind CSS** - Framework utilitário de CSS para estilização rápida e responsiva.
- **Prisma ORM** - Mapeamento objeto-relacional para interação com o banco de dados.
- **SQLite** - Banco de dados leve, utilizado no desenvolvimento.


## Executar

O projeto foi realizado utilizando **Next.js**, abaixo estão os requisitos necessários para executar o projeto do zero.

- Requisitos:
   - Node.js instalado
   - npm (que já vem com o Node.js)

- No terminal/console/shell:

```bash
    git clone https://github.com/DiegoSabinoMinichiello/portal-neuro
    cd frontend     
    npm install
    npx prisma db push
    npm run seed
    npm run dev
```
Após executar, em um navegador, acesse: [http://localhost:3000](http:localhost:3000) 

---

## Telas atualmente implementadas

- [Home](./frontend/pages/index.js): Página inicial do site, responsável pelo primeiro contato do usuário com o site.
- [Login](./frontend/pages/login-usuario.js): Página de login, que redireciona para o devido dashboard.
- [Cadastro](./frontend/pages/cadastro.js): Página de cadastro, que cria um novo usuário consultor ou empresa.
- [Dashboard Admin](./frontend/pages/dashboard-admin.js): Dashboard do admin, Tem acesso a todos os usuários cadastrados, pode criar novos usuários, excluir usuários, e filtrar os usuários por tipo.
- [Dashboard Consultor](./frontend/pages/dashboard-consultor.js): Dashboard do consultor.
- [Dashboard Empresa](./frontend/pages/dashboard-empresa.js): Dashboard da empresa.

---



<div align="center">

**Instagram**: @selo.neuroconnect2

**Email**: selo.neuroconnect@gmail.com

Rodovia SC 484 - Km 02, Fronteira Sul Chapecó, SC - Brasil CEP 89815-899

**© 2025 Neuro Connect. Todos os direitos reservados.**
</div>