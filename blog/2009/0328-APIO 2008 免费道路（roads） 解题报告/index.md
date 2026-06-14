---
title: "APIO 2008 免费道路（roads） 解题报告"
date: 2009-03-28T20:07:35+08:00
categories: ["逆水行舟"]
source: https://sinyalee.com/blog/?p=431
---
题目与数据移步APIO官方网站：[http://www.apio.olympiad.org/](http://www.apio.olympiad.org/)

首先我们看到这道题，便有一个巨大的发现！

按照洁癖勇哥所说的就是：鹅卵石路和水泥路是同等地位的！要拿k个鹅卵石路来生成1棵树，便是要拿n-1-k个水泥路来生成一棵树。

这个发现有什么用呢？

\==

\==

\==

\==

基本没用 = =|||

有时候做数学题，同等地位的东西还要用一个什么“主元法”之类的东西，还有什么偏导数……我的解法是要让它地位不均等的，不妨就按照取k个鹅卵石路的思路来做。

首先我们发现有一些鹅卵石路时必须要维护的。就是某些区块不走鹅卵石路无法通过。就是先假设所有水泥路都维护，然后便连成一些不相交集（并查集）。这些集之间就要必定要用到鹅卵石路来连接。这些鹅卵石路就必须要维护。如果必要的鹅卵石路超过k，那么就无解，否则肯定有解。

然后清空不相交集。再用必须维护的鹅卵石路去更新不相交集，如果鹅卵石路不足k，那么剩下的鹅卵石路任取（只要不形成环）。然后再取n-1-k个石子路，只要不形成环就可。

我的程序：

/\*  
ID: sinya1  
PROG: roads  
LANG: C++  
\*/

#include <iostream>

#define maxn 200001  
#define maxm 1000000

using namespace std;

int n,m,k,cobh=0,conh=0,solh=0;  
int cob1\[maxm\],cob2\[maxm\],con1\[maxm\],con2\[maxm\];  
int sol1\[maxn\],sol2\[maxn\],sol3\[maxn\];  
int r\[maxn\];

void init() {   
  scanf(“%d%d%d”,&n,&m,&k);  
  int a,b,c;  
  for (int i=0;i<m;i++) {  
    scanf(“%d%d%d”,&a,&b,&c);  
    if (c) {  
      con1\[conh\]=a;  
      con2\[conh++\]=b;  
    }  
    else {  
      cob1\[cobh\]=a;  
      cob2\[cobh++\]=b;  
    }  
  }  
}

int get(const int x) {  
  if (r\[x\]<0) return x;  
  return r\[x\]=get(r\[x\]);  
}

void un(int x,int y) {  
  x=get(x);y=get(y);  
  if (x==y) return;  
  if (r\[x\]<r\[y\]) r\[y\]=x;  
  else {  
    if (r\[y\]<r\[x\]) r\[x\]=y;  
    else {  
      r\[x\]=y;  
      r\[y\]–;  
    }  
  }  
}

bool work() {  
  memset(r,255,sizeof(r));  
  for (int i=0;i<conh;i++) un(con1\[i\],con2\[i\]);  
  for (int i=0;solh<k&&i<cobh;i++)  
    if (get(cob1\[i\])!=get(cob2\[i\])) {  
      un(cob1\[i\],cob2\[i\]);  
      sol1\[solh\]=cob1\[i\];  
      sol2\[solh\]=cob2\[i\];  
      sol3\[solh++\]=0;  
    }  
  memset(r,255,sizeof(r));  
  for (int i=0;i<solh;i++) un(sol1\[i\],sol2\[i\]);  
  for (int i=0;i<cobh && solh<k;i++)  
    if (get(cob1\[i\])!=get(cob2\[i\])) {  
      un(cob1\[i\],cob2\[i\]);  
      sol1\[solh\]=cob1\[i\];  
      sol2\[solh\]=cob2\[i\];  
      sol3\[solh++\]=0;  
    }  
  if (solh<k) return 0;  
  for (int i=0;i<conh;i++)  
    if (get(con1\[i\])!=get(con2\[i\])) {  
      un(con1\[i\],con2\[i\]);  
      sol1\[solh\]=con1\[i\];  
      sol2\[solh\]=con2\[i\];  
      sol3\[solh++\]=1;  
    }  
  if (solh<n-1) return 0;  
  else return 1;  
}

void output() {  
  for (int i=0;i<n-1;i++)  
    printf(“%d %d %d\\n”,sol1\[i\],sol2\[i\],sol3\[i\]);  
}

int main() {   
  freopen(“roads.in”,”r”,stdin);  
  freopen(“roads.sol”,”w”,stdout);

  init();  
  if (work()) output();  
  else printf(“no solution\\n”);  
  return 0;  
}