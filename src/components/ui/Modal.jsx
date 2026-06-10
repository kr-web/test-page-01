export function Modal({ title, onClose, children, footer, width = 460, purple = false }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className={`modal ${purple ? 'purple' : ''}`}
        style={{ width }}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="modal-head">
            <span>{title}</span>
            <button type="button" className="x" onClick={onClose}>×</button>
          </div>
        )}
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-foot">{footer}</div>}
      </div>
    </div>
  )
}

/** 확인용 간단 알림 (확인 버튼만) */
export function NoticeModal({ onClose, children, confirmLabel = '확인' }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="notice-card" style={{ width: 360 }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <span className="ic">✔</span>
          <div style={{ flex: 1, lineHeight: 1.6 }}>{children}</div>
          <button type="button" className="x" style={{ background: 'none', border: 'none', fontSize: 16, color: '#999' }} onClick={onClose}>×</button>
        </div>
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <button type="button" className="btn btn-outline btn-sm" onClick={onClose}>{confirmLabel}</button>
        </div>
      </div>
    </div>
  )
}
