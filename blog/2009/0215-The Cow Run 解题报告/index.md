---
title: "The Cow Run 解题报告"
date: 2009-02-15T15:13:49+08:00
categories: ["逆水行舟"]
source: https://sinyalee.com/blog/?p=362
---
### 题目描述

Problem cowrun: The Cow Run \[Chris Tzamos, 2006\]

The N (1 <= N <= 1,000) cows have escaped from the farm and have  
gone on a rampage. Each minute a cow is outside the fence, she  
causes one dollar worth of damage. Farmer John must visit each one  
to install a halter that will calm the cow and stop the damage.

Happily, the cows are positioned in a straight line on a road outside  
the farm. FJ can see each of them and knows every cow i’s unique  
coordinates (-500,000 <= P\_i <= 500,000, P\_i != 0) relative to the  
gate (position 0) where FJ starts.

FJ moves at one unit of distance per minute and can install a halter  
instantly. Determine the order that FJ should visit the cows so he  
can minimize the total cost of the damage; report the minimum total  
damage.

PROBLEM NAME: cowrun

INPUT FORMAT:

\* Line 1: A single integer: N

\* Lines 2..N+1: Line i+1 contains a single integer: P\_i

SAMPLE INPUT (file cowrun.in):

4  
\-2  
\-12  
3  
7

INPUT DETAILS:

Four cows placed in positions: -2, -12, 3, and 7.

OUTPUT FORMAT:

\* Line 1: The minimum total cost of the damage.

SAMPLE OUTPUT (file cowrun.out):

50

OUTPUT DETAILS:

The optimal visit order is -2, 3, 7, -12. FJ arrives at position  
\-2 in 2 minutes for a total of 2 dollars in damage for that cow.

He then travels to position 3 (distance: 5) where the cumulative  
damage is  2 + 5 = 7 dollars for that cow.

He spends 4 more minutes to get to 7 at a cost of 7 + 4 = 11 dollars  
for that cow.

Finally, he spends 19 minutes to go to -12 with a cost of 11 + 19  
\= 30 dollars.

The total damage is 2 + 7 + 11 + 30 = 50 dollars.

### 解题思路

这道有点像剑之修炼，就是让奶牛冷静不用时间。FJ所到之处就是奶牛安静之处。

由于FJ最初在原点，只能左右做往返运动（一称**活塞运动**）。所以奶牛安静的区域就是一条包括原点的线段。

所以设计状态dp\[i\]\[j\]\[k\]。其中i表示FJ在负半轴安慰了i之牛，j表示FJ在正半轴安慰的牛数。k=0表示FJ最终位置在最左边的冷静的牛，k=1表示FJ最终在最右边的冷静的牛。

这样子就易得状态转移方程：

dp\[i\]\[j\]\[0\] = min( dp\[i-1\]\[j\]\[0\] + (n-i-j+1) \* (a1\[i-1\]-a1\[i\]) , dp\[i-1\]\[j\]\[1\] + (n-i-j+1) \* (a2\[j\]-a1\[i\]) )

dp\[i\]\[j\]\[1\] = min( dp\[i\]\[j-1\]\[0\] + (n-i-j+1) \* (a2\[j\]-a1\[i\]) , dp\[i\]\[j-1\]\[1\] + (n-i-j+1) \* (a2\[j\]-a2\[j-1\]) )

边界条件就是 i=0 或 j=0 的时候，这个时候的值是显然的。

### 我的程序

这个似乎是我第二个非纯水题的C++程序。C++真是简洁美丽啊，但是如果编程习惯不好的话C++便会变得比PASCAL猥琐100倍。

/\*
ID: sinya1
PROG: cowrun
LANG: C++
\*/

# include <iostream>
using namespace std;

const int maxn=1001;
int i,j,n,n1/\*FJ左边的牛数\*/,n2/\*FJ右边的牛数\*/;
int t\[maxn\]/\*原始数据\*/,a1\[maxn\]/\*FJ左边的牛\*/,a2\[maxn\]/\*FJ右边的牛\*/;
int dp\[maxn\]\[maxn\]\[2\];

void qsort(const int x,const int y){
  int i=x,j=y,sign=t\[(x+y)>>1\];
  do{
    while (t\[i\]<sign) i++;
    while (t\[j\]>sign) j--;
    if (i<=j) swap(t\[i++\],t\[j--\]);
  }while (i<=j);
  if (x<j) qsort(x,j);
  if (i<y) qsort(i,y);
}

void init(){
  scanf("%d",&n);
  for (i=0;i<n;i++) scanf("%d",&t\[i\]);
  qsort(0,n-1);

  a1\[0\]=0;n1=1;
  for (i=0;i<n&&t\[i\]<0;i++) a1\[n1++\]=t\[i\];
  for (i=1;i<=n1>>1;i++) swap(a1\[i\],a1\[n1-i\]);
  a2\[0\]=0;n2=1;
  for (i=n1-1;i<n;i++) a2\[n2++\]=t\[i\];
}

void work(){
  dp\[0\]\[0\]\[0\]=dp\[0\]\[0\]\[1\]=0;
  for (j=1;j<n2;j++) {
    dp\[0\]\[j\]\[1\]=dp\[0\]\[j-1\]\[1\]+(n-j+1)\*(a2\[j\]-a2\[j-1\]);
    dp\[0\]\[j\]\[0\]=dp\[0\]\[j\]\[1\]+(n-j)\*(a2\[j\]);
  }
  for (i=1;i<n1;i++) {
    dp\[i\]\[0\]\[0\]=dp\[i-1\]\[0\]\[0\]+(n-i+1)\*(a1\[i-1\]-a1\[i\]);
    dp\[i\]\[0\]\[1\]=dp\[i\]\[0\]\[0\]+(n-i)\*(-a1\[i\]);
    for (j=1;j<n2;j++){
      dp\[i\]\[j\]\[0\]=min(
        dp\[i-1\]\[j\]\[0\]+(n-i-j+1)\*(a1\[i-1\]-a1\[i\]),
        dp\[i-1\]\[j\]\[1\]+(n-i-j+1)\*(a2\[j\]-a1\[i\])
      );
      dp\[i\]\[j\]\[1\]=min(
        dp\[i\]\[j-1\]\[0\]+(n-i-j+1)\*(a2\[j\]-a1\[i\]),
        dp\[i\]\[j-1\]\[1\]+(n-i-j+1)\*(a2\[j\]-a2\[j-1\])
      );
    }
  }
  printf("%d\\n",min(dp\[n1-1\]\[n2-1\]\[0\],dp\[n1-1\]\[n2-1\]\[1\]));
}

int main(){
  freopen("cowrun.in","r",stdin);
  freopen("cowrun.out","w",stdout);

  init();
  work();
  return 0;
}