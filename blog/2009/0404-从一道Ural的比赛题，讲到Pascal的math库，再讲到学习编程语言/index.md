---
title: "从一道Ural的比赛题，讲到Pascal的math库，再讲到学习编程语言"
date: 2009-04-04T22:26:26+08:00
categories: ["杂谈集", "逆水行舟"]
source: https://sinyalee.com/blog/?p=445
---
刚刚郭晓旭来到我家，一起刷月赛，我本来在做USACO的The Bovine Journal, 暂时放他一个人做。后来发现MLE之后就跑去玩FIFA 08, 然后一起吃苏南鹅肉，剩不到1小时做这道题，最后慢了2分钟做完。

地址：[http://acm.timus.ru/problem.aspx?space=1&num=1705](http://acm.timus.ru/problem.aspx?space=1&num=1705 "http://acm.timus.ru/problem.aspx?space=1&num=1705")

简述就是输入n, 1<=n<=10^18, 要求在O(1)的复杂度内算出一个最小的数k, 使得\[n/k\]=\[n/(k+1)\]。很明显是一道纯数学题。我用找规律做出来了，证明应该也不难，似乎归纳一下就可以了……

代码如下：

// For Junde Huang  
// Written by Sinya in April, 2009

uses math;

const  
  pn=’hare’;

var  
  t:longint;  
  n,l,r,m,dif,now,sol:int64;

procedure work;begin  
  readln(n);

  l:=trunc(sqrt(n));  
  r:=l+1;

  if l\*r>n then begin  
    sol:=r;  
    now:=l\*r-n;  
    dif:=ceil((-3+sqrt(1+4\*now))/2);  
    sol:=sol+dif;  
  end else begin  
    sol:=r;  
    now:=r\*r-n;  
    dif:=trunc(sqrt(now-1));  
    sol:=sol+dif;  
  end;

  writeln(sol);  
end;

begin

  readln(t);  
  while t>0 do begin  
    work;  
    dec(t);  
  end;  
end.

结果我本来是可以在比赛结束前通过的，我本来没有用math, ceiling（上取整）函数写的是turnc(x-0.0000001)+1，结果很诡异的WA掉了。后来，我发现，原来，trunc函数不是高斯函数（下取整函数）。trunc函数是一个很诡异的东西：对于正数是下取整，对于负数便是上取整——就是把小数部分去掉。

结果，我在负数的地方错了……fuck

比赛结束2分钟，我发现错误的地方。用了math，改成ceil(x)，就过了……

\==================================================================

这件事告诉我们，Free Pascal的math库是一个强大的东西。而且比赛的时候也是可以用的。虽然有时候评委们可能会忘了给你编译，就像我的[NOIp 2008](https://sinyalee.com/blog/?p=276)一样，会吓死人的。

math库的用法在“安装盘:FPC2.2.0docrtl.pdf” 里面书签点Reference for unit ’math’就有介绍（虽然是全英的）。这里摘录几个到目前为止觉得有用的东西：

ceil (694) Round to infinity  
floor (699) Round to minus infinity

log10 (705) calculate 10-base log  
log2 (705) calculate 2-base log  
logn (706) calculate N-base log

arccos (690) calculate reverse cosine  
arcsin (691) calculate reverse sine  
arctan2 (692) calculate reverse tangent  
cotan (696) calculate cotangent  
tan (725) calculate tangent

degtorad (698) convert degrees to radians  
radtodeg (716) convert radians to degrees

max (706) Maximum of 2 values  
min (710) Minimum of 2 values

有中文介绍，不过似乎不全：[http://zhidao.baidu.com/question/15304957.html?fr=qrl3](http://zhidao.baidu.com/question/15304957.html?fr=qrl3 "http://zhidao.baidu.com/question/15304957.html?fr=qrl3")

所以，math库要经常用，最好所有的程序都用。

\===================================================================

这个教训其实告诉我们：学习1种编程语言，除了语法之外，还要学很多东西。包括很多小特性和编译原理等等，很多都要靠实验来发现。比如现在，我还没有注意到Pascal的trunc函数不是下取整函数。所以，要转C++不是很简单，高中阶段不实现。