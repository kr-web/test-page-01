import { useState } from 'react'
import { Screen } from '../../components/layout/BackofficeLayout'
import { SearchPanel, Row, Actions, Select } from '../../components/ui/SearchPanel'
import { DataTable } from '../../components/ui/DataTable'
import { Pagination } from '../../components/ui/controls'
import { genCommonCodes } from '../../data/mock'

// 시스템 > 공통코드 관리 (SY_0100)
export default function CommonCodes() {
  const [mode, setMode] = useState('list') // list | form
  const [rows] = useState(genCommonCodes())
  const [page, setPage] = useState(1)
  const size = 10
  const pageRows = rows.slice((page - 1) * size, page * size)

  if (mode === 'form') return <CodeForm onBack={() => setMode('list')} />

  const columns = [
    { key: 'id', header: '번호', width: 50 },
    { key: 'group', header: '그룹코드', render: (r) => <span className="cell-link" onClick={() => setMode('form')}>{r.group}</span> },
    { key: 'desc', header: '그룹코드 설명', align: 'left' },
    { key: 'codeCount', header: '코드 수', align: 'right' },
    { key: 'updatedAt', header: '최종수정일시' },
    { key: 'del', header: '삭제', render: () => <button className="btn btn-gray btn-sm">－</button> },
  ]
  return (
    <Screen title="공통코드 관리">
      <h3 className="bo-section-title">조회조건</h3>
      <SearchPanel>
        <Row label="그룹코드"><input type="text" style={{ width: 220 }} /></Row>
        <Row label="그룹코드 설명"><input type="text" className="w-full" /></Row>
        <Actions><button className="btn btn-primary">🔍 조회</button></Actions>
      </SearchPanel>

      <div className="result-toolbar">
        <h3 className="bo-section-title" style={{ margin: 0 }}>조회 결과</h3>
        <div className="right">
          <Select value="10" options={[{ value: '10', label: '10개씩 보기' }, { value: '30', label: '30개씩 보기' }]} width={130} onChange={() => {}} />
          <button className="btn btn-primary btn-sm" onClick={() => setMode('form')}>→ 등록</button>
        </div>
      </div>
      <DataTable columns={columns} rows={pageRows} />
      <Pagination page={page} totalPages={Math.ceil(rows.length / size)} onChange={setPage} />
    </Screen>
  )
}

function CodeForm({ onBack }) {
  const [codes, setCodes] = useState([
    { id: 1, order: 1, name: 'TRANSACTION_TYPE_01', desc: '승인', use: 'N' },
    { id: 2, order: 2, name: '', desc: '', use: 'N' },
    { id: 3, order: 3, name: '', desc: '', use: 'N' },
  ])
  const add = () => setCodes((c) => [...c, { id: Date.now(), order: c.length + 1, name: '', desc: '', use: 'N' }])
  return (
    <Screen title="공통코드 등록" crumbExtra={['공통코드 등록']}>
      <h3 className="bo-section-title">공통코드 등록</h3>
      <h4 style={{ margin: '6px 0 8px', color: '#444' }}>- 그룹코드</h4>
      <table className="form-table">
        <tbody>
          <tr><th>그룹코드<span className="req">*</span></th><td><input className="w-full" defaultValue="TRANSACTION_TYPE" /></td></tr>
          <tr><th>그룹코드 설명<span className="req">*</span></th><td><input className="w-full" defaultValue="거래구분" /></td></tr>
        </tbody>
      </table>

      <div className="result-toolbar">
        <h4 style={{ margin: 0, color: '#444' }}>- 공통코드</h4>
        <div className="right"><button className="btn btn-primary btn-sm" onClick={add}>→ 추가</button></div>
      </div>
      <div className="table-wrap">
        <table className="grid">
          <thead>
            <tr><th style={{ width: 50 }}>번호</th><th style={{ width: 70 }}>순서</th><th>공통코드명</th><th>공통코드 설명</th><th style={{ width: 120 }}>사용 여부</th><th style={{ width: 60 }}>삭제</th></tr>
          </thead>
          <tbody>
            {codes.map((c, i) => (
              <tr key={c.id}>
                <td>{i + 1}</td>
                <td>▲ ▼</td>
                <td><input className="w-full" defaultValue={c.name} placeholder="영문대문자, 숫자, 언더바'_'만 입력 가능" /></td>
                <td><input className="w-full" defaultValue={c.desc} placeholder="100자 내외로 입력" /></td>
                <td className="radio-group" style={{ justifyContent: 'center' }}>
                  <label><input type="radio" name={`u${c.id}`} /> Y</label>
                  <label><input type="radio" name={`u${c.id}`} defaultChecked /> N</label>
                </td>
                <td><button className="btn btn-gray btn-sm" onClick={() => setCodes((cs) => cs.filter((x) => x.id !== c.id))}>－</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="form-actions">
        <button className="btn btn-primary" onClick={onBack}>→ 저장</button>
        <button className="btn btn-gray" onClick={onBack}>목록</button>
      </div>
    </Screen>
  )
}
