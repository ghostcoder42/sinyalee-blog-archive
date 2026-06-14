---
title: "APIO 2008 脱氧核糖核酸（dna） 解题报告"
date: 2009-03-28T20:11:36+08:00
categories: ["逆水行舟"]
source: https://sinyalee.com/blog/?p=436
---
题目与数据移步APIO官方网站：[http://www.apio.olympiad.org/](http://www.apio.olympiad.org/)

首先我对ACGT分别标号为1234，方便后面计算。于是把DNA储存为一个st串，0表示N.

我们对他的所谓“范式-j”做一下深入剖析，发现，“范式-j”无非是符合st\[ x \] > st \[ x + 1 \]的x的个数要小于j.

我们可以设计状态f \[ i , be , ik \]表示st \[ i \] .. st \[ m \]中，st\[ i \]是be，里面符合st\[ x \] > st \[ x + 1 \]的x的个数为ik。

然后

[![2{ZG3\]DGU8PR2S\[9@K%9TX1](https://sinyalee.com/blog/wp-content/uploads/2009/03/2zg3dgu8pr2s9k9tx1-thumb.jpg)](https://sinyalee.com/blog/wp-content/uploads/2009/03/2zg3dgu8pr2s9k9tx1.jpg)

也便是st \[ i \] .. st \[ m \]中，st\[ i \]是be，的范式-ik的个数。

可以得到状态转移方程：

> 1) 若st \[ i \] = be或者 st \[ i \] = 0那么，
> 
> [![image](https://sinyalee.com/blog/wp-content/uploads/2009/03/image-thumb7.png)](https://sinyalee.com/blog/wp-content/uploads/2009/03/image7.png)
> 
> 2) 否则，
> 
> f \[ i , be , ik \] = 0

于是我们可以在O ( m \* 4^2 \* k ) 的时间复杂度内算出所有的f和sum。

然后我们从头往后扫，对第i位置个位置，从1到4枚举be, 若发现sum\[ i , be , K \] < R, 就表明在这个位置填这种核苷酸不能达到结果。所以就 r := r – sum\[ i , be, k \] , 若be小于i-1处填的核苷酸，那么便 k := k – 1 。 如果sum\[ i , be , K \] >= R , 就表明这个位置应该填be了，便去处理第i + 1个位置了。

我的程序：

{  
ID: sinya1  
PROG: dna  
LANG: PASCAL  
}

uses math;

const  
  code:array\[‘A’..’T’\]of longint=(1,0,2,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,4);  
  decode:array\[1..4\]of char=(‘A’,’C’,’G’,’T’);  
  maxm=50000;  
  maxl=maxm;  
  maxk=9;

var  
  m,k,i,be,next,ik,up,down:longint;  
  st:array\[0..maxm\]of longint;  
  ch:char;  
  f,sum:array\[1..maxm+1,1..4,0..maxk\]of int64;  
  r:int64;

procedure init;begin  
  readln(m,k,r);dec(k);  
  for i:=1 to m do begin  
    read(ch);st\[i\]:=code\[ch\];  
  end;  
  st\[0\]:=1;  
end;

procedure dp;begin  
  fillchar(f,sizeof(f),0);  
  fillchar(sum,sizeof(sum),0);  
  f\[m+1,4,0\]:=1;  
  for i:=m downto 1 do begin  
    if st\[i\]>0 then begin  
      up:=st\[i\];down:=up;  
    end else begin  
      up:=4;down:=1;  
    end;  
    for be:=down to up do begin  
      for ik:=0 to k do  
        for next:=be to 4 do  
          f\[i,be,ik\]:=f\[i,be,ik\]+f\[i+1,next,ik\];  
      for ik:=1 to k do  
        for next:=1 to be-1 do  
          f\[i,be,ik\]:=f\[i,be,ik\]+f\[i+1,next,ik-1\];  
      sum\[i,be,0\]:=f\[i,be,0\];  
      for ik:=1 to k do  
        sum\[i,be,ik\]:=sum\[i,be,ik-1\]+f\[i,be,ik\];  
    end;  
  end;  
end;

procedure find;begin  
  for i:=1 to m do begin  
    dec(k);  
    for be:=1 to 4 do begin  
      if be=st\[i-1\] then inc(k);  
      if sum\[i,be,k\]>=r then break  
      else r:=r-sum\[i,be,k\];  
    end;  
    st\[i\]:=be;  
    write(decode\[st\[i\]\]);  
  end;  
  writeln;  
end;

begin  
  assign(input,’dna.in’);reset(input);  
  assign(output,’dna.sol’);rewrite(output);

  init;  
  dp;  
  find;

  close(input);close(output);  
end.