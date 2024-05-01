//*** BROKEN ESLINT  */

// // Linting and Code Analysis: Linters like ESLint use this information to understand which variables are global in a
// // given environment and should not be flagged as undefined. This helps in configuring the linter to avoid false
// // warnings about undefined variables that are actually globals provided by the environment.
// import globals from "globals";
// // react uses different styling so eslint needs to account for that
// import js from "@eslint/js";
// import reactRecommended from "eslint-plugin-react/configs/recommended.js";
// const { nodeBuiltin: node, browser } = globals;
// import react from "eslint-plugin-react";
// // import React  from 'react';
// // import jest from 'eslint-plugin-jest';

// // so eslint doesn't effect our tests files put ontop of test files or files to be ignored by eslint
// /* eslint-disable */

// export default {
//   js.configs.recommended, // j: preset of recommended ESLint rules
//   {
//     rules: {
//       "require-atomic-updates": "error",
//       "arrow-body-style": ["error", "as-needed"], // enforces no braces where they can be omitted (for arrow functions)
//       eqeqeq: "error",
//       "no-console": "warn",
//       "prefer-const": "error",
    
//     },
//   },
//   // {
//   // extends: [
//   //   "eslint:recommended",
//   //   "plugin:react/recommended"
//   // ]},

//   // {
//   //   files: ["tests/**/*"],
//   //   plugins: {jest, },
//   //   env: {
//   //     "jest/globals": true
//   //   },
//   // },
//   {
//     files: ["server/**/*.js"],
//     languageOptions: {
//       globals: {
//         ...node,
//       },
//     },
//   },
//   {
//     files: ["client/components/**/*.{js,jsx}"],
//     ...reactRecommended,
//     plugins: {
//       react,
//     },
//     languageOptions: {
//       // configures eslint to handle jsx syntax which is used in react
//       ...reactRecommended.languageOptions,
//       parserOptions: {
//         // configures eslint to handle jsx syntax which is used in react
//         ecmaVersion: 2021,
//         sourceType: "module",
//         ecmaFeatures: {
//           jsx: true,
//         },
//       },
//       globals: {
//         ...browser,
//       },
//     },
//     settings: {
//       react: {
//         version: "detect",
//       },
//     },
//   },
//   {
//     files: ["client/**/*..{js,jsx}"],
//     rules: {
//       "react/react-in-jsx-scope": "off",
//       "react/jsx-uses-react": "off",
//     },
//   },
//   {
//     ignores: ["node_modules", "client/dist/"],
//   },
// };


// // export default [
// //   {languageOptions: { globals: globals.browser }},
// //   pluginJs.configs.recommended,
// //   pluginReactConfig,
// // ];



//WORKING ESLINT//
// Linting and Code Analysis: Linters like ESLint use this information to understand which variables are global in a 
// given environment and should not be flagged as undefined. This helps in configuring the linter to avoid false 
// warnings about undefined variables that are actually globals provided by the environment.
import globals from "globals";
// react uses different styling so eslint needs to account for that
import js from '@eslint/js';
import reactRecommended from 'eslint-plugin-react/configs/recommended.js';
const { nodeBuiltin: node, browser } = globals;
import react from 'eslint-plugin-react';
// import jest from 'eslint-plugin-jest';

// so eslint doesn't effect our tests files put ontop of test files or files to be ignored by eslint
/* eslint-disable */

export default [
  js.configs.recommended, // j: preset of recommended ESLint rules
  {
    rules: {
      'require-atomic-updates': 'error', 
      'arrow-body-style': ['error', 'as-needed'], // enforces no braces where they can be omitted (for arrow functions)
      eqeqeq: 'error',
      'no-console': 'warn',
      'prefer-const': 'error',
    },
  },
  // {     
  //   files: ["tests/**/*"],
  //   plugins: {jest, },
  //   env: {
  //     "jest/globals": true
  //   },  
  // },
  {
    files: ['server/**/*.js'],
    languageOptions: {
      globals: {
        ...node,
      },
    },
  },
  {
    files: ['client/**/*.{js,jsx}'],
    ...reactRecommended,
    plugins: {
      react,
    },

    languageOptions: { // configures eslint to handle jsx syntax which is used in react
      ...reactRecommended.languageOptions,
      parserOptions: { // configures eslint to handle jsx syntax which is used in react
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...browser,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: ['client/**/*.jsx'],
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
    },
  },
  {
    ignores: ['node_modules', 'client/dist/'],
  },  
];