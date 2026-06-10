import { useState } from 'react'
import { Screen } from '../../components/layout/BackofficeLayout'
import { SearchPanel, Row, Actions, Select } from '../../components/ui/SearchPanel'
import { DataTable } from '../../components/ui/DataTable'
import { DateRange, ExcelButton } from '../../components/ui/controls'
import { genMerchantContracts } from '../../data/mock'

// 가맹점관리 > 기본정보 관리 > 가맹점 계약 조회 (FM_0100)
export default function MerchantContracts() {
  const [rows, setRows] = useState([])
  const columns = [
    { key: 'id', header: '가맹점ID' },
    { key: 'contractDate', header: '계약일' },
    { key: 'expireDate', header: '계약만료일' },
    { key: 'company', header: '회사명' },
    { key: 'fee', header: '수수료율' },
    { key: 'cycle', header: '정산주기' },
  ]
  return (
    <Screen title="가맹점 계약 조회">
      <SearchPanel>
        <Row label="계약일"><DateRange /></Row>
        <Row label="가맹점조회">
          <Select value="사업자번호" options={['사업자번호', '회사명', '가맹점ID']} width={140} onChange={() => {}} />
          <input type="text" style={{ width: 280 }} />
        </Row>
        <Actions><button className="btn btn-primary" onClick={() => setRows(genMerchantContracts())}>🔍 조회</button></Actions>
      </SearchPanel>
      <div className="result-toolbar"><div className="right"><ExcelButton /></div></div>
      <DataTable columns={columns} rows={rows} />
    </Screen>
  )
}
