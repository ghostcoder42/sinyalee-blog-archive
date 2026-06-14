---
title: "APIO 2007 风铃（Mobiles） 解题报告"
date: 2009-03-28T19:45:10+08:00
categories: ["逆水行舟"]
source: https://sinyalee.com/blog/?p=399
---
题目与数据移步APIO官方网站：[http://www.apio.olympiad.org/](http://www.apio.olympiad.org/)

这道题就是要交互一些节点的左右子树，让它变成一棵完全二叉树。

首先要预处理一下每一棵子树的最大深度和最小深度，这个用O(n)的树形DP轻松解决。经过了猥琐恐怖的GDKOI之后一做到树形DP就有爆栈的阴影，但是这道题要移成完全二叉树，深度不可能超过[![image](https://sinyalee.com/blog/wp-content/uploads/2009/03/image-thumb1.png)](https://sinyalee.com/blog/wp-content/uploads/2009/03/image1.png)，所以只要深度超过17就直接无解掉（虽然我程序很有人品地算到100），所以不可能爆栈。

如果整棵树的叶子节点高度差超过1，直接无解掉。否则进入下一步。

由于交换不改变其深度，所以只要把深的移到左边，浅的移到右边就好了，这个贪心解决。

处理某棵树时，如果左右子树叶子节点高度差都是1，那么直接无解。如果高度差都是0，那么把低的移到左边。如果只有一棵子树高度差是1，那么如果另外的子树的高度高那么放到左边，否则放到右边，然后递归处理有高度差的子树。

由于程序写了一个星期，有点淡忘，可能还没有涵盖所有情况，所以先贴上程序。

{  
ID: sinya1  
PROG: mobiles  
LANG: PASCAL  
}

uses math;

const  
  pn=’mobiles’;  
  maxn=100000;

var  
  n,i:longint;  
  lc,rc:array\[1..maxn\]of longint;  
  minh,maxh:array\[1..maxn\]of longint;

procedure outpt(const x:longint);begin  
  assign(output,pn+’.out’);rewrite(output);  
  writeln(x);  
  close(output);  
  halt;  
end;

procedure init;begin  
  assign(input,pn+’.in’);reset(input);  
  readln(n);  
  for i:=1 to n do readln(lc\[i\],rc\[i\]);  
  close(input);  
end;

procedure dp1(const x,h:longint);forward;

procedure dp1\_1(const x,h,ch:longint);begin  
  if ch=-1 then begin  
    minh\[x\]:=min(minh\[x\],h+1);  
    maxh\[x\]:=max(maxh\[x\],h+1);  
  end else begin  
    dp1(ch,h+1);  
    minh\[x\]:=min(minh\[x\],minh\[ch\]);  
    maxh\[x\]:=max(maxh\[x\],maxh\[ch\]);  
  end;  
end;

procedure dp1(const x,h:longint);begin  
  if h>100 then outpt(-1);  
  minh\[x\]:=maxlongint;  
  maxh\[x\]:=-maxlongint;  
  dp1\_1(x,h,lc\[x\]);  
  dp1\_1(x,h,rc\[x\]);  
end;

function cmaxh(const x,h:longint):longint;begin  
  if x=-1 then exit(h);exit(maxh\[x\]);  
end;

function cminh(const x,h:longint):longint;begin  
  if x=-1 then exit(h);exit(minh\[x\]);  
end;

function dif(const x,h:longint):longint;begin  
  exit(cmaxh(x,h)-cminh(x,h));  
end;

function dp2(const x,h:longint):longint;begin  
  if dif(lc\[x\],h+1)>0 then begin  
    if dif(rc\[x\],h+1)>0 then begin  
      outpt(-1);  
    end else begin  
      if cminh(rc\[x\],h+1)=minh\[1\] then  
        exit(dp2(lc\[x\],h+1))  
      else  
        exit(dp2(lc\[x\],h+1)+1)  
    end;  
  end else begin  
    if dif(rc\[x\],h+1)>0 then begin  
      if cmaxh(lc\[x\],h+1)=maxh\[1\] then  
        exit(dp2(rc\[x\],h+1))  
      else  
        exit(dp2(rc\[x\],h+1)+1)  
    end else begin  
      if cmaxh(lc\[x\],h+1)=maxh\[1\] then  
        exit(0)  
      else exit(1);  
    end;  
  end;  
end;

begin  
  init;// read the data  
  dp1(1,1);// calculate the height  
  if maxh\[1\]-minh\[1\]>1 then outpt(-1);  
  if maxh\[1\]-minh\[1\]=0 then outpt(0);  
  outpt(dp2(1,1));  
end.