import { useState } from 'react'
import { Screen } from '../../components/layout/BackofficeLayout'
import { SearchPanel, Row, Actions, Select } from '../../components/ui/SearchPanel'
import { DataTable } from '../../components/ui/DataTable'
import { DateRange, ExcelButton } from '../../components/ui/controls'
import { PAY_METHODS } from '../../data/codes'
import { genApprovals, won } from '../../data/mock'

// 정산관리 > 승인내역 (SM_0100)
export default function Approvals() {
  const [rows, setRows] = useState([])
  const columns = [
    { key: 'site', header: '사이트명(사이트코드)', render: (r) => `${r.site}(${r.code})` },
    { key: 'date', header: '승인일자' },
    { key: 'card', header: '신용카드', align: 'right', render: (r) => won(r.card) },
    { key: 'simple', header: '간편결제', align: 'right', render: (r) => won(r.simple) },
    { key: 'sum', header: '합계금액', align: 'right', render: (r) => won(r.sum) },
  ]
  return (
    <Screen title="승인내역">
      <SearchPanel>
        <Row label="사이트코드">
          <Select value="ALL" options={[{ value: 'ALL', label: '====== 전체 ======' }, { value: 'A9BDS', label: '[A9BDS] 마켓컬리(조회용)' }]} width={320} onChange={() => {}} />
        </Row>
        <Row label="결제수단"><Select value="ALL" options={PAY_METHODS} width={150} onChange={() => {}} /></Row>
        <Row label="승인일자"><DateRange /></Row>
        <Actions><button className="btn btn-primary" onClick={() => setRows(genApprovals())}>🔍 조회</button></Actions>
      </SearchPanel>

      <div className="result-toolbar"><div className="right"><ExcelButton /></div></div>
      <DataTable columns={columns} rows={rows} emptyText="검색된 데이터가 없습니다." />
    </Screen>
  )
}
