# Angular Remote

Aplicação Angular 16 configurada como remote Module Federation. O `HomeComponent` é standalone e exposto como `angularApp/HomePage` para ser consumido por outros micro-frontends.

## Desenvolvimento local

- `npm install`
- `npm start`: sobe o dev-server via `ngx-build-plus` na porta `4200`.
- `npm run run:all`: inicia o servidor de federation do pacote `@angular-architects/module-federation` para integrar com hosts durante o desenvolvimento.

## Consumo pelo host

1. Adicione o remote ao host usando Module Federation: `remotes: { angularApp: 'angularApp@http://localhost:4200/remoteEntry.js' }`.
2. No host, importe o componente exposto: `const HomeComponent = await import('angularApp/HomePage');`.
3. Renderize `HomeComponent.HomeComponent` conforme o framework do host (por exemplo, converting to Web Component ou usando angular-specific bootstrap).

O bundle expõe somente o componente, por isso o host controla a estratégia de renderização (lazy, wrapper, etc.).

## Testes

`npm test -- --watch=false --browsers=ChromeHeadless`

## Build de produção

`npm run build` gera o pacote em `dist/angular-app` utilizando a configuração de Module Federation definida em `webpack.prod.config.js`.
