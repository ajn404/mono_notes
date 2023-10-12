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
  "typescript more more more ts"
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


# [npm monorepo with ts](https://www.yieldcode.blog/post/npm-workspaces/)


假定你拥有三个npm项目:

- infra which responsible for working with the database
- api which is your API server
- worker which is some kind of asynchronous processing worker

目录结构如下
```zsh
.
├── node_modules
├── package-lock.json
├── package.json
├── packages
│   ├── api
│   ├── worker
│   └── infra
├── tsconfig.build.json
└── tsconfig.json
```

根目录的node_modules里放的是所有项目的依赖

根目录下的node_modules包含子项目的依赖的**符号链接**
```zsh
.node_modules/
├── ...
├── api -> ../packages/api
├── worker -> ../packages/worker
└── infra -> ../packages/infra
```

> 至于什么是符号链接

> 符号链接（Symbolic Links）是一种特殊的文件类型，它允许用户在不删除原始文件的情况下，将一个文件链接到另一个文件。在Linux和Unix系统中，符号链接通常使用“软链接”（Soft Links）或“硬链接”（Hard Links）来表示。

> 符号链接的特点是，当您访问符号链接时，实际上是在访问其所指向的文件。因此，如果您修改符号链接所指向的文件，符号链接本身不会发生变化。但是，如果您修改符号链接本身，例如更改其目标文件路径，符号链接将不再指向原始文件。

> 符号链接主要用于在不同目录之间共享文件、目录以及避免重复文件名等场景。在某些情况下，符号链接也被用于实现文件系统的动态链接，例如动态库、共享库等。

## 配置npm workspace

package.json
```json
{
  "name": "my-app",
  "private": true,
  "scripts": {},
  "workspaces": ["packages/*"],
  "devDependencies": {
    "@tsconfig/recommended": "^1.0.2",
    "@types/node": "^20.6.0",
    "ts-node": "^10.9.1",
    "typescript": "^5.2.2"
  }
}
```

整个项目的配置

tsconfig.json
```json
{
  "extends": "@tsconfig/recommended",
  "compilerOptions": {
    "incremental": true,
    "target": "es2019",
    "module": "commonjs",
    "declaration": true,
    "sourceMap": true,
    "composite": true,
    "strict": true,
    "moduleResolution": "node",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

打包配置

tsconfig.build.json
```json
{
  "files": [],
  "references": [
    {
      "path": "packages/infra"
    },
    {
      "path": "packages/api"
    },
    {
      "path": "packages/worker"
    }
  ]
}
```

package.json中添加打包命令
`...
"scripts": {
    "build": "tsc --build --verbose tsconfig.build.json",
}
...`

更多细节参考[npm docs - workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces)

# ts工具类

## Partial

Partial是TypeScript中的一个实用类型，用于创建一个新的类型，表示一个部分对象类型，即仅包括显式定义的属性。

以下是使用Partial实用类型的示例：


```ts
interface Person {
 name: string;
 age: number;
 city: string;
}

type PartialPerson = Partial<Person>;

const person: PartialPerson = {
 name: "John Doe",
 age: 30,
};

// 这将不会编译，因为我們沒有定義城市屬性
// person.city = "New York";
```

在這個例子中，我們有一個接口Person，其中包含三個屬性：name、age和city。我們 then 創建了一個新的類型PartialPerson，通過使用Partial實用類型來從Person中創建。

我們 then 創建了一個對象person，其類型為PartialPerson，僅包括name和age屬性。如果我們嘗試將city屬性設置在該對象上，TypeScript將不允許這件事，因為它沒有在PartialPerson類型中明確定義。




# 链接

- [TypeScript 之 More on Functions](https://zhuanlan.zhihu.com/p/434016060?utm_id=0)
- [TypeScript 中的 Index Signatures](http://www.icodebang.com/article/255272)
- [ts playground](https://www.typescriptlang.org/play)