<p align="center">
  <h3 align="center">Project Setup Template</h3>

  <p align="center">
    React Template!
    <br />
    <a href="#"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="/../../issues?q=label%3Atrello">Report Bug</a>
    ·
    <a href="/../../issues?q=label%3Atrello">Request Feature</a>
  </p>
</p>

## Table of contents

1. [About](#about)
2. [VSCode Extensions](#vscode-extensions)
3. [React Configuration](#react-configuration)

## About

This template contains lint settings for React

## VSCode Extensions

Required vscode extensions for lint settings to work

- [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

After installing the extensions, do the following configuration:

Inside your VSCode go to:

```
Preferences > Settings > Search for Default Formatter > Select Prettier - Code formatter
```

Inside your VSCode go to:

```
Preferences > Settings > Search for Format On Save > Activate the option
```

## React Configuration

Before starting development you need to add some packages in dev mode.
Run the following command in your terminal

For npm users

```sh
npm install --save-dev prettier eslint eslint-config-airbnb eslint-config-prettier eslint-plugin-import eslint-plugin-prettier eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks
```

For yarn users

```sh
yarn add -D prettier eslint eslint-config-airbnb eslint-config-prettier eslint-plugin-import eslint-plugin-prettier eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks
```
