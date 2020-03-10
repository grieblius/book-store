# Book Store sample application

## Tech Stack

Application is built using `TypeScript` and `React`.

Libraries used:

-   `react` - React.js library
-   `redux` - State container
-   `redux-saga` - Redux Middleware for side effects management
-   `material-ui` - React Material Design components library
-   `ESlint` - TS/JS linter based on airbnb rules

## Install and run

1. Clone repository
2. Run `npm install`
3. Run `npm run dev` - to launch development mode

## Available Scripts

-   `npm run build` - builds the app for production to the `dist` folder.
-   `npm run dev` - runs the app in the development mode.
-   `npm run start` - start app server locally in production mode.
-   `npm run lint` - lint TS/JS.
-   `npm run clean-dist` - clean /dist folder, where production build is stored.

## App Usage

App provides basic book store functionality. When running first time, app automatically pre-creates website sample data.
App data is stored in local storage. User session is stored in session storage.
There are two users available:

-   `kearee` - user with `client` role.
-   `monbel` - user with `admin` role.

For both users use the same password - `Password1`

User with `admin` role can access some additional management features. Such users will see menu icon button next to menu header's app logo, wher they can access user list, books and orders management pages.
