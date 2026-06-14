---
title: "APIO 2007 动物园（Zoo） 解题报告"
date: 2009-03-28T20:02:36+08:00
categories: ["逆水行舟"]
source: https://sinyalee.com/blog/?p=428
---
题目与数据移步APIO官方网站：[http://www.apio.olympiad.org/](http://www.apio.olympiad.org/)

如果没有做过Naptime这道题目，那么这道题还是比较困难的，当年我想了Naptime想了很久。然而如果做了Naptime，这道题便变得异常简单！

因为每个孩子可以看到5只动物，所以对于每个位置，都与前面4个位置有关。所以DP的时候要4个位置4个位置地推移。然后又由于它是一个环，需要有一个先固定，在本题要固定4个位置。又因为每次DP，状态转移都要枚举这个位置要不要取，又要考虑这个位置的所有小孩子，所以时间复杂度是O( 2^9 \* (c+n) )，还是可以承受的。

这道题我用了位运算优化，把每个小孩子喜欢的和不喜欢的动物压成一个二进制数字。然后对每个位置就枚举从这个位置开始的5个笼子动物有没有被和谐掉，用5位数表示：for ( int i=0 ; i < 1<<5 ; i++) {…} 。然后这个位置的k>>1的状态可以由后面1个位置的k &0xf 来更新。

程序如下：

/\*  
ID: sinya1  
PROG: zoo  
LANG: C++  
\*/

#include <iostream>

#define maxn 10000  
#define maxc 50000

using namespace std;

int n,c,i,j,k,l,f,x,y,sol,temp,temp1;  
int e\[maxc\],fear\[maxc\],love\[maxc\];  
int be\[maxn+1\];  
int dp\[2\]\[16\];

void init() {  
  scanf(“%d%d”,&n,&c);  
  for (i=0;i<c;i++) {  
    scanf(“%d”,&e\[i\]);  
    fear\[i\]=love\[i\]=0;  
    scanf(“%d%d”,&f,&l);  
    for (j=0;j<f;j++) {  
      scanf(“%d”,&k);  
      k=k-e\[i\];  
      if (k<0) k=k+n;  
      k=4-k;  
      fear\[i\]|=(1 << k);  
    }  
    for (j=0;j<l;j++) {  
      scanf(“%d”,&k);       
      k=k-e\[i\];  
      if (k<0) k=k+n;  
      k=4-k;  
      love\[i\]|=(1 << k);  
    }  
  }  
  be\[0\]=0;  
  for (i=1;i<=n;i++) {  
    be\[i\]=be\[i-1\];  
    while (be\[i\]<=c && e\[be\[i\]\]==i) be\[i\]++;  
  }  
}

void work() {  
  sol=0;  
  for (i=0;i<1<<4;i++) {  
    memset(dp\[0\],128,sizeof(dp\[0\]));  
    dp\[0\]\[i\]=0;  
    for (x=0,y=1,j=n;j>4;j–,swap(x,y)) {  
      memset(dp\[y\],128,sizeof(dp\[y\]));  
      for (k=0;k<1<<5;k++) {  
        temp1=dp\[x\]\[k&0xf\];  
        for (l=be\[j-1\];l<be\[j\];l++)  
          if ((love\[l\] & k)>0 || ((fear\[l\])&(k^fear\[l\]))>0)  
            temp1++;  
        dp\[y\]\[k>>1\]>?=temp1;  
      }  
    }  
    for (j=4;j>=1;j–,swap(x,y)) {  
      memset(dp\[y\],128,sizeof(dp\[y\]));  
      temp=(i>>(4-j))&1;  
      for (f=0;f<1<<4;f++) {  
        k=f|(temp<<4);  
        temp1=dp\[x\]\[k&0xf\];  
        for (l=be\[j-1\];l<be\[j\];l++)  
          if ((love\[l\] & k)>0 || ((fear\[l\])&(k^fear\[l\]))>0)  
            temp1++;  
        dp\[y\]\[k>>1\]>?=temp1;  
      }  
    }  
    for (j=0;j<1<<4;j++) sol>?=dp\[x\]\[j\];  
  }  
  printf(“%d\\n”,sol);  
}

int main() {  
  freopen(“zoo.in”,”r”,stdin);  
  freopen(“zoo.out”,”w”,stdout);  
  init();  
  work();  
  return 0;  
}