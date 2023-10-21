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


### [String.prototype.localeCompare](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare)

localeCompare 方法是 JavaScript 字符串对象的一个方法，用于比较两个字符串的大小。它主要用于比较字符串的 Unicode 值，以便在某些语言环境下进行排序。

localeCompare 方法的语法如下：

```js
str1.localeCompare(str2, [locale, [options]])
```

其中，str1 和 str2 是需要比较的两个字符串。locale 是一个可选参数，表示用于比较字符串的语言环境。options 是一个可选参数，表示用于比较字符串的选项。

localeCompare 方法的返回值是一个整数，表示两个字符串的大小关系：

如果第一个字符串大于第二个字符串，则返回正数。
如果第一个字符串小于第二个字符串，则返回负数。
如果两个字符串相等，则返回 0。
例如，以下代码将比较两个字符串的大小：

```js
const str1 = 'apple';
const str2 = 'banana';

const result = str1.localeCompare(str2, 'en-US');

if (result > 0) {
 console.log(str1 + ' is greater than ' + str2);
} else if (result < 0) {
 console.log(str1 + ' is less than ' + str2);
} else {
 console.log(str1 + ' is equal to ' + str2);
}
```

在这个例子中，我们使用了 'en-US' 作为语言环境参数。这将根据英语的规则对 str1 和 str2 进行排序。如果需要使用其他语言环境进行比较，可以将其传递给 localeCompare 方法。

需要注意的是，localeCompare 方法比较的是字符串的 Unicode 值，而不是它们在屏幕上的显示顺序。因此，它可能会受到字符串的字体和显示设置的影响。

## 链接

