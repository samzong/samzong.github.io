---
layout: post
title: Javascript Tips
toc: true
author: samzong.lu
author_id: defaultAuthorId
language: en
abbrlink: 19155
date: 2022-03-28 19:09:44
tags: 
    - Javascript
    - HTML
categories: 
    - Javascript
---

- alert 弹窗提醒一段文本
- a = prompt("input desc")  接收输入，并把内容赋值给a
- confirm 弹出确认窗口，让用户确认，这是给出的结果就是 yes/no
- console.log('AAS') 输出一段日志
- let a = 1  声明 变量 a=1， number 类型
- const ABB = 123 声明一个常量 ABB, 不可以重新赋值
- undefined 和 null 都是空的意思，但是这两个又不相同
- a ?? "hello" ;  `??` 叫做 空值运算符，指当a 未被赋值时，将hello赋值给a，如果a已经被赋值了，则不变 ; a 需要被声明，在JavaScript中 声明 和 赋值 是两件事情

### js的数据类型

- js 是弱类型语言， 1 == '1' => true; 但是  1 === '1' => false；   6 / "2" => 3, typeof is number

### 支持判断

if  /elif else

### 支持的循环方式

```javascript

do {
    // Hello
} whIle ()

for (a=1;a<10;a+=2) {
 // Hello
}

a = 100;
switch (a) {
    case (a = 100):{
        //Hello
        break;
    }
    default:
        alert(a);
}
```

### 函数声明

必须要使用 function

```javascript

function showMessage() {
    alert('Hello Javascript !');
}
```

- 函数中变量的作用域：这部分与Python和C一致， 分别为 内部变量 和 外部变量； 关系存在在继承的概念
- 函数的参数， 入参定义在 () 内，当函数声明了入参后，在对应调用时，就需要传递符合条件的参数
   - 支持函数的默认值的设定
- 函数的返回值，同样使用 return 作为返回值处理
- 函数 function is  an action, 所以函数的命名通常是 使用动词； javascipt 的命名方式 官方建议为 驼峰的方式

> 函数的特殊部分


- 函数表达式   let  sayHi = function () { alert('Hi')}  利用声明 `let` 创建了一个函数，并把他赋值给了变量 sayHi
- 回调函数

---

