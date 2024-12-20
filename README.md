# Train website

## Как запускать

Для поднятия контейнеров

```bash
docker compose up --detach
docker compose up --detach --build --force-recreate
```

Для выполнения команды, без захода в контейнер

```
docker exec [контейнер] [команда]
docker exec train-website__node npm run lint
```

Для захода в **node** контейнер

```bash
docker exec -it train-website__node bash
```


## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```


## Setup a project

Добавить в `/etc/hosts` на хостовом компьютере.

127.0.0.1 train.local

Скачать проект на компьютер.

Установить зависимости

```bash
docker exec train-website__node npm install
```


## Cloc, code lines

cloc . --exclude-dir=.git,.vscode,.idea,.settings,package-lock.json,dist,vendor,node_modules
