---
title: "[USACO解题报告]Sorting a Three-Valued Sequence (sort3)"
date: 2008-03-08T18:26:02+08:00
categories: ["作品展示", "逆水行舟"]
source: https://sinyalee.com/blog/?p=175
---
#### 原题

**Sorting a Three-Valued Sequence**  
**IOI’96 – Day 2**

Sorting is one of the most frequently performed computational tasks. Consider the special sorting problem in which the records to be sorted have at most _three_ different key values. This happens for instance when we sort medalists of a competition according to medal value, that is, gold medalists come first, followed by silver, and bronze medalists come last.

In this task the possible key values are the integers 1, 2 and 3. The required sorting order is non-decreasing. However, sorting has to be accomplished by a sequence of exchange operations. An exchange operation, defined by two position numbers p and q, exchanges the elements in positions p and q.

You are given a sequence of key values. Write a program that computes the minimal number of exchange operations that are necessary to make the sequence sorted.

##### PROGRAM NAME: sort3

##### INPUT FORMAT

Line 1:  
N (1 <= N <= 1000), the number of records to be sorted

Lines 2-N+1:  
A single integer from the set {1, 2, 3}

##### SAMPLE INPUT (file sort3.in)

9
2
2
1
3
3
3
2
3
1

##### OUTPUT FORMAT

A single line containing the number of exchanges required

##### SAMPLE OUTPUT (file sort3.out)

4

#### 懒得自己翻译了，从NOCOW上找翻译贴下来。（P.S. NOCOW这个名字起的还真好啊）

**三值的排序**  
**IOI’96 – Day 2**

译 by !Starliu

排序是一种很频繁的计算任务。现在考虑最多只有三值的排序问题。一个实际的例子是，当我们给某项竞赛的优胜者按金银铜牌序的时候。

在这个任务中可能的值只有三种1，2和3。我们用交换的方法把他排成升序的。

写一个程序计算出，给定的一个1,2,3组成的数字序列，排成升序所需的最少交换次数。

##### PROGRAM NAME: sort3

##### INPUT FORMAT

Line 1:

N (1 <= N <= 1000)

Lines 2-N+1:

每行一个数字，共N行。（1..3）

##### SAMPLE INPUT (file sort3.in)

9

2

2

1

3

3

3

2

3

1

##### OUTPUT FORMAT

共一行，一个数字。表示排成升序所需的最少交换次数。

##### SAMPLE OUTPUT (file sort3.out)

4

#### 我的题解：

这道题比[Castle](http://sinya.yo2.cn//?p=623795 "[USACO结题报告]Castle")还简单。首先统计出1，2，3出现次数，记为t\[1\],t\[2\]还有t\[3\]。

则排序后，前t\[1\]项是1，接下来t\[2\]项是2……

然后前t\[1\]项如果不是1，则要把后面的1换到前面来。如果是2，那么就尽量去换前面的1，3就尽量换后面的1。

后面的简单的吧2，和3换过来就好了。

程序：

{  
ID: Sinya1  
PROG: sort3  
LANG: PASCAL  
}

{WELCOME TO MY WEBSITE: [HTTP://SINYA.YO2.CN/}](http://sinya.yo2.cn/%7D)  
{I love my hometown, Swatow, China!!!!!}  
{Anyway,I Love You, Kekyang!!!!!}

Program sort3;

Var  
{}i,j,n,r:integer;  
{}a:array\[1..1000\]of byte;  
{}t:array\[1..3\]of integer;

Begin  
{}Assign(input, ‘sort3.in’); Reset(input);  
{}Assign(output, ‘sort3.out’); Rewrite(output);

{}fillchar(t,sizeof(t),0);  
{}r:=0;

{}readln(n);  
{}for i:=1 to n do begin  
{}{}readln(a\[i\]);  
{}{}inc(t\[a\[i\]\])  
{}end; {输入与统计}

{}j:=t\[1\];  
{}for i:=1 to t\[1\]do  
{}{}if a\[i\]=2 then begin  
{}{}{}inc(r);  
{}{}{}repeat  
{}{}{}{}inc(j);  
{}{}{}until a\[j\]=1;  
{}{}{}a\[i\]:=1;  
{}{}{}a\[j\]:=2;  
{}{}end; {交换1和2}

{}for i:=1 to t\[1\]do  
{}{}if a\[i\]=3 then begin  
{}{}{}inc(r);  
{}{}{}a\[i\]:=1;  
{}{}end;  
{}for i:=t\[1\]+1 to n do  
{}{}if a\[i\]=1then  
{}{}{}a\[i\]:=3; {交换1和3}

{}for i:=t\[1\]+1 to t\[1\]+t\[2\]do  
{}{}if a\[i\]=3 then  
{}{}{}inc(r); {统计交换2和3所需次数}

{}writeln(r);

{}Close(input);  
{}Close(output);  
End.