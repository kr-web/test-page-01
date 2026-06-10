import { useState } from 'react'
import { Screen } from '../../components/layout/BackofficeLayout'
import { SearchPanel, Row, Actions, Select } from '../../components/ui/SearchPanel'
import { DataTable } from '../../components/ui/DataTable'
import { DateRange, ExcelButton } from '../../components/ui/controls'
import { PAY_METHODS } from '../../data/codes'
import { genClosings, won } from '../../data/mock'

// 가맹점관리 > 마감내역 (FM_0100)
export default function MerchantClosings() {
  const [rows, setRows] = useState([])
  const columns = [
    { key: 'site', header: '사이트명(사이트코드)', render: (r) => `${r.site}(${r.code})` },
    { key: 'closeDate', header: '마감일자' },
    { key: 'payDate', header: '정산일자' },
    { key: 'sum', header: '정산 예정총금액', align: 'right', render: (r) => won(r.sum) },
    { key: 'card', header: '신용카드', align: 'right', render: (r) => won(r.card) },
    { key: 'simple', header: '간편결제', align: 'right', render: (r) => won(r.simple) },
  ]
  return (
    <Screen title="마감내역">
      <SearchPanel>
        <Row label="가맹점조회">
          <Select value="사업자번호" options={['사업자번호', '회사명', '가맹점ID']} width={140} onChange={() => {}} />
          <input type="text" style={{ width: 280 }} />
        </Row>
        <Row label="사이트코드"><Select value="A9BDS" options={[{ value: 'A9BDS', label: '사이트코드 선택' }]} width={320} onChange={() => {}} /></Row>
        <Row label="결제수단"><Select value="ALL" options={PAY_METHODS} width={150} onChange={() => {}} /></Row>
        <Row label="일자">
          <Select value="마감일자" options={['마감일자', '정산일자']} width={120} onChange={() => {}} />
          <DateRange />
        </Row>
        <Actions><button className="btn btn-primary" onClick={() => setRows(genClosings())}>🔍 조회</button></Actions>
      </SearchPanel>
      <div className="result-toolbar"><div className="right"><ExcelButton /></div></div>
      <DataTable columns={columns} rows={rows} />
    </Screen>
  )
}
