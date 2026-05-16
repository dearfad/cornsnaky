<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="2">
        <!-- <PuzzleInfoCard /> -->
      </v-col>
      <!-- <v-col v-if="stateStore.groupStartTime ? true : false" cols="12" md="9"> -->
      <v-col cols="12" md="8">
        <!-- <PuzzleSelector />
        <PuzzleContent /> -->
        <MarkdownRender :content="md" />
      </v-col>
      <v-col cols="12" md="2">
        <!-- <PuzzleInfoCard /> -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
// definePageMeta({
//   // middleware: ["auth", "group", "temp"],
//   middleware: ["auth", "group"],
// });
// const stateStore = useStateStore();
import MarkdownRender from "markstream-vue";
const md = `
# 谜题

---

## 1. 曹晟康之路

![曹晟康之路](/documents/Puzzle_1/puzzle_1.png)

<details>
<summary>提示1：这是什么纸笔谜题？</summary>
这是纸笔谜题 moon or sun 的轻微变种。
</details>


<details>
<summary>提示2：我已经解开了题面，能提示我怎么得到下一步应该做的事吗？</summary>
搜索曹晟康，他有一个特点，这个特点可以与路连接起来，得到你所要的。
</details>

<details>
<summary>提示3：我已经解开了题面，请告诉我应该干什么。</summary>
你解得的是一条路径，你需要在这条路上铺上盲道。
</details>

<details>
<summary>提示4：我已经铺好了道路，现在我应该干什么？</summary>
观察你所铺的路，他与某种古典密码有无比密切的联系。
</details>


<details>
<summary>答案</summary>
plains
</details>

---

## 2. 谜途

[谜途](/documents/Puzzle_2/puzzle_2.zip)

<details>
<summary>提示1：我毫无头绪</summary>
去里面探索吧，提示都在里面
</details>

<details>
<summary>提示2</summary>
这是键盘的一部分，你需要把对应位置的字母换成数字。
</details>

<details>
<summary>提示3</summary>
你需要把路径划为3步一组。
</details>

<details>
<summary>提示4</summary>
你需要把数字当成4进制去看待。
</details>

<details>
<summary>提示5：我得到了一些提示，我应该怎么把它们联系起来？</summary>
画一张地图，然后利用你的移动键重新走一遍路。
</details>


<details>
<summary>答案</summary>
scale
</details>

---

## 3. 神秘转化

![神秘转化](/documents/Puzzle_3/puzzle_3.png)

<details>
<summary>提示1：这些是什么意思？词的词性怎么不对？</summary>
你需要把左边的单词变形成右边的单词，变形方法是“错误”的，即将本应用在其他单词上的方法用在了左边的单词上，但是变形前后的单词都是存在的。
</details>

<details>
<summary>提示2：请告诉我第一行所对应的。</summary>
face
</details>

<details>
<summary>提示3：请告诉我第二行所对应的。</summary>
sheet
</details>

<details>
<summary>提示4：请告诉我第三行所对应的。</summary>
illustrate
</details>

<details>
<summary>提示5：请告诉我第四行所对应的。</summary>
axial
</details>

<details>
<summary>提示6：请告诉我第五行所对应的。</summary>
tel
</details>

<details>
<summary>提示7：请告诉我第六行所对应的。</summary>
apply
</details>

<details>
<summary>提示8：请告诉我第七行所对应的。</summary>
sumption
</details>

<details>
<summary>提示9：请告诉我第八行所对应的。</summary>
pic和epic
</details>


<details>
<summary>答案</summary>
celltype
</details>

---

## 4. 夜观星車

- “那值相等之直线上的星車散发光芒，同色而交辉为初之星；星之色彩映照周围八方，而诞生次之星。初次不容，而初等先至。仰望天空的生灵啊，虽仅目及次等之天体，仍可触及天空的光芒：那邻则不同色的星車，排列天中。”

![夜观星車](/documents/Puzzle_4/puzzle_4.jpg)

<details>
<summary>提示1：提示1：请按顺序提取以下序列的个数。</summary>
蓝绿红 绿红绿 红绿蓝 蓝红绿 红蓝绿 红绿红
</details>

<details>
<summary>提示2：第一步该怎么做？</summary>
你需要按照左下角及右上角的单位长度绘制出网格，星星均落于网格交点处。
</details>

<details>
<summary>提示3：什么是值相等直线？</summary>
就是“副对角线”，坐标系中的y=x
</details>

<details>
<summary>提示4：怎么理解星之色彩？</summary>
初之星散发与自身同色的光芒到周围8格，这种光芒混合成次之星。
</details>

<details>
<summary>提示5：怎么理解星車交辉？</summary>
这是初之星形成的方式，同色的星車发出横竖两条光的交点构成一颗初之星。
</details>

<details>
<summary>提示6：我理解怎样构成次之星了，但是不是有点奇怪？</summary>
这些天体并不是所有的次之星。
</details>


<details>
<summary>答案</summary>
accede
</details>

---

## 5. 阳阴两隔

- “有的人死了，他还活着”

![阳阴两隔](/documents/Puzzle_5/puzzle_5.png)

<details>
<summary>答案</summary>
memorial

</details>

---

## 6. 走亲戚

![走亲戚](/documents/Puzzle_6/puzzle_6.png)

<details>
<summary>答案</summary>
diverse

</details>

---

## 7. 蛇梯棋

[蛇梯棋](/documents/Puzzle_7/puzzle_7.7z)

<details>
<summary>答案</summary>
testify

</details>

---

## 8. 惜·时

[惜·时](/documents/Puzzle_8/puzzle_8.7z)

<details>
<summary>答案</summary>
forever

</details>

---

## 9. 完美

- （2-4-7-13-17-20）

![完美](/documents/Puzzle_9/puzzle_9.jpg)

<details>
<summary>答案</summary>
unique

</details>

---

## 10. 成长

![成长](/documents/Puzzle_10/puzzle_10.png)

<details>
<summary>答案</summary>
infer

</details>

---

## 11. 你是什么色？你是什么火？

- 蛇蛇和谜龙来到东部一片三角洲，看到这样一块牌子

![你是什么色？你是什么火？](/documents/Puzzle_11/puzzle_11.png)

<details>
<summary>答案</summary>
calite

</details>

---

## 12. 汉字听写大会

[汉字听写大会_1](/documents/Puzzle_12/puzzle_12_1.mp3)

[汉字听写大会_2](/documents/Puzzle_12/puzzle_12_2.mp3)

[汉字听写大会_3](/documents/Puzzle_12/puzzle_12_3.mp3)

[汉字听写大会_4](/documents/Puzzle_12/puzzle_12_4.mp3)


<details>
<summary>答案</summary>
咬文嚼字

</details>

`;
</script>
