---
title:  玩转barba.js
author: ajn404
pubDatetime: 2023-08-31T02:23:54Z
postSlug: barbajs
featured: false
draft: false
tags:
  - npm
  - barbajs
  - 路由切换
description:
  "Barba.js is a small (7kb minified and compressed) and easy-to-use library that helps you create fluid and smooth transitions between your website’s pages. "
---

## install

```
npm install @barba/core
```

pnpm 
```
pnpm --filter @notes/docs i @barba/core gsap -r
```

## setup

html
```html
<body data-barba="wrapper">
  <!-- put here content that will not change
  between your pages, like <header> or <nav> -->

  <main data-barba="container" data-barba-namespace="home">
    <!-- put here the content you wish to change
    between your pages, like your main content <h1> or <p> -->
  </main>

  <!-- put here content that will not change
  between your pages, like <footer> -->
</body>
```
js
```js
import barba from '@barba/core';
import gsap from "gsap"
barba.init({
  transitions: [{
    name: 'opacity-transition',
    leave:(data)=> {
      gsap.to(data.current.container, {
        opacity: 0
      });
    },
    enter(data) {
       gsap.from(data.next.container, {
        opacity: 0
      });
    }
  }]
});
```

## 相关链接

- [barbajs官方文档](https://barba.js.org)
- [gsap](https://greensock.com/docs/)