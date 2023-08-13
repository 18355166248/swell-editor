# MarkDown

# 列表

- 姓名：Swell
- 电话：17621399871
- 微信：jl643546122
- Email：643546122@qq.com
- Blog: [Swell](https://18355166248.github.io/)
- Github: [Swell · GitHub](https://github.com/18355166248)

I just love **bold text**.

> Dorothy followed her through many of the beautiful rooms in her castle.

# 自定义 React 组件

<Hello name="Swell" />

<Chart data={[3, 7, 2.5, 8.5, 12.5, 5.5, 8, 3.5, 0.5, 3.5, 8.5, 7]} color="yellowgreen"/>

<List title="头部标题">
  列表
</List>

## 分割线

---

---

---

## 图片

![这是图片](http://101.43.11.224:11000/images/2023-06-04/1685893055872-7-23021G64415.webp "Magic Gardens")

```jsx
function Chart({ data = [], color }) {
  return (
    <div className="snowfall">
      {data.map((d, i) => (
        <div
          key={i}
          className="snowfall-bar"
          style={{
            height: d * 20,
            backgroundColor: color,
          }}
        />
      ))}
    </div>
  )
}
```

## 表格

| 表头 | 表哦图 1 |
| ---- | -------- |
| 6    | 7        |

## 数学公式

$(x^2 + x^y )^{x^y}+ x_1^2= y_1 - y_2^{x_1-y_1^2}$

$\ frac{1-x}{y+1}$ 或 $x \over x+y$

$\sqrt[3]{4}$ 或 $\sqrt{9}$
