import { useState } from 'react'
import { Screen } from '../../components/layout/BackofficeLayout'
import { SearchPanel, Row, Actions } from '../../components/ui/SearchPanel'
import { DataTable } from '../../components/ui/DataTable'
import { Modal } from '../../components/ui/Modal'
import { genHolidays } from '../../data/mock'
import { HOLIDAY_TYPES } from '../../data/codes'

// 시스템 > 공휴일 관리 (SY_0100)
export default function Holidays() {
  const [rows, setRows] = useState(genHolidays())
  const [adding, setAdding] = useState(false)
  const [draft, setDraft] = useState({ date: '', type: '지정공휴일', name: '' })

  const save = () => {
    if (!draft.date || !draft.name) return setAdding(false)
    setRows((r) => [{ id: Date.now(), ...draft, createdAt: '2022-01-01 00:00:00', updatedAt: '2022-01-01 00:00:00', editor: '관리자' }, ...r])
    setAdding(false)
    setDraft({ date: '', type: '지정공휴일', name: '' })
  }

  const columns = [
    { key: 'date', header: '공휴일 등록일' },
    { key: 'name', header: '공휴일명' },
    { key: 'type', header: '공휴일 구분' },
    { key: 'createdAt', header: '생성일시' },
    { key: 'updatedAt', header: '수정일시' },
    { key: 'editor', header: '수정자' },
    { key: 'del', header: '삭제', render: (r) => <button className="btn btn-gray btn-sm" onClick={() => setRows((rs) => rs.filter((x) => x.id !== r.id))}>－</button> },
  ]
  return (
    <Screen title="공휴일 관리">
      <h3 className="bo-section-title">조회조건</h3>
      <SearchPanel>
        <Row label="등록일"><input type="date" /></Row>
        <Actions><button className="btn btn-primary">🔍 조회</button></Actions>
      </SearchPanel>

      <div className="result-toolbar">
        <h3 className="bo-section-title" style={{ margin: 0 }}>공휴일 등록목록</h3>
        <div className="right"><button className="btn btn-primary btn-sm" onClick={() => setAdding(true)}>→ 공휴일 추가등록</button></div>
      </div>
      <DataTable columns={columns} rows={rows} />

      {adding && (
        <Modal title="공휴일 추가등록" onClose={() => setAdding(false)} purple
          footer={<>
            <button className="btn btn-primary" onClick={save}>→ 확인</button>
            <button className="btn btn-outline" onClick={() => setAdding(false)}>취소</button>
          </>}>
          <table className="form-table" style={{ borderTop: 'none' }}>
            <tbody>
              <tr><th>공휴일 등록일</th><td><input type="date" value={draft.date} onChange={(e) => setDraft({ ...draft, date: e.target.value })} /></td></tr>
              <tr><th>공휴일 구분</th><td className="radio-group">
                {HOLIDAY_TYPES.map((t) => (
                  <label key={t}><input type="radio" name="ht" checked={draft.type === t} onChange={() => setDraft({ ...draft, type: t })} /> {t}</label>
                ))}
              </td></tr>
              <tr><th>공휴일명</th><td><input className="w-full" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} /></td></tr>
            </tbody>
          </table>
        </Modal>
      )}
    </Screen>
  )
}
