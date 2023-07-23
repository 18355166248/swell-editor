## 个人信息

- 姓名：江浪
- 电话：17621399871
- 微信：jl643546122
- Email：643546122@qq.com
- Blog: [SMegalo](https://18355166248.github.io/)
- Github: [SMegalo · GitHub](https://github.com/18355166248)

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

| 表头 | 表哦图 1 |
| ---- | -------- |
| 6    | 7        |
