import { useState } from 'react'
import { Screen } from '../../components/layout/BackofficeLayout'
import { SearchPanel, Row, Actions, Select } from '../../components/ui/SearchPanel'
import { DataTable } from '../../components/ui/DataTable'
import { MonthRange, ExcelButton } from '../../components/ui/controls'
import { PAY_METHODS } from '../../data/codes'
import { genIntegratedSummary, won } from '../../data/mock'

// 가맹점관리 > 거래조회 (FM_0100)
export default function MerchantTransactions() {
  const [rows, setRows] = useState([])
  const columns = [
    { key: 'date', header: '거래일자' },
    { key: 'method', header: '결제수단' },
    { key: 'okCnt', header: '성공 건수', align: 'right', render: (r) => won(r.okCnt) },
    { key: 'okAmt', header: '성공 금액', align: 'right', render: (r) => won(r.okAmt) },
    { key: 'cancelCnt', header: '취소 건수', align: 'right', render: (r) => won(r.cancelCnt) },
    { key: 'cancelAmt', header: '취소 금액', align: 'right', render: (r) => won(r.cancelAmt) },
    { key: 'sumCnt', header: '합계 건수', align: 'right', render: (r) => won(r.sumCnt) },
    { key: 'sumAmt', header: '합계 금액', align: 'right', render: (r) => won(r.sumAmt) },
  ]
  return (
    <Screen title="거래조회">
      <SearchPanel>
        <Row label="결제수단"><Select value="ALL" options={PAY_METHODS} width={150} onChange={() => {}} /></Row>
        <Row label="거래기간">
          <Select value="연도" options={['연도', '월']} width={100} onChange={() => {}} />
          <MonthRange from="2022-02" to="2022-02" />
        </Row>
        <Row label="가맹점조회">
          <Select value="사업자번호" options={['사업자번호', '회사명', '가맹점ID']} width={140} onChange={() => {}} />
          <input type="text" style={{ width: 280 }} />
        </Row>
        <Actions><button className="btn btn-primary" onClick={() => setRows(genIntegratedSummary())}>🔍 조회</button></Actions>
      </SearchPanel>
      <div className="result-toolbar"><div className="right"><ExcelButton /></div></div>
      <DataTable columns={columns} rows={rows} />
    </Screen>
  )
}
