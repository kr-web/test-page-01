/**
 * 범용 결과 테이블.
 * columns: [{ key, header, width, align, render, className }]
 * rows: 데이터 배열 (비어있으면 emptyText 표시)
 * footer: 합계행 등 추가 노드(<tr>)
 */
export function DataTable({ columns, rows = [], emptyText = '검색된 데이터가 없습니다.', footer }) {
  const span = columns.length
  return (
    <div className="table-wrap">
      <table className="grid">
        <colgroup>
          {columns.map((c, i) => (
            <col key={i} style={{ width: c.width }} />
          ))}
        </colgroup>
        <thead>
          <tr>
            {columns.map((c, i) => (
              <th key={i} className={c.align === 'right' ? 'num' : ''}>
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr className="empty-row">
              <td colSpan={span}>{emptyText}</td>
            </tr>
          ) : (
            rows.map((row, ri) => (
              <tr key={row.id ?? ri}>
                {columns.map((c, ci) => (
                  <td
                    key={ci}
                    className={[
                      c.align === 'right' ? 'num' : c.align === 'left' ? 'left' : '',
                      c.className || '',
                    ].join(' ').trim()}
                  >
                    {c.render ? c.render(row, ri) : row[c.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
          {footer}
        </tbody>
      </table>
    </div>
  )
}
