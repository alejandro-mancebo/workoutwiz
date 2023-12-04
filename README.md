# WorkoutWiz Web App

### [Backend folder](https://github.com/alejandro-mancebo/workoutwiz/blob/main/backend/README.md)

### [Frontend folder](https://github.com/alejandro-mancebo/workoutwiz/blob/main/frontend/README.md)


This is a full-stack WorkoutWiz web application built with the MERN stack (MongoDB, Express.js, React, Node.js). It allows users to search for workout, filter them using a search bar, create , mofidy and cancel a week plan. User authentication is implemented using JSON Web Tokens (JWT). The frontend is built with React and TypeScript, and TypeScript is used for styling.

## Features

-	Search type of exercise
-	Select weight in pound or kg
-	Select number of repetitions
-	Select number of rounds
-	Create a plan of the week
-	Modify the plan of the week
-	Delete the plan of the week
-	Finish the plan of the week
-	Register for the ongoing exercise
-	Compare result
-	User authentication: User authentication is implemented using JSON Web Tokens (JWT). Users can register, log in, and securely access their bookings and account information.

## Technologies Used

- Frontend: React, TypeScript, TailwindCSS, Axios
- Backend: Node.js, Express.js, MongoDB, Mongoose, JSON Web Tokens (JWT)

## Installation

1. Clone the repository:

```
git clone git@github.com:alejandro-mancebo/workoutwiz.git
```

2. Install the frontend dependencies:

```
cd frontend
npm install
```

3. Install the backend dependencies:

```
cd backend
npm install
```

4. Set up the backend server:

- Follow the instructions provided in the backend repository at [Backend Repository](https://github.com/alejandro-mancebo/workoutwiz/tree/main/backend) to install and configure the backend server.

5. Configure environment variables:

- Create a .env file in the root directory of the frontend.
- Provide the necessary environment variables, such as API endpoints in the .env file.

6. Start the development server:

```
npm run start
```

The app will be running at http://localhost:5173.


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

