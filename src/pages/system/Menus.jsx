import { useState } from 'react'
import { Screen } from '../../components/layout/BackofficeLayout'
import { Select } from '../../components/ui/SearchPanel'
import { MENU } from '../../data/menu'

// 시스템 > 메뉴관리 (SY_0100)
// MENU 데이터를 1/2/3depth 평면 행으로 변환
function flatten() {
  const rows = [{ d1: 'TOP', d2: '', d3: '', path: null, name: 'TOP' }]
  for (const g of MENU) {
    rows.push({ d1: g.label, d2: '', d3: '', name: g.label })
    for (const c of g.children) {
      if (c.children) {
        rows.push({ d1: '', d2: `ㄴ ${c.label}`, d3: '', name: c.label })
        for (const cc of c.children) rows.push({ d1: '', d2: '', d3: `ㄴ ${cc.label}`, name: cc.label, path: cc.path, parent: c.label })
      } else {
        rows.push({ d1: '', d2: `ㄴ ${c.label}`, d3: '', name: c.label, path: c.path, parent: g.label })
      }
    }
  }
  return rows
}

export default function Menus() {
  const rows = flatten()
  const [sel, setSel] = useState(null)
  return (
    <Screen title="메뉴관리">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div>
          <h3 className="bo-section-title">전체 메뉴 목록</h3>
          <div className="table-wrap" style={{ maxHeight: 520, overflowY: 'auto' }}>
            <table className="grid">
              <thead><tr><th>1depth</th><th>2depth</th><th>3depth</th></tr></thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i} onClick={() => setSel(r)} style={{ cursor: 'pointer', background: sel === r ? '#eef4fb' : undefined }}>
                    <td className="left" style={{ fontWeight: r.d1 ? 700 : 400 }}>{r.d1}</td>
                    <td className="left">{r.d2}</td>
                    <td className="left">{r.d3}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h3 className="bo-section-title">메뉴 정보</h3>
          {!sel ? (
            <div style={{ border: '1px solid var(--line)', padding: '40px 20px', textAlign: 'center', color: '#999' }}>
              메뉴를 선택해 주세요.
            </div>
          ) : (
            <>
              <table className="form-table">
                <tbody>
                  <tr><th>상위(부모)메뉴</th><td>{sel.parent || '-'}</td></tr>
                  <tr><th>메뉴명</th><td><input className="w-full" defaultValue={sel.name} /></td></tr>
                  <tr><th>메뉴경로</th><td><input className="w-full" defaultValue={sel.path || ''} /></td></tr>
                  <tr><th>메뉴설명</th><td><input className="w-full" /></td></tr>
                  <tr><th>출력순위</th><td><span className="inline"><input style={{ width: 100 }} defaultValue="1" /> <span className="hint">(1~999)</span></span></td></tr>
                  <tr><th>사용여부</th><td><Select value="사용" options={['사용', '미사용']} width={120} onChange={() => {}} /></td></tr>
                </tbody>
              </table>
              <div className="form-actions">
                <button className="btn btn-primary">→ 신규</button>
                <button className="btn btn-gray">저장</button>
                <button className="btn btn-gray">삭제</button>
              </div>
            </>
          )}
        </div>
      </div>
    </Screen>
  )
}
