

## pnpm monorepo单独向某个子repo中添加依赖 
```
//add vue
pnpm --filter @notes/docs i @astrojs/vue vue -r
//add react
pnpm --filter @notes/docs i @astrojs/react react react-dom -r

```