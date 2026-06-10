import { useState } from 'react'
import { Screen } from '../../components/layout/BackofficeLayout'
import { SearchPanel, Row, Actions, Select } from '../../components/ui/SearchPanel'
import { DataTable } from '../../components/ui/DataTable'
import { Pagination, DateRange } from '../../components/ui/controls'
import { Modal } from '../../components/ui/Modal'
import { genAccounts } from '../../data/mock'

// 시스템 > 계정관리 (SY_0100)
export default function Accounts() {
  const [mode, setMode] = useState('list') // list | create | edit
  const [rows] = useState(genAccounts())
  const [page, setPage] = useState(1)
  const [editTarget, setEditTarget] = useState(null)
  const size = 10
  const pageRows = rows.slice((page - 1) * size, page * size)

  if (mode === 'create') return <AccountForm title="신규 사용자 등록" onBack={() => setMode('list')} />
  if (mode === 'edit') return <AccountForm title="사용자 정보 수정 (관리자)" edit target={editTarget} onBack={() => setMode('list')} />

  const columns = [
    { key: 'id', header: '번호', width: 50 },
    { key: 'userId', header: '사용자 ID', render: (r) => <span className="cell-link" onClick={() => { setEditTarget(r); setMode('edit') }}>{r.userId}</span> },
    { key: 'name', header: '이름' },
    { key: 'group', header: '접근권한 그룹' },
    { key: 'alarm', header: '알람 수신여부' },
    { key: 'channel', header: '알람 수신채널' },
    { key: 'email', header: 'e-mail' },
    { key: 'regDate', header: '등록일' },
    { key: 'expireDate', header: '사용만료일' },
    { key: 'lockDate', header: '계정 잠금설정일' },
    { key: 'del', header: '삭제', render: () => <button className="btn btn-gray btn-sm">－</button> },
  ]
  return (
    <Screen title="계정관리">
      <h3 className="bo-section-title">조회조건</h3>
      <SearchPanel>
        <Row label="검색">
          <Select value="사용자 ID" options={['이름', '사용자 ID', 'e-mail', '접근권한 그룹']} width={150} onChange={() => {}} />
          <input type="text" style={{ width: 300 }} />
        </Row>
        <Actions><button className="btn btn-primary">🔍 조회</button></Actions>
      </SearchPanel>

      <div className="result-toolbar">
        <h3 className="bo-section-title" style={{ margin: 0 }}>사용자 목록</h3>
        <div className="right"><button className="btn btn-primary btn-sm" onClick={() => setMode('create')}>→ 신규 사용자 등록</button></div>
      </div>
      <DataTable columns={columns} rows={pageRows} />
      <Pagination page={page} totalPages={Math.ceil(rows.length / size)} onChange={setPage} />
    </Screen>
  )
}

function AccountForm({ title, edit, target, onBack }) {
  const [roleModal, setRoleModal] = useState(false)
  return (
    <Screen title="계정관리">
      <h3 className="bo-section-title">{title}</h3>
      <table className="form-table">
        <tbody>
          <tr><th>사용자 ID<span className="req">*</span></th><td>
            {edit ? (target?.userId || 'asdg123') : <span className="inline"><input placeholder="최소 6자 ~ 최대 20자 (영문,숫자,특수문자 가능)" style={{ width: 360 }} /> <button className="btn btn-gray btn-sm">중복조회</button></span>}
          </td></tr>
          <tr><th>비밀번호<span className="req">*</span></th><td>
            {edit ? <span className="inline">***************** <button className="btn btn-gray btn-sm">초기화</button></span> : <input value="초기 비밀번호 자동생성" disabled style={{ width: 300 }} readOnly />}
          </td></tr>
          <tr><th>이름<span className="req">*</span></th><td><input className="w-300" defaultValue={edit ? (target?.name || '유일리') : ''} /></td></tr>
          <tr><th>접근권한 그룹<span className="req">*</span></th><td>
            <span className="inline">
              {edit ? (target?.group || 'FA팀 일반') : <input className="w-300" />}
              <button className="btn btn-outline btn-sm" onClick={() => setRoleModal(true)}>{edit ? '권한그룹 수정' : '등록'}</button>
            </span>
          </td></tr>
          <tr><th>e-mail<span className="req">*</span></th><td className="inline">
            <input style={{ width: 200 }} defaultValue={edit ? 'asdf123' : ''} /> @ <Select value="kurlycorp.com" options={['kurlycorp.com', 'kurlypay.co.kr']} width={160} onChange={() => {}} />
          </td></tr>
          <tr><th>slack 계정ID<span className="req">*</span></th><td className="inline">
            <input style={{ width: 200 }} defaultValue={edit ? 'asdf123' : ''} /> @ <Select value="kurlycorp.com" options={['kurlycorp.com']} width={160} onChange={() => {}} />
            <label className="inline"><input type="checkbox" /> e-mail 계정과 동일</label>
          </td></tr>
          <tr><th>알람 수신설정</th><td className="checklist">
            <label><input type="checkbox" defaultChecked={edit} /> 운영 알람</label>
            <label><input type="checkbox" /> 시스템 오류 알람</label>
          </td></tr>
          <tr><th>알람 수신채널</th><td className="checklist">
            <label><input type="checkbox" defaultChecked={edit} /> Slack</label>
            <label><input type="checkbox" /> e-mail</label>
          </td></tr>
          <tr><th>사용기간<span className="req">*</span></th><td className="inline">
            <DateRange presets={false} /> <label className="inline"><input type="checkbox" /> 기간 무제한</label>
          </td></tr>
          {edit && (
            <tr><th>계정 Lock 여부</th><td><span className="inline">Y ( 잠금설정일 : 2022.02.07 ) <button className="btn btn-gray btn-sm">Lock 해제</button></span></td></tr>
          )}
        </tbody>
      </table>
      <div className="form-actions">
        <button className="btn btn-primary" onClick={onBack}>→ {edit ? '수정' : '사용자 등록'}</button>
        <button className="btn btn-outline" onClick={onBack}>취소</button>
      </div>

      {roleModal && (
        <Modal title="권한그룹 등록/수정" onClose={() => setRoleModal(false)} purple width={520}
          footer={<>
            <button className="btn btn-primary" onClick={() => setRoleModal(false)}>→ 확인</button>
            <button className="btn btn-outline" onClick={() => setRoleModal(false)}>취소</button>
          </>}>
          <table className="form-table" style={{ borderTop: 'none' }}>
            <tbody>
              <tr><th>사용자 ID</th><td>asdf123</td></tr>
              <tr><th>이름</th><td>홍길동</td></tr>
              <tr><th>현재 접근권한 그룹</th><td>
                <span className="inline">
                  <span className="badge gray">Master ×</span>
                  <span className="badge gray">FA 관리자 ×</span>
                </span>
              </td></tr>
              <tr><th>추가할 접근권한 그룹</th><td><span className="inline"><Select value="" options={['', '마스터', 'FA팀 관리', 'FA팀 일반']} width={200} onChange={() => {}} /> <button className="btn btn-outline btn-sm">추가</button></span></td></tr>
            </tbody>
          </table>
        </Modal>
      )}
    </Screen>
  )
}
