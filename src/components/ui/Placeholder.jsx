import { Screen } from '../layout/BackofficeLayout'

// 설계서상 TBD(미확정) 화면용 플레이스홀더
export function Placeholder({ title, note }) {
  return (
    <Screen title={title}>
      <div
        style={{
          border: '1px dashed #d9c2e2', background: '#fbf6fd', borderRadius: 8,
          padding: '60px 20px', textAlign: 'center', color: '#9a6cb0',
        }}
      >
        <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: 4, marginBottom: 8 }}>TBD</div>
        <div className="hint" style={{ color: '#a986bd' }}>{note || '설계 진행 중인 화면입니다.'}</div>
      </div>
    </Screen>
  )
}
