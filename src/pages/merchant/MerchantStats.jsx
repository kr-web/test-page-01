import { useState } from 'react'
import { Screen } from '../../components/layout/BackofficeLayout'
import { SearchPanel, Row, Actions, Select } from '../../components/ui/SearchPanel'
import { DataTable } from '../../components/ui/DataTable'
import { DateRange, ExcelButton } from '../../components/ui/controls'
import { genMerchantStats, won } from '../../data/mock'

// 가맹점관리 > 통계 (FM_0100)
export default function MerchantStats() {
  const [basis, setBasis] = useState('day')
  const [rows, setRows] = useState(genMerchantStats())
  const columns = [
    { key: 'date', header: '일' },
    { key: 'merchantId', header: '가맹점ID' },
    { key: 'total', header: '정산 예정총금액', align: 'right', render: (r) => won(r.total) },
    { key: 'card', header: '신용카드', align: 'right', render: (r) => won(r.card) },
    { key: 'simple', header: '간편결제', align: 'right', render: (r) => won(r.simple) },
    { key: 'sum', header: '합계금액', align: 'right', render: (r) => won(r.sum) },
  ]
  const sum = rows.reduce((a, r) => ({ total: a.total + r.total, card: a.card + r.card, simple: a.simple + r.simple, sum: a.sum + r.sum }), { total: 0, card: 0, simple: 0, sum: 0 })
  return (
    <Screen title="통계">
      <SearchPanel>
        <Row label="가맹점조회">
          <Select value="사업자번호" options={['사업자번호', '회사명', '가맹점ID']} width={140} onChange={() => {}} />
          <input type="text" style={{ width: 280 }} />
        </Row>
        <Row label="구분">
          <div className="radio-group">
            <label><input type="radio" name="b" checked={basis === 'day'} onChange={() => setBasis('day')} /> 일별</label>
            <label><input type="radio" name="b" checked={basis === 'week'} onChange={() => setBasis('week')} /> 주별</label>
            <label><input type="radio" name="b" checked={basis === 'month'} onChange={() => setBasis('month')} /> 월별</label>
          </div>
        </Row>
        <Row label="일자"><DateRange /></Row>
        <Actions><button className="btn btn-primary" onClick={() => setRows(genMerchantStats())}>🔍 조회</button></Actions>
      </SearchPanel>
      <div className="result-toolbar"><div className="right"><ExcelButton /></div></div>
      <DataTable
        columns={columns}
        rows={rows}
        footer={rows.length > 0 && (
          <tr className="sum-row">
            <td colSpan={2}>합계</td>
            <td className="num">{won(sum.total)}</td><td className="num">{won(sum.card)}</td>
            <td className="num">{won(sum.simple)}</td><td className="num">{won(sum.sum)}</td>
          </tr>
        )}
      />
    </Screen>
  )
}
