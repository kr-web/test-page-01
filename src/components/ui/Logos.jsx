// 텍스트 기반 로고 (실제 BI 이미지 대체)
export function KurlyPayLogo({ size = 18, stacked = false }) {
  return (
    <span
      style={{
        fontStyle: 'italic',
        fontWeight: 800,
        color: 'var(--kurly-purple)',
        lineHeight: stacked ? 0.95 : 1,
        display: 'inline-flex',
        flexDirection: stacked ? 'column' : 'row',
        gap: stacked ? 0 : 4,
        fontSize: size,
        letterSpacing: '-0.5px',
      }}
    >
      <span>Kurly</span>
      <span>Pay</span>
    </span>
  )
}

export function MarketKurlyLogo({ size = 16 }) {
  return (
    <span style={{ display: 'inline-flex', flexDirection: 'column', lineHeight: 0.9 }}>
      <span style={{ fontSize: size * 0.42, letterSpacing: 3, color: 'var(--kurly-purple)', fontWeight: 700 }}>
        MARKET
      </span>
      <span style={{ fontSize: size, fontStyle: 'italic', fontWeight: 800, color: 'var(--kurly-purple)' }}>
        Kurly
      </span>
    </span>
  )
}
