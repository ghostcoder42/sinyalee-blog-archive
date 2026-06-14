---
title: "Postal Vans解题报告(新)"
date: 2008-08-15T07:45:07+08:00
categories: ["作品展示"]
source: https://sinyalee.com/blog/?p=229
---
题目在这里

[https://docs.google.com/Doc?id=dhq9z66j\_2479hnsxhs](https://docs.google.com/Doc?id=dhq9z66j_2479hnsxhs)

解题报告和我的程序在这里

[https://docs.google.com/Doc?id=dhq9z66j\_1g8h4bzgq](https://docs.google.com/Doc?id=dhq9z66j_1g8h4bzgq)

直接放上来效果是差到一定程度，只能放到Google Docs上面去了。编辑的时候我本来还想用Star Office，可是用起来十分不爽，Microsoft Office 2007才是王道。它的公式编辑功能才是王道。

Update：上面那两个链接好像不太稳定（好像刷新几次就可以了）还是放到这里来吧：

## Analysis & Solution of Postal Vans

### Step 1: 初步认识：由路径到美妙的线条

题目要求的，是从西北角环游一圈回到西北角，然后经历所有点的路径，不同方向算的是两种路径！所以一种路径形状（即无向的路径）即对应2种路径！所以我们只要找到盖住所有点的线条的数目，再乘以2，就是路径数。如下。

![](https://docs.google.com/File?id=dhq9z66j_4cprccsft_b)

### Step2: 感性把握：有内凹的美妙的线条

易证每个点必连有2条边。所以角点2条边是跑不掉的。而边上的点连的三条边也有两条边属于路径。属于最后的形状！对于里面的点，则需要在外面有一些边凹进去覆盖他们。  

于是我们对路径的形状就有一个大体的把握，大概就是路径在网格的四周围一圈，  

然后中间有一些凹进网格的部分去覆盖里面的点。如下。

![](https://docs.google.com/File?id=dhq9z66j_5j8g626fn_b)![](https://docs.google.com/File?id=dhq9z66j_6gntptwcc_b)

![](https://docs.google.com/File?id=dhq9z66j_7dn62rkd7_b)![](https://docs.google.com/File?id=dhq9z66j_8g2dn7z59_b)

### Step3: 理性分析：不同的内凹，不同的美

亲爱的读者，你从上面的图看出了什么端倪了吗？  

很明显，向内凹有两大类：

第一类是左下角的图，就是内凹只包含第一行&第三行的格子。这样子内凹必定在每一列各自的第三行内凹，对应上面第一行也内凹（想一想，为什么？）

第二种是上面两幅图，就是凹到了第二行的格子，其中又分两小类：左上角的图是内凹的开口在上下，右上角的图是开口在左右的格子。这种内凹只能有一个开口，一个开口只能有1个格子宽（为什么？）。

右下角的图意思是说，各种类型的内凹可以一起出现！不同的美搭配，创造最诱人的美丽！像Linlin一样美！

### Step 4: 解题大方向：由左到右，慢慢深入

初看此题让人联想起Betsy’s Tour. 模型几乎一模一样。但是有一个质的区别，就是只有四横线！而竖线数目多得惊人。于是我们知道这不可能是指数及复杂度的题目，而是DP!!! 而DP关键就是利用它只有4横行的特点，从左到右，慢慢深入，直至顶到底为止！

### Step 5: 设计状态：有状态才能干

首先我们处理左边两幅图的状况，也就是开口在上下（无论有没有包含第二行的格子）的状况。

定义一个一维数组，d\[i\]表示i列**格子**中，以除了最左最右两列**格子**作为开口的内凹**恰好**（不多不少）覆盖这i列**格子**中间的i-1列**格点**的方法数。如下图是i=4的情况。

![](https://docs.google.com/File?id=dhq9z66j_9d5sh3sts_b)

下面是例子，最右边的是属于d\[4\]的方法，而左边两个不是。

![Frame1](https://docs.google.com/File?id=dhq9z66j_10xmhn6zhd_b) ![Frame2](https://docs.google.com/File?id=dhq9z66j_113jhvzcc8_b) ![Frame3](https://docs.google.com/File?id=dhq9z66j_12dgg42zg2_b)

### Step 6: 转移方程：状态向高潮挺进！

假如这i列**格子**，倒数第2列像这样子，这样的的方案数就是剩下i-2列的方法数。也就是d\[i-2\]

![](https://docs.google.com/File?id=dhq9z66j_28gd5dd7f7_b)

假如倒数第二列第二行被凹陷包含（如下）。那么这个凹陷横贯的列数可能从1到i-2. 当它横贯的列数为j时，这个凹陷的开口就有2j种可能（有j列，而这个凹陷可能在上下开口）。而剩下区域覆盖数便是d\[i-j-1\]

![](https://docs.google.com/File?id=dhq9z66j_13d5msw3g6_b)

这样子状态转移方程便是：

![](https://docs.google.com/File?id=dhq9z66j_14f9t3b9fd_b)

然后临界条件是d\[1\]=1; d\[2\]=0; （想一想，为什么？）

### Step 7: 最终答案：青由蓝中出，而又胜于蓝

得到d数组后，离最后的答案还有一定距离！因为这只是凹陷的开口在上下的情况，我们还要考虑凹陷在左右的情况。我们容易知道凹陷在左右，只可能是一根在第二行直接插入的情况，如左下图。不可能有分叉，因为那样就会变成两条线，如右下图。

![](https://docs.google.com/File?id=dhq9z66j_15drds4chj_b)![](https://docs.google.com/File?id=dhq9z66j_16g5tgnjfn_b)

所以我们枚举左边插入深度和右边插入深度。剩下的地方便要有上下开口的凹陷填补。当左边插入深度为u，右边插入深度为v时，方案数便是d\[n-i-j-1\]。所以r的值就是：

![](https://docs.google.com/File?id=dhq9z66j_17cv43wngv_b)

直接计算这个式子要O(n2)的复杂度，但是这个式子可以化简：每个d\[i\]被累加的次数是n-i次。于是r的表达式又可以写为：

![](https://docs.google.com/File?id=dhq9z66j_18hjz2swfz_b)

这样子对r的运算便下降到O(n)的复杂度。

### Frustration 1: 方程太早设出来不一定就好

就这样子按照这个方程设计了第一个版本的DP。发现到后面超过longword的范围了。

我的高精度一直是我的弱项，所以在这里又卡了我很久。（可能与我还心猿意马地想去看奥运会的比赛有关系吧）

### Frustration 2: 太早设不好，太慢也不好

接下来我就收到迎头棒喝：

![](https://docs.google.com/File?id=dhq9z66j_19ccw8nnhg_b)

### Step 7: 相信自己，总有雄起的那一天！

当时我和吴宏聊天，下面是记录：

> 2008/8/13
> 
> Sinya 13:10:02
> 
> 琳琳得冠军
> 
> 吴宏 13:10:05
> 
> 怎么了
> 
> Sinya 13:10:15
> 
> 自卑lo
> 
> 吴宏 13:10:24
> 
> 那你就明年拿noi金牌啊
> 
> 吴宏 13:11:23
> 
> 如果有省队的话 应该有吧
> 
> I think 省队＝NOI金牌
> 
> Sinya 13:11:53
> 
> IOI吧
> 
> Sinya 13:12:08
> 
> 奥运会不是全运会
> 
> 吴宏 13:12:16
> 
> 瓦
> 
> Sinya 13:15:35
> 
> 我们是井底之蛙
> 
> 吴宏 13:16:01
> 
> 我还没出过汕头
> 
> 你还没出过广东![](https://docs.google.com/File?id=dhq9z66j_20fq8d2ggj_b)
> 
> Sinya 13:17:17
> 
> 可怜的吴宏，明年一鸣惊人！！！
> 
> 吴宏 13:18:49
> 
> ![](https://docs.google.com/File?id=dhq9z66j_21cfg725fs_b)争取可以哈哈
> 
> Sinya 13:19:26
> 
> 我一年以来受到的打击太多了
> 
> 吴宏 13:19:57
> 
> 但是
> 
> 在别人眼里
> 
> 你还是很强
> 
> Sinya 13:20:32
> 
> 谁的眼里……
> 
> 吴宏 13:20:38
> 
> 而我
> 
> 整个高一
> 
> 太不堪了
> 
> 算了 高一都过了
> 
> 吴宏 13:21:51
> 
> eg. 在jz很多人眼里
> 
> 新野同学是有点传奇色彩的人物
> 
> 吴宏 13:22:54
> 
> 不过
> 
> 可能有些东西别人不理解
> 
> 这个就不知道了
> 
> Sinya 13:24:17
> 
> 传奇色彩……
> 
> 为什么
> 
> 吴宏 13:24:58
> 
> 读书很劲
> 
> 又会各种竞赛
> 
> Sinya 13:25:47
> 
> ![](https://docs.google.com/File?id=dhq9z66j_22g8pfv2dn_b)可是这种人很多
> 
> 吴宏 13:26:53
> 
> 那你觉得失败在哪里呢
> 
> 吴宏 13:27:06
> 
> 应该说打击
> 
> Sinya 13:27:58
> 
> 算是吧
> 
> Sinya 13:28:11
> 
> 可能初三太顺了
> 
> 吴宏 13:29:42
> 
> 初三我过得很好
> 
> 高一
> 
> 我很失望
> 
> Sinya 13:30:13
> 
> ![](https://docs.google.com/File?id=dhq9z66j_19ccw8nnhg_b)
> 
> Sinya 13:30:16
> 
> 失望
> 
> 吴宏 13:31:16
> 
> 何必为这个呢
> 
> 当你ac这道题之后
> 
> 你就会发现 现在的失望没必要
> 
> Sinya 13:31:38
> 
> 我usaco剩2道了
> 
> 吴宏 13:31:51
> 
> 而且 早晚会ac的 就像前100多道一样
> 
> Sinya 13:31:51
> 
> 这道vans很少人能自己做过去
> 
> Sinya 13:31:54
> 
> 是的！
> 
> Sinya 13:32:03
> 
> 等我ac了再聊
> 
> 吴宏 13:32:07
> 
> ok
> 
> Sinya 13:33:02
> 
> 如果比赛我肯定打表，我表是打得出来的
> 
> Sinya 13:34:42
> 
> 1000是极端数据了
> 
> Sinya 13:35:42
> 
> 我想到怎么把我的方法降到O(n)
> 
> Sinya 13:36:52
> 
> 不聊了，我努力
> 
> 吴宏 13:37:02
> 
> 好
> 
> 吴宏 13:37:04
> 
> 88  

### Step 8: 仔细分析，让时间函数挺直，不再弯曲

分析一下超时的原因：对r的运算已经降到O(n)的时间复杂度，超时主要是因为对d数组的计算。每次算d\[i\]都要枚举j，复杂度是O(n2)，时间随n变化的函数是弯曲，往上翘的。

但是我估计里面一定有重复运算，所以就研究一下d\[i\]的表达式：

![](https://docs.google.com/File?id=dhq9z66j_14f9t3b9fd_b)

上面那一坨显然无法让人认清楚问题的本质，突然我想起了我们数学竞赛班的樊彪老师的名言，其实是中国数学竞赛的老前辈单樽老师的名言：**从简单的做起！**

d\[1\]=1;

d\[2\]=0;

d\[3\]=d\[1\]+d\[1\]\*2;

d\[4\]=d\[2\]+d\[1\]\*4+d\[2\]\*2;

d\[5\]=d\[3\]+d\[1\]\*6+d\[2\]\*4+d\[3\]\*2

……

同学们，你们看出端倪了吗？从d\[3\]开始，d\[i\]便是d\[i-2\]加上一个金字塔型的东西。我们用temp2来表示这个东西。i每次加一，那坨东西地下就都加上一层：d\[1\]\*2+d\[2\]\*2+…+d\[i-1\]\*2. 我们用temp1表示下面这一层。

首先我们把temp1和temp2清零。然后从3到n-1每次算d\[i\]的时候，都让temp1=temp1+d\[i-2\]; 就是让下面哪一层变长，然后是temp2=temp2+temp1，就是让那一坨东西在下面多加一层。

于是我们每次算d\[i\]只需O(1)的复杂度，所以算整个d数组降为O(n)的复杂度，整个程序的复杂度也为O(n)了。时间关于n的函数变为一条直线，挺直，不弯曲！

### My Program

{  
ID: Sinya1  
PROG: vans  
LANG: PASCAL  
}  
  
//For Linlin and Junde Huang      //指的是琳琳和黄俊德。  
  
const  
  pn=’vans’;  
  
type  
  bignumber=array\[0..500\]of word;  
  
var  
  r:bignumber;  
  temp1,temp2:bignumber;  
  d:array\[0..1000\]of bignumber;  
  i,j,n:longint;  
  
function plus(x:bignumber;y:bignumber):bignumber;//高精度加法  
var  
  i:longint;  
begin  
  for i:=1 to y\[0\]do begin  
    inc(x\[i\],y\[i\]);  
    if x\[i\]>9 then begin  
      dec(x\[i\],10);  
      inc(x\[i+1\])  
    end;  
  end;  
  if y\[0\]>x\[0\]then x\[0\]:=y\[0\];  
  if x\[x\[0\]+1\]>0 then  
    inc(x\[0\]);  
  exit(x);  
end;  
  
function multiply(x:bignumber;y:longint):bignumber;//高精度乘单精度  
var  
  carry,i:longint;  
begin  
  if y=0 then begin  
    fillchar(x,sizeof(x),0);  
    x\[0\]:=1;  
    exit(x);  
  end;  
  carry:=0;  
  for i:=1 to x\[0\]do begin  
    x\[i\]:=x\[i\]\*y+carry;  
    if x\[i\]>9 then begin  
      carry:=x\[i\]div 10;  
      x\[i\]:=x\[i\]mod 10;  
    end else begin  
      carry:=0;  
    end;  
  end;  
  x\[x\[0\]+1\]:=carry;  
  while x\[x\[0\]+1\]>0 do begin  
    inc(x\[0\]);  
    if x\[x\[0\]\]>9 then begin  
      inc(x\[x\[0\]+1\],x\[x\[0\]\]div 10);  
      x\[x\[0\]\]:=x\[x\[0\]\]mod 10;  
    end;  
  end;  
  exit(x);  
end;  
  
begin  
  assign(input,pn+’.in’);reset(input);  
  assign(output,pn+’.out’);rewrite(output);  
  
  readln(n);  
  
  fillchar(d,sizeof(d),0);  
  d\[1\]\[0\]:=1;  
  d\[1\]\[1\]:=1;  
  d\[2\]\[0\]:=1;  
  fillchar(temp1,sizeof(temp1),0);  
  fillchar(temp2,sizeof(temp2),0);  
  temp1\[0\]:=1;  
  temp2\[0\]:=1;  
  
  for i:=3 to n-1 do begin  
    temp1:=plus(temp1,multiply(d\[i-2\],2));  
    temp2:=plus(temp2,temp1);  
    d\[i\]:=plus(temp2,d\[i-2\]);  
  end;  
  
  fillchar(r,sizeof(r),0);  
  for i:=1 to n-1 do begin  
    r:=plus(r,multiply(d\[i\],n-i));  
  end;  
  
  r:=multiply(r,2);  
  
  for i:=r\[0\]downto 1 do  
    write(r\[i\]);  
  if r\[0\]=0 then write(0);  
  writeln;  
  
  close(input);  
  close(output);  
end.  

### About The Problem: 不同的外形，同样的感觉

我ac之后看了一下Analysis，发现它的解释和我的相异，但是写出来的方程是类似的，本质是相同的。这让我想起了勾股定理的n种证明。所谓条条道路通罗马是也

### About Training: 自己做比看别人做爽

我们看到一道题有两种选择，自己做，还有就是看题解再做。这两种方法截然不同。樊彪老师说过，题的数量是有限的，一道题看了题解，我们就失去了一次训练自己思维能力的机会。USACO就那么一百道题，每一道都是精华，每一道都应该仔细思考。这道题我自己想出来，收获肯定比某些人到处找题解多。

### About Solving Problems: CCTV

这个CCTV指的不是电视上那个恶心的CCTV。而是Calmness, Confidence, Thoughts & Vision.

### 最后借用CCTV的一句话，OI, 很黄，很暴力！！！