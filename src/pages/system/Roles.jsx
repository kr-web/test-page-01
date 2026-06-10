import { useState } from 'react'
import { Screen } from '../../components/layout/BackofficeLayout'
import { SearchPanel, Row, Actions, Select } from '../../components/ui/SearchPanel'
import { DataTable } from '../../components/ui/DataTable'
import { Pagination, DateRange } from '../../components/ui/controls'
import { MENU } from '../../data/menu'
import { genRoles } from '../../data/mock'

// 시스템 > 권한그룹 관리 (SY_0100)
function permRows() {
  const rows = []
  for (const g of MENU) {
    rows.push({ label: g.label, depth: 1 })
    for (const c of g.children) {
      rows.push({ label: `ㄴ ${c.label}`, depth: 2 })
      if (c.children) for (const cc of c.children) rows.push({ label: `ㄴ ${cc.label}`, depth: 3 })
    }
  }
  return rows
}

export default function Roles() {
  const [mode, setMode] = useState('list')
  const [rows] = useState(genRoles())
  const [page, setPage] = useState(1)

  if (mode === 'edit') return <RoleForm onBack={() => setMode('list')} />

  const columns = [
    { key: 'id', header: '번호', width: 50 },
    { key: 'name', header: '권한그룹명', render: (r) => <span className="cell-link" onClick={() => setMode('edit')}>{r.name}</span> },
    { key: 'users', header: '등록자수' },
    { key: 'closeAuth', header: '마감권한 구분' },
    { key: 'regAt', header: '등록일시' },
    { key: 'expireAt', header: '사용만료일시' },
    { key: 'regBy', header: '등록자' },
    { key: 'use', header: '사용여부' },
  ]
  return (
    <Screen title="권한그룹 관리">
      <h3 className="bo-section-title">조회조건</h3>
      <SearchPanel>
        <Row label="권한그룹명" label2="사용여부" field2={<Select value="전체" options={['전체', 'Y', 'N']} width={150} onChange={() => {}} />}>
          <input type="text" style={{ width: 260 }} />
        </Row>
        <Actions><button className="btn btn-primary">🔍 조회</button></Actions>
      </SearchPanel>

      <div className="result-toolbar">
        <h3 className="bo-section-title" style={{ margin: 0 }}>권한 그룹 목록</h3>
        <div className="right"><button className="btn btn-primary btn-sm" onClick={() => setMode('edit')}>→ 권한그룹 등록</button></div>
      </div>
      <DataTable columns={columns} rows={rows} />
      <Pagination page={page} totalPages={10} onChange={setPage} />
    </Screen>
  )
}

function RoleForm({ onBack }) {
  const perms = permRows()
  return (
    <Screen title="권한그룹 등록/수정" crumbExtra={['권한그룹 등록/수정']}>
      <h3 className="bo-section-title">권한그룹 등록/수정</h3>
      <table className="form-table">
        <tbody>
          <tr><th>권한그룹명</th><td><input className="w-300" placeholder="최대 20자 입력가능" /></td></tr>
          <tr><th>마감권한 구분</th><td className="radio-group">
            <label><input type="radio" name="ca" defaultChecked /> 미부여</label>
            <label><input type="radio" name="ca" /> 1차 마감</label>
            <label><input type="radio" name="ca" /> 최종 마감</label>
          </td></tr>
          <tr><th>권한그룹 유효기간</th><td className="inline"><DateRange presets={false} /> <label className="inline"><input type="checkbox" /> 기간 무제한</label></td></tr>
          <tr><th>사용여부</th><td className="radio-group">
            <label><input type="radio" name="use" defaultChecked /> Y</label>
            <label><input type="radio" name="use" /> N</label>
          </td></tr>
        </tbody>
      </table>

      <h4 style={{ margin: '18px 0 8px', color: '#444' }}>- 권한메뉴 설정</h4>
      <div className="table-wrap" style={{ maxHeight: 360, overflowY: 'auto' }}>
        <table className="grid">
          <thead>
            <tr>
              <th style={{ width: 130 }}>1depth</th><th style={{ width: 160 }}>2depth</th><th>3depth</th>
              <th style={{ width: 80 }}><label className="inline"><input type="checkbox" /> 읽기</label></th>
              <th style={{ width: 80 }}><label className="inline"><input type="checkbox" /> 쓰기</label></th>
              <th style={{ width: 90 }}><label className="inline"><input type="checkbox" /> 다운로드</label></th>
            </tr>
          </thead>
          <tbody>
            {perms.map((p, i) => (
              <tr key={i}>
                <td className="left" style={{ fontWeight: p.depth === 1 ? 700 : 400 }}>{p.depth === 1 ? p.label : ''}</td>
                <td className="left">{p.depth === 2 ? p.label : ''}</td>
                <td className="left">{p.depth === 3 ? p.label : ''}</td>
                <td><input type="checkbox" /></td>
                <td><input type="checkbox" /></td>
                <td><input type="checkbox" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h4 style={{ margin: '18px 0 8px', color: '#444' }}>- 등록 사용자 목록</h4>
      <DataTable
        columns={[
          { key: 'no', header: '번호', width: 70 },
          { key: 'acct', header: '사용자 계정', align: 'left' },
          { key: 'name', header: '이름' },
          { key: 'del', header: '삭제', render: () => <button className="btn btn-gray btn-sm">－</button> },
        ]}
        rows={[{ id: 1, no: 1, acct: 'asdf123', name: '홍길동' }]}
      />

      <div className="form-actions">
        <button className="btn btn-primary" onClick={onBack}>→ 저장</button>
        <button className="btn btn-outline" onClick={onBack}>취소</button>
      </div>
    </Screen>
  )
}
