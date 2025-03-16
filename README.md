
# Cuisinefy - Recipe Finder Application

A beautiful recipe search application built with React, TypeScript, and Tailwind CSS.

## Live Demo

Visit the live site: [Cuisinefy](https://h41s3.github.io/Cuisinefy/)

## Features

- Search recipes by ingredients, cuisine, or dietary needs
- Filter by diet, health requirements, meal type, and more
- View detailed nutritional information
- Save favorite recipes
- Responsive design for all devices

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Installation

1. Clone this repository
   ```bash
   git clone https://github.com/H41s3/Cuisinefy.git
   cd Cuisinefy
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

### Deployment

The project is set up to deploy automatically to GitHub Pages using GitHub Actions. Simply push to the main branch, and your changes will be deployed.

#### Manual Deployment

You can also deploy manually:

```bash
npm run build
```

Then push the `dist` folder to your GitHub Pages branch.

## API Usage

This project uses the Edamam Recipe API with public demo credentials that have rate limitations. For production use:

1. Register for your own API credentials at [Edamam Developer Portal](https://developer.edamam.com/edamam-recipe-api)
2. Modify the `getApiCredentials` function in `src/services/recipeService.ts` to use your credentials.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
