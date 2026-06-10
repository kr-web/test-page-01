import { useState } from 'react'
import { Screen } from '../../components/layout/BackofficeLayout'
import { DataTable } from '../../components/ui/DataTable'
import { Select } from '../../components/ui/SearchPanel'
import { POSITIONS } from '../../data/codes'

// 상점관리 > 상점정보 > 부가/담당자정보 (SM_0100)
export default function StoreManager() {
  const [managers, setManagers] = useState([
    { id: 1, name: '장호진', role: '계약담당자', position: '사원', tel: '070-7595-1111', mobile: '010-0000-0000', email: 'kcp@kcp.co.kr' },
    { id: 2, name: '장호진', role: '계약담당자', position: '사원', tel: '070-7595-1111', mobile: '010-0000-0000', email: 'kcp@kcp.co.kr' },
  ])
  const [draft, setDraft] = useState({ name: '', role: '선택', position: '선택', email: '' })

  const add = () => {
    if (!draft.name) return
    setManagers((m) => [...m, { ...draft, id: Date.now(), tel: '-', mobile: '-' }])
    setDraft({ name: '', role: '선택', position: '선택', email: '' })
  }
  const remove = (id) => setManagers((m) => m.filter((x) => x.id !== id))

  const columns = [
    { key: 'name', header: '담당자명' },
    { key: 'role', header: '담당자 구분' },
    { key: 'position', header: '직위' },
    { key: 'tel', header: '연락처' },
    { key: 'mobile', header: '휴대폰' },
    { key: 'email', header: '이메일' },
    {
      key: 'act', header: '비고', render: (r) => (
        <span className="inline">
          <button className="btn btn-gray btn-sm">수정</button>
          <button className="btn btn-gray btn-sm" onClick={() => remove(r.id)}>삭제</button>
        </span>
      ),
    },
  ]

  return (
    <Screen title="부가/담당자정보">
      <h3 className="bo-section-title">부가정보</h3>
      <table className="form-table">
        <tbody>
          <tr>
            <th>현금영수증</th>
            <td className="radio-group">
              <label><input type="radio" name="cash" /> 자진발급(자동)등록</label>
              <label><input type="radio" name="cash" /> 구매자 요청등록</label>
              <label><input type="radio" name="cash" defaultChecked /> 사용안함</label>
            </td>
          </tr>
          <tr>
            <th>부가세 표시여부</th>
            <td className="radio-group">
              <label><input type="radio" name="vat" defaultChecked /> 표시</label>
              <label><input type="radio" name="vat" /> 표시안함</label>
            </td>
          </tr>
          <tr><th>매입방식여부</th><td>자동매입</td></tr>
        </tbody>
      </table>

      <h3 className="bo-section-title">담당자정보</h3>
      <DataTable columns={columns} rows={managers} />

      <div className="result-toolbar" style={{ justifyContent: 'flex-end' }}>
        <button className="btn btn-primary" onClick={add}>→ 담당자추가</button>
      </div>
      <table className="form-table">
        <thead>
          <tr><th>담당자명</th><th>담당자 구분</th><th>직위</th><th>이메일</th><th>비고</th></tr>
        </thead>
        <tbody>
          <tr>
            <td><input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} /></td>
            <td><Select value={draft.role} onChange={(v) => setDraft({ ...draft, role: v })} options={['선택', '계약담당자', '정산담당자', '기술담당자']} width={130} /></td>
            <td><Select value={draft.position} onChange={(v) => setDraft({ ...draft, position: v })} options={POSITIONS} width={110} /></td>
            <td><input value={draft.email} onChange={(e) => setDraft({ ...draft, email: e.target.value })} className="w-full" /></td>
            <td><button className="btn btn-gray btn-sm" onClick={add}>확인</button></td>
          </tr>
        </tbody>
      </table>
    </Screen>
  )
}
