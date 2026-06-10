import { useState } from 'react'
import { Screen } from '../../components/layout/BackofficeLayout'
import { SearchPanel, Row, Actions, Select } from '../../components/ui/SearchPanel'
import { DataTable } from '../../components/ui/DataTable'
import { DateRange, ExcelButton } from '../../components/ui/controls'
import { genMemberSales, won } from '../../data/mock'

// 회원관리 > 회원통계 > 매출통계 (MM_0100)
export default function MemberSalesStats() {
  const [basis, setBasis] = useState('day')
  const [rows, setRows] = useState(genMemberSales())
  const columns = [
    { key: 'date', header: '일' },
    { key: 'total', header: '총합계', align: 'right', render: (r) => won(r.total) },
    { key: 'card', header: '신용카드', align: 'right', render: (r) => won(r.card) },
    { key: 'simple', header: '간편결제', align: 'right', render: (r) => won(r.simple) },
  ]
  const sum = rows.reduce((a, r) => ({ total: a.total + r.total, card: a.card + r.card, simple: a.simple + r.simple }), { total: 0, card: 0, simple: 0 })
  return (
    <Screen title="매출통계">
      <SearchPanel>
        <Row
          label="구분"
          label2="일자"
          field2={
            <span className="inline">
              <Select value="결제일" options={['결제일', '가입일']} width={110} onChange={() => {}} />
              <DateRange />
            </span>
          }
        >
          <div className="radio-group">
            <label><input type="radio" name="b" checked={basis === 'day'} onChange={() => setBasis('day')} /> 일별</label>
            <label><input type="radio" name="b" checked={basis === 'week'} onChange={() => setBasis('week')} /> 주별</label>
            <label><input type="radio" name="b" checked={basis === 'month'} onChange={() => setBasis('month')} /> 월별</label>
          </div>
        </Row>
        <Actions><button className="btn btn-primary" onClick={() => setRows(genMemberSales())}>🔍 조회</button></Actions>
      </SearchPanel>

      <div className="result-toolbar"><div className="right"><ExcelButton /></div></div>
      <DataTable
        columns={columns}
        rows={rows}
        footer={rows.length > 0 && (
          <tr className="sum-row">
            <td>합계</td><td className="num">{won(sum.total)}</td><td className="num">{won(sum.card)}</td><td className="num">{won(sum.simple)}</td>
          </tr>
        )}
      />
    </Screen>
  )
}
