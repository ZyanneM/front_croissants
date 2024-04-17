module.exports = {
    extends: ["eslint:recommended"], // Utilisation des règles recommandées par ESLint
    parserOptions: {
        ecmaVersion: 2020 // Spécifie la version d'ECMAScript à utiliser
    },
    overrides: [
        {
            files: ['**/*.scss'], // Spécifie les fichiers SCSS
            plugins: ['scss'], // Active le plugin SCSS
            rules: {
                // Ajoutez des règles spécifiques pour les fichiers SCSS si nécessaire
            }
        }
    ],
};