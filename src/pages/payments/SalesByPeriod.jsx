import { useState } from 'react'
import { Screen } from '../../components/layout/BackofficeLayout'
import { SearchPanel, Row, Actions, Select } from '../../components/ui/SearchPanel'
import { DataTable } from '../../components/ui/DataTable'
import { DateRange, ExcelButton } from '../../components/ui/controls'
import { SITE_CODES } from '../../data/codes'
import { genSalesByPeriod, won } from '../../data/mock'

// 결제관리 > 매출통계 > 매출기간별 (SS_0100)
export default function SalesByPeriod() {
  const [basis, setBasis] = useState('day')
  const [rows, setRows] = useState([])
  const columns = [
    { key: 'site', header: '사이트명(사이트코드)', render: (r) => `${r.site}(${r.code})` },
    { key: 'date', header: '거래일자' },
    { key: 'okCnt', header: '승인건수', align: 'right', render: (r) => won(r.okCnt) },
    { key: 'okAmt', header: '승인금액', align: 'right', render: (r) => won(r.okAmt) },
    { key: 'cancelCnt', header: '취소건수', align: 'right', render: (r) => won(r.cancelCnt) },
    { key: 'cancelAmt', header: '취소금액', align: 'right', render: (r) => won(r.cancelAmt) },
    { key: 'sumCnt', header: '합계건수', align: 'right', render: (r) => won(r.sumCnt) },
    { key: 'sumAmt', header: '합계금액', align: 'right', render: (r) => won(r.sumAmt) },
  ]
  return (
    <Screen title="매출기간별">
      <SearchPanel>
        <Row
          label="사이트코드"
          label2="조회기준"
          field2={
            <div className="radio-group">
              <label><input type="radio" name="b" checked={basis === 'day'} onChange={() => setBasis('day')} /> 일별</label>
              <label><input type="radio" name="b" checked={basis === 'week'} onChange={() => setBasis('week')} /> 주별</label>
              <label><input type="radio" name="b" checked={basis === 'month'} onChange={() => setBasis('month')} /> 월별</label>
            </div>
          }
        >
          <Select value="A9BDS" options={SITE_CODES} width={300} onChange={() => {}} />
        </Row>
        <Row label="거래일자"><DateRange presets={false} /></Row>
        <Actions>
          <button className="btn btn-primary" onClick={() => setRows(genSalesByPeriod())}>🔍 조회</button>
        </Actions>
      </SearchPanel>

      <div className="result-toolbar"><div className="right"><ExcelButton /></div></div>
      <DataTable columns={columns} rows={rows} />
    </Screen>
  )
}
