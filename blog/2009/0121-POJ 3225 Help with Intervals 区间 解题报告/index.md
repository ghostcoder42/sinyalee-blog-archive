---
title: "POJ 3225: Help with Intervals 区间 解题报告"
date: 2009-01-21T11:51:26+08:00
categories: ["作品展示"]
source: https://sinyalee.com/blog/?p=342
---
这道题在上海卡了3天。

其实一个原因是去做牙齿，感情波动等浪费很多时间。然后昨天整天先去书城买书买碟，又去博物馆把里面的书画逛了一遍（没有时间看青铜器和陶瓷器等，只能挑最喜欢的书画看）。所以做这么慢也是情有可原滴。（迷之音：嘘~~~~~~~~~，借口，绝对是借口）

### 题目

题目: [http://acm.pku.edu.cn/JudgeOnline/problem?id=3225](http://acm.pku.edu.cn/JudgeOnline/problem?id=3225)

简单地说，这道题要求是已知

A ∪ B ={x : x ∈ A or x ∈ B}  
A ∩ B ={x : x ∈ A and x ∈ B}  
A − B ={x : x ∈ A but x ∉ B}  
A ⊕ B = (A − B) ∪ (B − A)

然后给你一个空集S，和一系列操作（操作数小于等于65535）：

U T : S ← S ∪ T  
I T : S ← S ∩ T  
D T : S ← S − T  
C T :  S ← T − S  
S T : S ← S ⊕ T

其中T是端点是0到65535的区间（可开可闭可半开半闭）。

然后要你打印所有操作后的S集合。

### 基本思路

对于开闭区间的断点问题，我们只要重新编号就可以了。\[0,0\]=>0; (0,1)=>1; \[1,1\]=>2; (1,2)=>3，依此类推。

这道题一拿到就有一个暴力刷01数组的冲动（1表示这个属于S, 0不属于）。可是数据范围要求快速修改的操作（对查询的要求不高），于是我们自然而然想到线段树( segtree)。

由USACO的Elite 2008 November Competition的Cowxor的启发，我发现只要2个操作就可以覆盖题目要求的5个操作。

cover(a,b,c)是把a到b涂成c。然后change(a,b)表示让a,b段全部0,1反向。

设T集合编号后左右端点分别是l,r, 则操作有如下等价关系

U T : cover(l,r,1)  
I T : cover(0,l-1,0);cover(r+1,maxn,0)  
D T : cover(l,r,0)  
C T :  change(0,maxn);cover(0,l-1,0);cover(r+1,maxn,0)  
S T : change(l,r)

一个线段树2个参数，st和ch。st是线段的颜色，-1表示颜色变化。ch表示该线段颜色有没有整段反转，如果\[0,2)和\[0,1)都有反转，则实际颜色反转2次。2表示下面的反转都作废。

有了两个参数，cover、change和ana(lysis)操作就不那么实现了。但是表示方法的探究过程还是要自己琢磨的。要同时兼顾两个操作的实现难度。

### 程序:

const
const
  pn='p3225';
  maxn=65535 shl 1;//编号后的范围是0..maxn

type
  segtree=array\[1..(maxn+1) shl 2\]of longint;

var
  s:string;
  op:char;
  i,j,l,r:longint;
  st,ch:segtree;
  sol:array\[0..maxn+1\]of longint;//最后整理得到的01数组

function code(x:string):longint;var ret,t:longint;c:char;begin//编码
  if x\[1\]in\['\[','('\]then begin
    c:=x\[1\];
    delete(x,1,1);
    val(x,ret,t);
    ret:=ret shl 1+ord(c='(');
  end else begin
    c:=x\[length(x)\];
    delete(x,length(x),1);
    val(x,ret,t);
    ret:=ret shl 1-ord(c=')');
  end;
  exit(ret);
end;

function decode\_l(x:longint):string;begin//解码到左端点
  str(x shr 1,decode\_l);
  if odd(x)then
    insert('(',decode\_l,1)
  else
    insert('\[',decode\_l,1)
end;

function decode\_r(x:longint):string;begin//解码到右端点
  str((x+1)shr 1,decode\_r);
  if odd(x)then
    insert(')',decode\_r,length(decode\_r)+1)
  else
    insert('\]',decode\_r,length(decode\_r)+1)
end;

procedure cover(n,l,r,x,y,a:longint);var lc,rc,m:longint;begin
  if(x=l)and(y=r)then begin
    ch\[n\]:=2;
    st\[n\]:=a;
  end else begin
    lc:=n shl 1;
    rc:=lc+1;
    m:=(l+r)shr 1;
    if ch\[n\]>1 then begin
      ch\[lc\]:=ch\[n\];
      ch\[rc\]:=ch\[n\];
      ch\[n\]:=0;
    end else begin
      ch\[lc\]:=ch\[lc\]xor ch\[n\];
      ch\[rc\]:=ch\[rc\]xor ch\[n\];
      ch\[n\]:=0;
    end;
    if st\[n\]<>-1 then begin
      st\[lc\]:=st\[n\];
      st\[rc\]:=st\[n\];
      st\[n\]:=-1;
    end;
    if y<=m then begin
      cover(lc,l,m,x,y,a)
    end else begin
      if x>m then begin
        cover(rc,m+1,r,x,y,a)
      end else begin
        cover(lc,l,m,x,m,a);
        cover(rc,m+1,r,m+1,y,a);
      end;
    end;
  end;
end;

procedure change(n,l,r,x,y:longint);var lc,rc,m:longint;begin
  m:=(l+r)shr 1;
  lc:=n shl 1;
  rc:=lc+1;
  if ch\[n\]>1 then begin
    if r-l>0 then begin
      ch\[lc\]:=2;
      ch\[rc\]:=2;
    end;
    ch\[n\]:=ch\[n\]and 1;
  end;
  if(x=l)and(y=r)then begin
    ch\[n\]:=ch\[n\]xor 1;
  end else begin
    if y<=m then begin
      change(lc,l,m,x,y)
    end else begin
      if x>m then begin
        change(rc,m+1,r,x,y)
      end else begin
        change(lc,l,m,x,m);
        change(rc,m+1,r,m+1,y);
      end;
    end;
  end;
end;

procedure ana(n,l,r,a,ch1:longint);var lc,rc,m:longint;begin//统计，还原01数组(sol数组)
  if(a=-1)and(st\[n\]>=0)then
    a:=st\[n\];
  if ch1<2 then
    ch1:=ch1 xor ch\[n\];
  if(l=r)then begin
    sol\[l\]:=(ch1 xor a)and 1;
  end else begin
    lc:=n shl 1;
    rc:=lc+1;
    m:=(l+r)shr 1;
    ana(lc,l,m,a,ch1);
    ana(rc,m+1,r,a,ch1);
  end;
end;

procedure re;begin//每一步的读入
  read(op);
  readln(s);
  for i:=1 to length(st)do
    if s\[i\]=',' then break;
  l:=code(copy(s,2,i-2));
  r:=code(copy(s,i+1,length(st)));
end;

procedure work;begin//核心工作程序
  case op of
    'U':begin
      if l<=r then
        cover(1,0,maxn,l,r,1);
    end;
    'I':begin
      if l>0 then
        cover(1,0,maxn,0,l-1,0);
      if r0 then
        cover(1,0,maxn,0,l-1,0);
      if r