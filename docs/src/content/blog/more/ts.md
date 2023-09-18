---
title: typescript
author: ajn404
pubDatetime: 2023-09-18 03:36:30
postSlug: ts
featured: true
draft: false
tags:
  - ts

description:
  "typescript more more more"
---
# 目录

# interfaces

## interfaces call signatures

接口调用签名
```ts
type FunctionAlias = (input:string)=>number;
interface CallSignature {
    (input:string):number;
}
const typedFunctionAlias:FunctionAlias = (input) => input.length;
const typedCallSignature:CallSignature = (input) => input.length;
```

我们想描述一个带有属性的函数，我们可以在一个对象类型中写一个调用签名（call signature）


## index signatures

```ts
interface WordCount{
    [i:string]:number;
}
const counts:WordCount = {

counts.apple = 1;
counts.banana =2;

//counts.cherry = true;
}

```

### Index signature vs Record<Keys, Type>

- Record<Keys, Type>
> Constructs an object type whose property keys are Keys and whose property values are Type. This utility can be used to map the properties of a type to another type.

```ts
interface CatInfo {
  age: number;
  breed: string;
}
 
type CatName = "miffy" | "boris" | "mordred";
 
const cats: Record<CatName, CatInfo> = {
  miffy: { age: 10, breed: "Persian" },
  boris: { age: 5, breed: "Maine Coon" },
  mordred: { age: 16, breed: "British Shorthair" },
};

```

index signature仅接受string,number或symbol作为键类型。如果您想尝试使用字符串文字类型的联合作为索引签名中的键，则会出现错误
*建议使用index signature来注解通用的对象，例如键是string类型。但是当您事先知道键时，应当使用Record<Keys, Type>注解特定对象*

## interface extensions

```ts
interface Writing{
    tittle:string
}

interface Novella extends Writing{
    pages:number

}

const novella:Novella = {
    tittle:'The Catcher in the Rye',
    pages:300
}
```

> nifty 漂亮的
> Interface extensions are a nifty way to represent that one type of entity in your project is a superset (it includes all the members of) another entity.
They allow you to avoid having to type out the same code repeatedly across multiple interfaces to represent that relationship.


### extends multiple interfaces

```ts
interface GivesNumber {
  giveNumber(): number;
}

interface GivesString {
  giveString(): string;
}

interface GivesBothAndEither extends GivesNumber, GivesString {
  giveEither(): number | string;
}

function useGivesBoth(instance: GivesBothAndEither) {
  instance.giveEither(); // Type: number | string
  instance.giveNumber(); // Type: number
  instance.giveString(); // Type: string
}
```

### member naming conflicts


```ts
interface MergedProperties {
  same: (input: boolean) => string;
  different: (input: string) => string;
}

interface MergedProperties {
  same: (input: boolean) => string; // Ok
  different: (input: number) => string;
  //Subsequent property declarations must have the same type.  Property 'different' must be of type '(input: string) => string', but here has type '(input: number) => string'.
}
```

```ts
interface MergedMethods {
  different(input: string): string;
}

interface MergedMethods {
  different(input: number): string; // Ok
}

const a :MergedMethods ={
  different:(a)=>{
    return a.toString()
    //(parameter) a: string | number
  }
}
```

# 链接

- [TypeScript 之 More on Functions](https://zhuanlan.zhihu.com/p/434016060?utm_id=0)
- [TypeScript 中的 Index Signatures](http://www.icodebang.com/article/255272)
- [ts playground](https://www.typescriptlang.org/play)