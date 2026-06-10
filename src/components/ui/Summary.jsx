/**
 * 요약 카드 (총거래건수/승인건수/취소건수 ...)
 * items: [{ k, v }]  cols: 2|3
 */
export function SummaryGrid({ items, cols = 3 }) {
  return (
    <div className={`summary-grid cols-${cols}`}>
      {items.map((it, i) => (
        <div className="summary-cell" key={i}>
          <div className="k">{it.k}</div>
          <div className="v">{it.v}</div>
        </div>
      ))}
    </div>
  )
}

/** 가로형 요약 (거절건수 원/달러/엔화 0/0/0) */
export function MiniSummary({ items }) {
  return (
    <div className="mini-summary">
      {items.map((it, i) => (
        <div className="ms" key={i}>
          <div className="k">{it.k}</div>
          <div className="v">{it.v}</div>
        </div>
      ))}
    </div>
  )
}