[ ] 今天学习的内容到此 回调函数  [https://zh.javascript.info/function-expressions](https://zh.javascript.info/function-expressions)

### 严格模式

- 三连表达式     cond ? resultA : resultB   //  1 > 0 ? alert(true) : alert(false)   cond 为真展示resultA, 反之展示resultB
- 空值运算符     a ?? b       =>  a ?? b 的结果是 a，除非 a 为 null/undefined，这时结果是 b

### 开发行为规范

> BDD


在 BDD 中，规范先行，实现在后。最后我们同时拥有了规范和代码。

规范有三种使用方式：

- 作为 测试 —— 保证代码正确工作。
- 作为 文档 —— describe 和 it 的标题告诉我们函数做了什么。
- 作为 案例 —— 测试实际工作的例子展示了一个函数可以被怎样使用。

有了规范，我们可以安全地改进、修改甚至重写函数，并确保它仍然正确地工作。

这在一个函数会被用在多个地方的大型项目中尤其重要。当我们改变这样一个函数时，没有办法手动检查每个使用它们的地方是否仍旧正确。

如果没有测试，一般有两个办法：

- 展示修改，无论修改了什么。然后我们的用户遇到了 bug，这应该是我们没有手动完成某些检查。
- 如果对出错的惩罚比较严重，并且没有测试，那么大家会很害怕修改这样的函数，然后这些代码就会越来越陈旧，没有人会想接触它。这很不利于发展。自动化测试则有助于避免这样的问题！

如果这个项目被测试代码覆盖了，就不会出现这种问题。在任何修改之后，我们都可以运行测试，并在几秒钟内看到大量的检查。

另外，一个经过良好测试的代码通常都有更好的架构。

当然，这是因为覆盖了自动化测试的代码更容易修改和改进。但还有另一个原因。

要编写测试，代码的组织方式应确保每个函数都有一个清晰描述的任务、定义良好的输入和输出。这意味着从一开始就有一个好的架构。

在实际开发中有时候可能并不容易，有时很难在写实际代码之前编写规范，因为还不清楚它应该如何表现。但一般来说，编写测试使得开发更快更稳定。

### Object 对象的基础知识

在js中 对象可以说非常常见的用到，所以相对来讲 定义一个对象也是非常的方便

```javascript
let user = new Object();   构造函数 的语法
let user = {}     构造 "字面量的语法"
```

在对象中，包含的是 一个个属性， 这些属性又以 键值对 的形式出现在 {} 中

- 定义一个有属性的对象  let user = {name:'alex', age: 18}
   - 增加属性 user.city = 'Shanghai'  =>   user['love package'] = 'Apple'
   - 删除一个属性 delete user.age
- 计算属性  ： 当创建一个对象时，我可以在对象字面量中使用方括号，这叫做计算属性；计算属性的含义是 [fruit] 是从 变量 fruit 中获取的
- 判断一个 属性是否在对象中    "key" in Object  ，这里的 key 需要时一个值，否则会被认为一个变量
- 遍历一个对象采用的方式是  for  (let key in Object) : 这里的做法是 声明[let] 变量key ，并且把Object 中的每一个key的值遍历赋予key
- 取出对象中一个key的值可以采用的方式 Object[key] 或者 Object.key；但是Object.key 会出现对 `多词属性`
   - 单词属性   name , age
   - 多词属性   "like birds" ， 这时使用 Object.key 的方式就不可行了

> JavaScirpt 中的垃圾回收机制


当一个对象中的属性被建立后，如果这些属性被多个对象引用时，其他一个对象被重新赋值了，那么这些属性还是可以被访问的；但是当所有对象被重置后，这些无法被访问的属性 就变得不可以，这也会占用我们内存，而这类也会被 回收。

#### 对象的方法 `this`

this 是用来标识当前对象的，这个对象可以是个函数 ; 为了访问该对象，方法中可以使用 this 关键字。

```
this 设计到编程的一种形式 ： **面向对象编程** OOP ; 当我们在代码中用对象表示实体时，就是所谓的 面向对象编程，简称为 “OOP”。
```

- this 的优势 ： 在 JavaScript 中，this 关键字与其他大多数编程语言中的不同。JavaScript 中的 this 可以用于任何函数，即使它不是对象的方法。
- this 的值是在代码运行时计算出来的，它取决于代码上下文。 不用函数调用this时的到结果不一致的
- 箭头函数   function sum (a,b) => a*b ； 这类箭头函数是没有自己的 this，如果在箭头函数中使用 this，会把this当成一个真正的对象去处理，这不好

在 JavaScript 中，this 是“自由”的，它的值是在调用时计算出来的，它的值并不取决于方法声明的位置，而是取决于在“点符号前”的是什么对象。在运行时对 this 求值的这个概念既有优点也有缺点。一方面，函数可以被重用于不同的对象。另一方面，更大的灵活性造成了更大的出错的可能。这里我们的立场并不是要评判编程语言的这个设计是好是坏。而是要了解怎样使用它，如何趋利避害。

#### 对象的 构造和操作符 `new`

- 构造函数在技术上，也是属于常规函数，不过有2个约定：
   - 命名以大写字母开头， 这是一个共同的约定，用来标明一个函数将被使用 `new` 来运行
   - 他们只能有 `new` 操作符来执行

构造器不能被再次调用，因为他保存在任何地址，知识被创建后 后续 调用使用；所以 构造函数的封装一个 单一对象的代码，而无需将来重用

#### JavaScript  `?.` 可选链

可选链 ?. 语法有三种形式：

- obj?.prop —— 如果 obj 存在则返回 obj.prop，否则返回 undefined。
- obj?.[prop] —— 如果 obj 存在则返回 obj[prop]，否则返回 undefined。
- obj.method?.() —— 如果 obj.method 存在则调用 obj.method()，否则返回 undefined。

正如我们所看到的，这些语法形式用起来都很简单直接。?. 检查左边部分是否为 null/undefined，如果不是则继续运算。 ?. 链使我们能够安全地访问嵌套属性。 但是，我们应该谨慎地使用 ?.，仅在当左边部分不存在也没问题的情况下使用为宜。以保证在代码中有编程上的错误出现时，也不会对我们隐藏。

### Symbol  类型

根据规范，Obj的属性键 只能是 字符串类型或者 Symbol 类型；不能是Number，也不能是Boolean。

Symbol 值 表示 唯一的标识符，现在可以通过 Symbol() 来创建这种类型的值；Symbol的特性是唯一，即使我们创建了相同描述的Symbol，他们的值不相同的；比如以下：

```javascript
let id1 = Symbol('id')
let id2 = Symbol('id')

id1 == id2   // 结果是 false
```

Symbol 的另外一个特性是不会被自动转化为字符串；其实在javascript中大多数的数值都是可以进行字符串的 `隐式转换` ，但是使用 Symbol() 定义的一个字符，是不能够直接转化为 字符串的， 可以使用 `Symbol('id').toString()` 来输出字符串。

### 原始类型的方法

在 JavaScript 中有 7 种原始类型：string，number，bigint，boolean，symbol，null 和 undefined。

- 字符串处理方法
- Number的处理方法

### 数组方法的备忘笔记

数组方法备忘单：

- 添加/删除元素：
   - **push(...items) —— 向尾端添加元素**
   - **pop() —— 从尾端提取一个元素**
   - **shift() —— 从首端提取一个元素**
   - **unshift(...items) —— 向首端添加元素**
   - splice(pos, deleteCount, ...items) 从 pos 开始删除 deleteCount 个元素，并插入 items。 `用来控制数组的增删改查`
   - slice(start, end) —— 创建一个新数组，将从索引 start 到索引 end（但不包括 end）的元素复制进去 `取出部分数组的内容产生新数组`
   - concat(...items) —— 返回一个新数组：复制当前数组的所有元素，并向其中添加 items。如果 items 中的任意一项是一个数组，那么就取其元素。 `拼接多个数组，产生一个新的数组`

*搜索元素：
* indexOf/lastIndexOf(item, pos) —— 从索引 pos 开始搜索 item，搜索到则返回该项的索引，否则返回 -1。
* includes(value) —— 如果数组有 value，则返回 true，否则返回 false。
* find/filter(func) —— 通过 func 过滤元素，返回使 func 返回 true 的第一个值/所有值。
* findIndex 和 find 类似，但返回索引而不是值。

- 遍历元素：
   - forEach(func) —— 对每个元素都调用 func，不返回任何内容。

```javascript

let fruits = ['Apple', 'Orage','Prism']

for ( let fruit of fruits ) {alert(fruit); }
// 遍历数组 使用 for .. of 不能获取到当前元素的索引，知识获取到元素的值；但是大多数情况下是够用的，而且这样些代码更短，质量会高一些

for (let i = 0; i <= fruits.length; i++ ) {alert(fruits[i])}
// 这个方式就是标准的通过遍历元素的索引，然后通过索引获取到对应的数组元素的值
```

- 转换数组：
   - map(func) —— 根据对每个元素调用 func 的结果创建一个新数组。
   - sort(func) —— 对数组进行原位（in-place）排序，然后返回它。
   - reverse() —— 原位（in-place）反转数组，然后返回它。
   - split/join —— 将字符串转换为数组并返回。
   - reduce/reduceRight(func, initial) —— 通过对每个元素调用 func 计算数组上的单个值，并在调用之间传递中间结果。
- 其他：
   - Array.isArray(arr) 检查 arr 是否是一个数组。

请注意，sort，reverse 和 splice 方法修改的是数组本身； 这些是最常用的方法，它们覆盖 99％ 的用例。但是还有其他几个：

- arr.some(fn)/arr.every(fn) 检查数组。

与 map 类似，对数组的每个元素调用函数 fn。如果任何/所有结果为 true，则返回 true，否则返回 false。

这两个方法的行为类似于 || 和 && 运算符：如果 fn 返回一个真值，arr.some() 立即返回 true 并停止迭代其余数组项；如果 fn 返回一个假值，arr.every() 立即返回 false 并停止对其余数组项的迭代。

我们可以使用 every 来比较数组：

```javascript
function arraysEqual(arr1, arr2) {
  return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
}

alert( arraysEqual([1, 2], [1, 2])); // true
```

- arr.fill(value, start, end) —— 从索引 start 到 end，用重复的 value 填充数组。
- arr.copyWithin(target, start, end) —— 将从位置 start 到 end 的所有元素复制到 自身 的 target 位置（覆盖现有元素）。
- arr.flat(depth)/arr.flatMap(fn) 从多维数组创建一个新的扁平数组。
- Array.of(element0[, element1[, …[, elementN]]]) 基于可变数量的参数创建一个新的 Array 实例，而不需要考虑参数的数量或类型。
