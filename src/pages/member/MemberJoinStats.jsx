import { useState } from 'react'
import { Screen } from '../../components/layout/BackofficeLayout'
import { SearchPanel, Row, Actions } from '../../components/ui/SearchPanel'
import { DataTable } from '../../components/ui/DataTable'
import { DateRange, ExcelButton } from '../../components/ui/controls'
import { genMemberJoinStats, won } from '../../data/mock'

// 회원관리 > 회원통계 > 가입/탈퇴통계 (MM_0100)
export default function MemberJoinStats() {
  const [basis, setBasis] = useState('day')
  const [rows, setRows] = useState(genMemberJoinStats())
  const columns = [
    { key: 'date', header: '일' },
    { key: 'total', header: '총합계', align: 'right', render: (r) => won(r.total) },
    { key: 'join', header: '가입자수', align: 'right', render: (r) => won(r.join) },
    { key: 'withdraw', header: '탈퇴자수', align: 'right', render: (r) => won(r.withdraw) },
  ]
  const sum = rows.reduce((a, r) => ({ total: a.total + r.total, join: a.join + r.join, withdraw: a.withdraw + r.withdraw }), { total: 0, join: 0, withdraw: 0 })
  return (
    <Screen title="가입/탈퇴통계">
      <SearchPanel>
        <Row
          label="구분"
          label2="일자(가입일/탈퇴일)"
          field2={<DateRange />}
        >
          <div className="radio-group">
            <label><input type="radio" name="b" checked={basis === 'day'} onChange={() => setBasis('day')} /> 일별</label>
            <label><input type="radio" name="b" checked={basis === 'week'} onChange={() => setBasis('week')} /> 주별</label>
            <label><input type="radio" name="b" checked={basis === 'month'} onChange={() => setBasis('month')} /> 월별</label>
          </div>
        </Row>
        <Actions><button className="btn btn-primary" onClick={() => setRows(genMemberJoinStats())}>🔍 조회</button></Actions>
      </SearchPanel>

      <div className="result-toolbar"><div className="right"><ExcelButton /></div></div>
      <DataTable
        columns={columns}
        rows={rows}
        footer={rows.length > 0 && (
          <tr className="sum-row">
            <td>합계</td><td className="num">{won(sum.total)}</td><td className="num">{won(sum.join)}</td><td className="num">{won(sum.withdraw)}</td>
          </tr>
        )}
      />
    </Screen>
  )
}
