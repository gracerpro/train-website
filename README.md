# Train website

This is website to `TrainClient` mobile application,
[visit it](https://train.vyacheslaff.ru/)

## Quick hints

Up the containers

```bash
docker compose up --detach
docker compose up --detach --build --force-recreate
```

Log in to **node** container

```bash
docker exec -it train-website__node bash
```

## Project Setup

Download the source code to local computer by `git`

```bash
git clone git@github.com:gracerpro/train-website.git
```

Install `docker` and run the containers.

Install the dependencies

```bash
npm install
# or
docker exec train-website__node npm install
```

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build-prod
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Cloc, code lines

cloc . --exclude-dir=.git,.vscode,.idea,.settings,package-lock.json,dist,vendor,node_modules

## Warning

Downgrade sass version to `1.64.2` because latest sass version displays 180 warnings like this

```
Deprecation Warning [color-functions]: green() is deprecated.
```
