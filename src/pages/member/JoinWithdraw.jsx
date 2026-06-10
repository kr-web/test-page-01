import { useState } from 'react'
import { Screen } from '../../components/layout/BackofficeLayout'
import { SearchPanel, Row, Actions, Select } from '../../components/ui/SearchPanel'
import { DataTable } from '../../components/ui/DataTable'
import { DateRange, ExcelButton } from '../../components/ui/controls'
import { genMembers } from '../../data/mock'

// 회원관리 > 통합내역 조회 > 가입/탈퇴 조회 (MM_0100)
export default function JoinWithdraw() {
  const [rows, setRows] = useState([])
  const [dateType, setDateType] = useState('가입일')
  const columns = [
    { key: 'sel', header: '선택', width: 50, render: () => <input type="checkbox" /> },
    { key: 'memberNo', header: '회원번호' },
    { key: 'joinDate', header: '회원가입일' },
    { key: 'withdrawDate', header: '회원탈퇴일' },
    { key: 'payAuth', header: '결제인증' },
    { key: 'fingerAuth', header: '지문인증' },
    { key: 'card', header: '신용카드', align: 'right' },
    { key: 'simple', header: '간편결제', align: 'right' },
  ]
  return (
    <Screen title="가입/탈퇴 조회">
      <SearchPanel>
        <Row label="일자">
          <Select value={dateType} onChange={setDateType} options={['가입일', '탈퇴일']} width={120} />
          <DateRange />
        </Row>
        <Row label="회원번호조회"><input type="text" className="w-full" /></Row>
        <Actions><button className="btn btn-primary" onClick={() => setRows(genMembers())}>🔍 조회</button></Actions>
      </SearchPanel>

      <div className="result-toolbar">
        <div className="right">
          <button className="btn btn-primary btn-sm">→ 회원 탈퇴</button>
          <ExcelButton />
        </div>
      </div>
      <DataTable columns={columns} rows={rows} />
    </Screen>
  )
}
