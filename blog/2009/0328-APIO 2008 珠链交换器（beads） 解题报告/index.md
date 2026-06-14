---
title: "APIO 2008 珠链交换器（beads） 解题报告"
date: 2009-03-28T20:05:21+08:00
categories: ["逆水行舟"]
source: https://sinyalee.com/blog/?p=430
---
题目与数据移步APIO官方网站：[http://www.apio.olympiad.org/](http://www.apio.olympiad.org/)

首先我们异常容易就想到可以预处理的时候，对每个珠子列出一张表，储存这个珠子经过每个交换器之后的状态。然后每次询问，就对这个珠子所在的表来做二分查找。

然后发现如果拿一张N\*M（就是300000\*300000\*2\*4/1024/1024/1024≈670.5 GB）的表，估计要几十年后的电脑才可以实现，这道题的内存限制是256MB, 显然开不出来。

但是我们发现，刚开始就N项，每个交换器又产生2个状态，所以状态数最多是N+2M个。所以我们可以把这n张表头尾相接给弄成一个N+2M长度的1维数组。然后再记录每张表在这个数组中的始末位置。

可以预处理的时候，用now\[i\]存储这一条道现在是第几个珠子。然后没处理一个交换器，便添加在这个交换器交换的2个珠子的表上添加一项。此时用链表实现，所有交换器处理完，再把链表中的信息转移到二分查找用到的表中。

程序如下：

{  
ID: sinya1  
PROG: beads  
LANG:PASCAL  
}

uses  
  math,  
  beadslib;

const  
  maxn=300000;  
  maxm=300000;  
  maxl=maxn+maxm+maxm;

var  
  n,m,i,j,k,h,q:longint;  
  now:array\[1..maxn\]of longint;  
  pos1,swp1,next:array\[1..maxl\]of longint;  
  tail:array\[1..maxn\]of longint;  
  pos,swp:array\[1..maxl\]of longint;  
  be:array\[0..maxn\]of longint;

procedure swap(var x,y:longint);var z:longint;begin  
  z:=x;x:=y;y:=z;  
end;

procedure add(const x,p:longint);begin  
  inc(h);  
  pos1\[h\]:=p;swp1\[h\]:=i;next\[h\]:=-1;  
  next\[tail\[x\]\]:=h;  
  tail\[x\]:=h;  
end;

procedure init;begin  
  assign(input,’beads.in’);reset(input);

  readln(n,m);

  for i:=1 to n do now\[i\]:=i;  
  h:=n;  
  for i:=1 to n do begin  
    swp1\[i\]:=0;pos1\[i\]:=i;next\[i\]:=-1;  
    tail\[i\]:=i;  
  end;

  for i:=1 to m do begin  
    readln(j);  
    add(now\[j\],j+1);  
    add(now\[j+1\],j);  
    swap(now\[j\],now\[j+1\]);  
  end;

  be\[0\]:=1;  
  for i:=1 to n do begin  
    be\[i\]:=be\[i-1\];  
    j:=i;  
    while j>=0 do begin  
      pos\[be\[i\]\]:=pos1\[j\];  
      swp\[be\[i\]\]:=swp1\[j\];  
      inc(be\[i\]);  
      j:=next\[j\];  
    end;  
  end;

  close(input);  
end;

function search(const k,j:longint):longint;var l,r,m:longint;begin  
  l:=be\[k-1\];r:=be\[k\];  
  while r-l>1 do begin  
    m:=(r+l)shr 1;  
    if swp\[m\]<=j then l:=m  
    else r:=m;  
  end;  
  exit(pos\[l\]);  
end;

procedure work;begin  
  q:=getNumQuestions();  
  while q>0 do begin  
    getQuestion(k,j);  
    answer(search(k,j));  
    dec(q);  
  end;  
end;

begin  
  init;  
  work;  
end.

#### 关于互交式

（请把所有“互交”请自己代换成“交互”）

这是我第一次写互交式的程序。姚老师跟我说互交式的问题跟一般的问题没有区别，可是实际上还是有很大的区别的。因为互交式，就是要要求我们用在线算法，在每次询问都必须立即回答。不可以像一般的问题一样，把问题排序后或者怎么样才来做。

实际上那个标准互交库也是这么写的，他把那个问题文件做questions-9545431.txt，后面那一串密码的存在，就是要防止我们的程序直接访问问题文件。然后那个txt里面还有加密，要用三个magic number解密才可以知道里面写什么，这些都是为了防止我们偷看问题列表。

至于cena包，其实只要改写一下那个库文件，让他把结果输出到一个文件中就可以了。