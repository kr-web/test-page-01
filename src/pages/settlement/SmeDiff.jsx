import { useState } from 'react'
import { Screen } from '../../components/layout/BackofficeLayout'
import { SearchPanel, Row, Actions, Select } from '../../components/ui/SearchPanel'
import { DataTable } from '../../components/ui/DataTable'
import { DateRange, ExcelButton } from '../../components/ui/controls'

// 정산관리 > 영중소 차액정산내역 (설계서상 TBD)
export default function SmeDiff() {
  const [rows] = useState([])
  const columns = [
    { key: 'site', header: '사이트명(사이트코드)' },
    { key: 'date', header: '정산일자' },
    { key: 'card', header: '카드사' },
    { key: 'oldFee', header: '기존 수수료율' },
    { key: 'newFee', header: '영중소 수수료율' },
    { key: 'diffAmt', header: '차액금액', align: 'right' },
    { key: 'status', header: '정산상태' },
  ]
  return (
    <Screen title="영중소 차액정산내역">
      <p className="hint" style={{ marginBottom: 10 }}>
        ※ 여신전문금융업법 감독규정 제25의4에 따른 영중소 사업자 우대수수료율 차액 정산 내역 (설계 진행 중)
      </p>
      <SearchPanel>
        <Row label="사이트코드">
          <Select value="ALL" options={[{ value: 'ALL', label: '====== 전체 ======' }, { value: 'A9BDS', label: '[A9BDS] 마켓컬리(조회용)' }]} width={320} onChange={() => {}} />
        </Row>
        <Row label="정산일자"><DateRange /></Row>
        <Actions><button className="btn btn-primary">🔍 조회</button></Actions>
      </SearchPanel>
      <div className="result-toolbar"><div className="right"><ExcelButton /></div></div>
      <DataTable columns={columns} rows={rows} />
    </Screen>
  )
}
