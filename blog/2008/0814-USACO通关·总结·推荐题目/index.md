---
title: "USACO通关·总结·推荐题目"
date: 2008-08-14T12:16:42+08:00
categories: ["逆水行舟"]
source: https://sinyalee.com/blog/?p=227
---
从美国西部时间2008年2月13日Your Ride Is Here，到2008年8月13日A Rectangle Barn，陪伴我半年的[USACO](http://www.usaco.org/)终于通关了。虽然接触USACO之前，几乎所有USACO介绍的算法我都了解，但是踏踏实实把USACO做下来以后，感觉就是不一样——有了题量的积累，感觉整个人底气足了不少。

这半年来，断断续续，并没有一直在刷。有一段去玩创造节，有时候去玩课内，有时候去玩物理竞赛&数学竞赛。有时候玩女生……

总结几道比较有价值的题目吧，不一定是最难的，也不是类型题归纳，只是写一些比较新颖的和我觉得有价值的。（链接向USACO原页面）

[Checker Challenge](http://ace.delos.com/usacoprob2?a=VBnyOagFLbo&S=checker)（搜索题）

[Party Lamps](http://ace.delos.com/usacoprob2?a=VBnyOagFLbo&S=lamps)

[Cow Tours](http://ace.delos.com/usacoprob2?a=VBnyOagFLbo&S=cowtour)

[Shaping Regions](http://ace.delos.com/usacoprob2?a=VBnyOagFLbo&S=rect1)（矩形分割）

[Contact](http://ace.delos.com/usacoprob2?a=VBnyOagFLbo&S=contact)

[Shopping Offers](http://ace.delos.com/usacoprob2?a=VBnyOagFLbo&S=shopping)

[Camelot](http://ace.delos.com/usacoprob2?a=VBnyOagFLbo&S=camelot)（这道卡了我很久，我的很囧的标程贴在[这里](http://sinya.yo2.cn/camelot1)）

[Closed Fences](http://ace.delos.com/usacoprob2?a=VBnyOagFLbo&S=fence4) （计算几何，等我放题解，这道卡了我最久，可能跟当时经常玩别的东西也有关系。这道题判断谁档谁的算法好像网上还没有（所谓中点法是错的，在USACO改版后也无法通过），**等我放上来**）

[Fence Rails](http://ace.delos.com/usacoprob2?a=VBnyOagFLbo&S=fence8)（搜索+剪枝の最强题）

[Fence Loops](http://ace.delos.com/usacoprob2?a=VBnyOagFLbo&S=fence6)（这道题我有一种诡异的解法，**等我放到这里来**）

[Cryptcowgraphy](http://ace.delos.com/usacoprob2?a=VBnyOagFLbo&S=cryptcow)（搜索剪枝）

[Buy Low, Buy Lower](http://ace.delos.com/usacoprob2?a=VBnyOagFLbo&S=buylow)

[Starry Night](http://ace.delos.com/usacoprob2?a=VBnyOagFLbo&S=starry)（矩阵处理）

[Electric Fences](http://ace.delos.com/usacoprob2?a=VBnyOagFLbo&S=fence3)（题解说得很晓旭，什么模拟退火算法了……不过我用贪心过了，从中心点开始，每次看上下左右哪个方向最好，这跟那个从点坐标到距离和的映射是连续的也有关吧（连续函数……-\_-|||））

[Wisconsin Squares](http://ace.delos.com/usacoprob2?a=VBnyOagFLbo&S=wissqu)（看清本质，直接搜复杂度不高）

[Network of Schools](http://ace.delos.com/usacoprob2?a=VBnyOagFLbo&S=schlnet)（强联通分块，我没有知识储备，第一问用floyed，第二问想不出来，囧rz）

[All Latin Squares](http://ace.delos.com/usacoprob2?a=VBnyOagFLbo&S=latin)（Pólya计数法的搜索剪枝，我还没透彻理解。之前在学校借了一本《组合数学》，可惜那章硬是看不懂。这题抄了题解，现在正配合刚买《组合数学》，补这个东西）

[Character Recognition](http://ace.delos.com/usacoprob2?a=VBnyOagFLbo&S=charrec)

[Betsy’s Tour](http://ace.delos.com/usacoprob2?a=VBnyOagFLbo&S=betsy)（搜索剪枝，但是最强的做法是状态压缩动态规划，我还不会^\_^）

[TeleCowmunication](http://ace.delos.com/usacoprob2?a=VBnyOagFLbo&S=telecow)（最小割的题目，考验你的网络流速度，我用sap+邻接表用了0.05secs，与此类似的题目还有[Pollutant Control](http://ace.delos.com/usacoprob2?a=rLnwbfUPNub&S=milk6)，当时懒得去学基于层次图的增广路算法，更不要说预流推进，甚至用深搜找增广路。结果0.997 secs险过。但是当时做这道题让我明白了一个道理，就是fillchar语句比用for快很多。当时就是把一句for改成fillchar，让我的程序从1.004 secs下降到0.997secs    -\_-|||  囧rz     ）

[Picture](http://ace.delos.com/usacoprob2?a=VBnyOagFLbo&S=picture)（离散化+线段树，虽然我懒得加线段树 ^\_^）

[Hidden Passwords](http://ace.delos.com/usacoprob2?a=VBnyOagFLbo&S=hidden)（最小后缀算法，我之前不知那个算法，后来想到的算法跟那个类似，就是只计算有可能成为最优解的开头，这样子避免一些多余运算，可是后面有一些要重新开始运算，但复杂度都是O(n) ）

[Two Five](http://ace.delos.com/usacoprob2?a=VBnyOagFLbo&S=twofive)（记忆化搜索来着）

[Postal Vans](http://ace.delos.com/usacoprob2?a=VBnyOagFLbo&S=vans) （动态规划，我的想法与标程不同，但是写出来的动规方程一样！所谓条条大路通罗马是也。**我的题解在[这里](http://sinya.yo2.cn/postal-vans)**）

[A Rectangular Barn](http://ace.delos.com/usacoprob2?a=VBnyOagFLbo&S=rectbarn) （囧了，我的最后一道题，看了题解，总觉不太完美）

[Cow XOR](http://ace.delos.com/usacoprob2?a=VBnyOagFLbo&S=cowxor) （可以用类似最小后缀算法的方法做，但我用二叉搜索树硬是把复杂度下降到O(nlogm)）

要知道USACO的text都是精华，不能轻视，我都有认真的研究过。对它的text有点补充，就是凸包算法中，易证最下面最左边的点肯定是凸包点集中的点。把它当开始点就可以省去最后的修补工作了。

好像USACO还有contest的题目，真是舍不得Farmer John还有他的Cows. 不过我认为我应该进入NOIP备战阶段了，高二，没有退路了！先把历年NOIP的题目都过掉，还要准备初赛笔试，OMG。