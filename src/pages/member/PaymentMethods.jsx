import { useState } from 'react'
import { Screen } from '../../components/layout/BackofficeLayout'
import { SearchPanel, Row, Actions, Select } from '../../components/ui/SearchPanel'
import { DataTable } from '../../components/ui/DataTable'
import { DateRange, ExcelButton } from '../../components/ui/controls'

// 회원관리 > 통합내역 조회 > 결제수단 조회 (MM_0100)
export default function PaymentMethods() {
  const [rows] = useState([])
  const columns = [
    { key: 'sel', header: '선택', width: 50, render: () => <input type="checkbox" /> },
    { key: 'memberNo', header: '회원번호' },
    { key: 'methodId', header: '결제수단ID' },
    { key: 'big', header: '대분류' },
    { key: 'mid', header: '중분류' },
    { key: 'small', header: '소분류' },
    { key: 'partner', header: '결제수단 제휴여부' },
    { key: 'cardName', header: '카드상품명' },
    { key: 'serial', header: '결제수단 일련번호' },
    { key: 'regAt', header: '등록일시' },
    { key: 'joinAt', header: '가입일시' },
    { key: 'withdrawAt', header: '탈퇴일시' },
  ]
  return (
    <Screen title="결제수단 조회">
      <SearchPanel>
        <Row label="일자">
          <Select value="가입일" options={['가입일', '탈퇴일']} width={120} onChange={() => {}} />
          <DateRange />
        </Row>
        <Row label="회원번호조회"><input type="text" className="w-full" /></Row>
        <Actions><button className="btn btn-primary">🔍 조회</button></Actions>
      </SearchPanel>

      <div className="result-toolbar">
        <div className="right">
          <button className="btn btn-primary btn-sm">→ 결제수단 정지</button>
          <ExcelButton />
        </div>
      </div>
      <DataTable columns={columns} rows={rows} />
    </Screen>
  )
}
