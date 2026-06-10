import { useState } from 'react'
import { Screen } from '../../components/layout/BackofficeLayout'
import { SearchPanel, Row, Actions, Select } from '../../components/ui/SearchPanel'
import { DataTable } from '../../components/ui/DataTable'
import { ExcelButton } from '../../components/ui/controls'
import { genMerchants } from '../../data/mock'
import MerchantRegister from './MerchantRegister'

// 가맹점관리 > 기본정보 관리 > 가맹점 등록/조회 (FM_0100)
export default function MerchantList() {
  const [rows, setRows] = useState([])
  const [mode, setMode] = useState('list') // list | register

  if (mode === 'register') {
    return <MerchantRegister onBack={() => setMode('list')} />
  }

  const columns = [
    { key: 'id', header: '가맹점ID' },
    { key: 'contractDate', header: '계약일' },
    { key: 'company', header: '회사명' },
    { key: 'type', header: '회사구분' },
    { key: 'bizNo', header: '사업자번호' },
    { key: 'ceo', header: '대표자명' },
    { key: 'cycle', header: '정산주기' },
    { key: 'bank', header: '정산은행' },
    { key: 'account', header: '정산계좌' },
    { key: 'manager', header: '담당자' },
    { key: 'managerTel', header: '담당자연락처' },
    { key: 'email', header: '이메일' },
  ]
  return (
    <Screen title="가맹점 등록/조회">
      <SearchPanel>
        <Row label="가맹점조회">
          <Select value="사업자번호" options={['사업자번호', '회사명', '가맹점ID']} width={140} onChange={() => {}} />
          <input type="text" style={{ width: 280 }} />
        </Row>
        <Actions><button className="btn btn-primary" onClick={() => setRows(genMerchants())}>🔍 조회</button></Actions>
      </SearchPanel>

      <div className="result-toolbar">
        <div className="right">
          <button className="btn btn-primary btn-sm" onClick={() => setMode('register')}>→ 가맹점 등록</button>
          <ExcelButton />
        </div>
      </div>
      <DataTable columns={columns} rows={rows} />
    </Screen>
  )
}
