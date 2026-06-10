import { useState } from 'react'
import { Screen } from '../../components/layout/BackofficeLayout'
import { SearchPanel, Row, Actions, Select } from '../../components/ui/SearchPanel'
import { DataTable } from '../../components/ui/DataTable'
import { DateRange, ExcelButton } from '../../components/ui/controls'
import { PAY_METHODS } from '../../data/codes'
import { genClosings, won } from '../../data/mock'

// 정산관리 > 마감내역 (SM_0300)
export default function Closings() {
  const [rows, setRows] = useState([])
  const [dateType, setDateType] = useState('마감일자')
  const columns = [
    { key: 'site', header: '사이트명(사이트코드)', render: (r) => `${r.site}(${r.code})` },
    { key: 'closeDate', header: '마감일자' },
    { key: 'payDate', header: '정산일자' },
    { key: 'sum', header: '정산 예정총금액', align: 'right', render: (r) => won(r.sum) },
    { key: 'card', header: '신용카드', align: 'right', render: (r) => won(r.card) },
    { key: 'simple', header: '간편결제', align: 'right', render: (r) => won(r.simple) },
    { key: 'sum2', header: '합계금액', align: 'right', render: (r) => won(r.sum) },
  ]
  return (
    <Screen title="마감내역">
      <SearchPanel>
        <Row label="사이트코드조회"><input type="text" className="w-full" /></Row>
        <Row label="사이트코드">
          <Select value="ALL" options={[{ value: 'ALL', label: '====== 전체 ======' }, { value: 'A9BDS', label: '[A9BDS] 마켓컬리(조회용)' }]} width={320} onChange={() => {}} />
        </Row>
        <Row label="결제수단"><Select value="ALL" options={PAY_METHODS} width={150} onChange={() => {}} /></Row>
        <Row label="일자">
          <Select value={dateType} onChange={setDateType} options={['마감일자', '정산일자']} width={120} />
          <DateRange />
        </Row>
        <Actions><button className="btn btn-primary" onClick={() => setRows(genClosings())}>🔍 조회</button></Actions>
      </SearchPanel>

      <div className="result-toolbar"><div className="right"><ExcelButton /></div></div>
      <DataTable columns={columns} rows={rows} />
    </Screen>
  )
}
