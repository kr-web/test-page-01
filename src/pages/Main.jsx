import { useNavigate } from 'react-router-dom'
import { MarketKurlyLogo } from '../components/ui/Logos'

const SHORTCUTS = [
  { label: '전체 거래내역', path: '/payments/all-transactions', desc: '결제관리 > 통합내역 조회' },
  { label: '신용카드 거래내역', path: '/payments/card/transactions', desc: '결제관리 > 신용카드' },
  { label: '승인내역', path: '/settlement/approvals', desc: '정산관리' },
  { label: '정산내역', path: '/settlement/settlements', desc: '정산관리' },
  { label: '상점 기본정보', path: '/store/info/basic', desc: '상점관리 > 상점정보' },
  { label: '가맹점 등록/조회', path: '/merchant/list', desc: '가맹점관리' },
  { label: '계정관리', path: '/system/accounts', desc: '시스템' },
  { label: '다운로드 관리', path: '/system/downloads', desc: '시스템' },
]

export default function Main() {
  const navigate = useNavigate()
  return (
    <>
      <div className="bo-breadcrumb"><b>메인</b></div>
      <div
        style={{
          background: 'linear-gradient(120deg, #5f0080 0%, #7a1fa0 100%)',
          color: '#fff', borderRadius: 8, padding: '34px 32px', marginBottom: 22,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ fontSize: 13, opacity: 0.85, marginBottom: 6 }}>Kurly Payments PG 시스템</div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800 }}>컬리페이 정산시스템 Back Office</h1>
          <p style={{ margin: '10px 0 0', opacity: 0.9, fontSize: 13 }}>
            결제 · 정산 · 상점 · 회원 · 가맹점 · 시스템 운영을 한 곳에서 관리합니다.
          </p>
        </div>
        <div style={{ background: '#fff', padding: '14px 18px', borderRadius: 8 }}>
          <MarketKurlyLogo size={22} />
        </div>
      </div>

      <h2 className="bo-section-title" style={{ marginTop: 6 }}>바로가기</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
        {SHORTCUTS.map((s) => (
          <button
            key={s.path}
            type="button"
            onClick={() => navigate(s.path)}
            style={{
              textAlign: 'left', border: '1px solid var(--line)', borderRadius: 6,
              background: '#fff', padding: '16px 16px', cursor: 'pointer',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--kurly-purple-light)')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--line)')}
          >
            <div style={{ fontWeight: 700, color: '#333', marginBottom: 4 }}>{s.label}</div>
            <div className="hint">{s.desc}</div>
          </button>
        ))}
      </div>
    </>
  )
}
