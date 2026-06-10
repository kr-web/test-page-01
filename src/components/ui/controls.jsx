import { useState } from 'react'

/** 날짜 범위 + 오늘/어제/1개월 칩 */
export function DateRange({ from = '2022-02-07', to = '2022-02-07', presets = true, onPreset, prefix }) {
  const [active, setActive] = useState(null)
  const [start, setStart] = useState(from)
  const [end, setEnd] = useState(to)
  const click = (key) => {
    setActive(key)
    onPreset && onPreset(key)
  }
  return (
    <div className="date-range">
      {prefix}
      <input type="date" value={start} onChange={(e) => setStart(e.target.value)} style={{ width: 140 }} />
      <span className="arrow">→</span>
      <input type="date" value={end} onChange={(e) => setEnd(e.target.value)} style={{ width: 140 }} />
      {presets && (
        <>
          <button type="button" className={`chip-btn ${active === 'today' ? 'active' : ''}`} onClick={() => click('today')}>오늘</button>
          <button type="button" className={`chip-btn ${active === 'yesterday' ? 'active' : ''}`} onClick={() => click('yesterday')}>어제</button>
          <button type="button" className={`chip-btn ${active === 'month' ? 'active' : ''}`} onClick={() => click('month')}>1개월</button>
        </>
      )}
    </div>
  )
}

/** 월 선택 (YYYY-MM) */
export function MonthRange({ from = '2022-02', to = '2022-02', single = false }) {
  const [start, setStart] = useState(from)
  const [end, setEnd] = useState(to)
  return (
    <div className="date-range">
      <input type="month" value={start} onChange={(e) => setStart(e.target.value)} style={{ width: 130 }} />
      {!single && (
        <>
          <span className="arrow">→</span>
          <input type="month" value={end} onChange={(e) => setEnd(e.target.value)} style={{ width: 130 }} />
        </>
      )}
    </div>
  )
}

/** 시간(00시~23시) 범위 포함 일자 행 */
export function DateTimeRange() {
  const hours = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')} 시`)
  const [h1, setH1] = useState('00 시')
  const [h2, setH2] = useState('23 시')
  return (
    <div className="date-range" style={{ flexWrap: 'wrap' }}>
      <input type="date" defaultValue="2022-02-07" style={{ width: 140 }} />
      <select value={h1} onChange={(e) => setH1(e.target.value)}>{hours.map((h) => <option key={h}>{h}</option>)}</select>
      <span className="arrow">~</span>
      <input type="date" defaultValue="2022-02-07" style={{ width: 140 }} />
      <select value={h2} onChange={(e) => setH2(e.target.value)}>{hours.map((h) => <option key={h}>{h}</option>)}</select>
    </div>
  )
}

export function ExcelButton({ onClick, label = '엑셀 다운로드' }) {
  return (
    <button type="button" className="excel-btn" onClick={onClick}>
      <span className="xi">▦</span> {label} <span style={{ color: '#bbb' }}>|</span> <span>⤓</span>
    </button>
  )
}

export function PageSize({ value = 200, onChange, options = [200, 150, 100, 50, 30] }) {
  return (
    <select className="pagesize" value={value} onChange={(e) => onChange && onChange(Number(e.target.value))}>
      {options.map((n) => (
        <option key={n} value={n}>페이지당 {n}개</option>
      ))}
    </select>
  )
}

export function Pagination({ page = 1, totalPages = 10, onChange }) {
  const go = (p) => {
    if (p < 1 || p > totalPages) return
    onChange && onChange(p)
  }
  // window of up to 6 numbers, then ... last
  const nums = []
  const windowEnd = Math.min(6, totalPages)
  for (let i = 1; i <= windowEnd; i++) nums.push(i)
  const showDots = totalPages > 7
  return (
    <div className="pagination">
      <button type="button" className="nav" onClick={() => go(page - 1)}>◀</button>
      {nums.map((n) => (
        <button key={n} type="button" className={n === page ? 'active' : ''} onClick={() => go(n)}>{n}</button>
      ))}
      {showDots && <span className="dots">⋯</span>}
      {totalPages > 6 && (
        <button type="button" className={totalPages === page ? 'active' : ''} onClick={() => go(totalPages)}>{totalPages}</button>
      )}
      <button type="button" className="nav" onClick={() => go(page + 1)}>▶</button>
    </div>
  )
}
