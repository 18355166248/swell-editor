function List({ children, title }) {
  return (
    <div className="list-card">
      <div className="list-head">
        <div className="list-head-line"></div>
        <div className="list-head-line"></div>
      </div>
      <div className="list-title">{title}</div>
      <div>{children}</div>
    </div>
  )
}

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
        >
          <span>{i + 1}月</span>
        </div>
      ))}
    </div>
  )
}

export default {
  List,
  Chart,
}
