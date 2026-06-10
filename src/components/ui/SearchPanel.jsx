/**
 * 조회 필터 패널 빌딩 블록.
 *  <SearchPanel>
 *    <Row label="결제수단"> ... </Row>
 *    <Row label="거래년월" label2="사이트코드" field2={...}> ... </Row>
 *    <Actions> <button .../> </Actions>
 *  </SearchPanel>
 */
export function SearchPanel({ children }) {
  return <div className="search-panel">{children}</div>
}

export function Row({ label, children, label2, field2 }) {
  if (label2 !== undefined) {
    return (
      <div className="search-row two">
        <div className="search-label">{label}</div>
        <div className="search-field">{children}</div>
        <div className="search-label">{label2}</div>
        <div className="search-field">{field2}</div>
      </div>
    )
  }
  return (
    <div className="search-row">
      <div className="search-label">{label}</div>
      <div className="search-field">{children}</div>
    </div>
  )
}

export function Actions({ children }) {
  return <div className="search-actions">{children}</div>
}

export function Select({ value, onChange, options, width, style, disabled }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange && onChange(e.target.value)}
      disabled={disabled}
      style={{ width, ...style }}
    >
      {options.map((o) => {
        const val = typeof o === 'string' ? o : o.value
        const label = typeof o === 'string' ? o : o.label
        return (
          <option key={val} value={val}>
            {label}
          </option>
        )
      })}
    </select>
  )
}
