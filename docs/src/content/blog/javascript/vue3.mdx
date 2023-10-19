---
title: vue3设计与实现
author: ajn404
pubDatetime: 2023-09-18T08:01:33Z
postSlug: vue3
featured: true
draft: false
tags:
  - vue3
description:
  "阅读vue3设计与实现"
---

# 阅读vue3涉及与vue3的实现

## 目录

## 非原始值的响应式方案

### proxy & reflect

- proxy:代理对象
> 语法 `const p = new Proxy(target, handler)`

- reflect:提供了访问一个对象的默认行为
> 语法 `const r = Reflect.get(target, key)`

```js
const a = {}
const b = new Proxy(a, {
    get(target, key) {
        console.log('get', key)
        return Reflect.get(target, key)
    },
    set(target, key, value) {
        console.log('set', key, value)
        return Reflect.set(target, key, value)
    },
    deleteProperty(target, key) {
        console.log('delete', key)
        return Reflect.deleteProperty(target, key)
    }
})
```

#### reflect.get(target, propertyKey[, receiver])

第三个参数----如果target对象中指定了getter，receiver则为getter调用时的this值。


```js
const obj = { x: 1, y: 2 };
Reflect.get(obj, "x"); // 1

// Array
Reflect.get(["zero", "one"], 1,["two","another one"]);//one
```


```js
const obj = { x: 1, y: 2 };
Reflect.get(obj, "x"); // 1

// Array
Reflect.get(["zero", "one"], 1,["two","another one"]); // one
```


```js
const a = ["zero","one"]    
Object.defineProperty(a,'1',{
    get:function(){
        return this.at(0)}
})
Reflect.get(a,1,["one","one"])//one
a // ["zero","zero"]
```


#### [js中的访问器 getter](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/get)


#### 第四节实现的响应式数据代码

```js
const obj = {foo:1}

const p = new Proxy(obj, {
    get(target, key) {
        track(target, key)
        return target[key]
        }

    set(target, key, value){
        target[key] = value;
        trigger(target, key)
    }
    ...
})
```

如果我们的响应式数据obj是这样子的

```js
const obj = {
    foo:1,
    get bar(){
        return this.foo + 1
    }
}
```

当我们在副作用函数:
```js
effect(() => {
    console.log(p.bar)
})
```

尝试修改p.foo的值，p.bar的值也会跟着变化,但副作用函数并不会执行。
```js
p.foo=2
//p.bar===3
```

因为代理过程的get中的target实际上指向的是obj

```js
const p = new Proxy(obj, {
    get(target, key) {
        //target===obj
        track(target, key)
        return target[key]
        }
    ...
})
```

解决办法

```js
const p = new Proxy(obj, {
    get(target, key,receiver) {
        //target===obj
        track(target, key)
        return Reflect.get(target,key,receiver)
        }
    ...
})
```

p访问bar时，这里的receiver指向p，返回 `Reflect.get(target,key,receiver)`时触发get中的this也就指向p

#### js中的对象与proxy工作原理

...

