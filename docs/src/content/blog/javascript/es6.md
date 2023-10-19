---
title:  es6补漏
author: ajn404
pubDatetime: 2023-08-30T02:36:27Z
postSlug: es6-plus
featured: false
draft: false
tags:
  - javascript
  - es6
  - mdn
description:
  "more details about es"
---

## 目录

## Array.prototype.reduce ( `callbackfn` [ , initialValue ] )

### 基本语法

```js
[1,2,3,4].reduce((a,b,c,d)=>{
    console.log(a,b,c,d);
     return a+b; 
     },0);

0 1 0 (4) [1, 2, 3, 4]
1 1 2 1 (4) [1, 2, 3, 4]
1 3 3 2 (4) [1, 2, 3, 4]
1 6 4 3 (4) [1, 2, 3, 4]
```

```js
let a = [1,2,3,4];
let b =a.reduce((a,b,c,d)=>{
     return a+b; 
     },0);
console.log(b);
//10
```

### ecma原文

> `callbackfn` should be a function that takes four arguments. reduce calls the callback, as a
function, once for each element after the first element present in the array, in ascending order.

> `callbackfn` is called with four arguments: the previousValue (value from the previous call to
`callbackfn`), the currentValue (value of the current element), the currentIndex, and the object
being traversed. The first time that callback is called, the previousValue and currentValue can
be one of two values. If an initialValue was supplied in the call to reduce, then previousValue
will be equal to initialValue and currentValue will be equal to the first value in the array. If no
initialValue was supplied, then previousValue will be equal to the first value in the array and
currentValue will be equal to the second. It is a TypeError if the array contains no elements
and initialValue is not provided.

> reduce does not directly mutate the object on which it is called but the object may be mutated by the calls
to `callbackfn`.

> The range of elements processed by reduce is set before the first call to `callbackfn`. Elements that are
appended to the array after the call to reduce begins will not be visited by `callbackfn`. If existing elements
of the array are changed, their value as passed to `callbackfn` will be the value at the time reduce visits
them; elements that are deleted after the call to reduce begins and before being visited are not visited.