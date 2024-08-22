# 🍽️ Cooking Recipes

**Cooking Recipes** é uma aplicação Angular que permite aos usuários explorar uma vasta gama de receitas utilizando a API pública [TheMealDB](https://www.themealdb.com/api.php). A aplicação oferece funcionalidades como pesquisa de receitas, visualização de detalhes de pratos, navegação por categorias e adição de receitas aos favoritos.

## 📋 Índice

- [Funcionalidades](#funcionalidades)
- [Começando](#começando)
  - [Pré-requisitos](#pré-requisitos)
  - [Instalação](#instalação)
- [Estrutura](#estrutura)

## 🛠️ Funcionalidades

- **Pesquisa de Receitas:** Busque por receitas utilizando paises ou algumas sobremesas
- **Detalhes da Refeição:** Exibe informações detalhadas sobre uma refeição específica, incluindo ingredientes, instruções, imagem e video.
- **Exploração de Categorias:** Navegue por categorias de comidas e descubra receitas relacionadas.
- **Favoritos:** Adicione receitas aos favoritos para fácil acesso.

## 🚀 Começando

### Pré-requisitos

- Node.js
- Angular CLI

### Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/rafael2801/CookingRecipe.git cookingRecipes
2. **Instale as dependências:**
   ```bash
   cd cookingRecipes
   npm i
3. **Inicie o projeto:**
   ```bash
   ng serve
## Estrutura
    Essa seção descreve a estrutura do projeto como seus principais diretorios e arquivos.
- **NgRx:**
  - Centraliza as informações do estado da aplicação, como comidas favoritas.
  - Ajuda na organização do código, tornando-o mais limpo e gerenciável.

- **Template:**
  - O template (header e footer) é fixo, apenas o conteúdo principal muda.
  - **Vantagem:** evita a necessidade de renderizar novamente o template em cada mudança de página.

- **Angular:**
  - O projeto poderia ser implementado em HTML, CSS e JS sem Angular.
  - A escolha pelo Angular oferece facilidades como modularidade, reutilização de componentes e gerenciamento do estado com `NgRx`.


## 📁 Estrutura do Projeto

Aqui está a estrutura de diretórios e arquivos de um projeto Angular básico:

```bash
│
├── node_modules/             # Dependências do projeto
├── src/
│   ├── app/
│   │   ├── components/       # Componentes reutilizáveis da aplicação
│   │   ├── constants/        # Constantes usadas em toda a aplicação
│   │   ├── interfaces/       # Definições de interfaces TypeScript
│   │   ├── meal/             # arquivos do ngrx
│   │   ├── pipes/            # Pipes personalizados
│   │   ├── screens/          # Componentes de tela (páginas)
│   │   ├── scss/             # Estilos globais e específicos
│   │   ├── services/         # Serviços para chamadas HTTP e lógica de negócios
│   │   ├── environments/     # Configurações específicas de ambiente
│   │   └── template/         # Template Principal da pagina ( header, footer, ...etc )
│   ├── assets/               # Arquivos estáticos como imagens, fontes, etc.
│   ├── index.html            # Arquivo HTML principal
│   ├── main.ts               # Arquivo de entrada principal do aplicativo
│   ├── polyfills.ts          # Polyfills para navegadores antigos
│   ├── styles.scss           # Arquivo de estilos globais
│