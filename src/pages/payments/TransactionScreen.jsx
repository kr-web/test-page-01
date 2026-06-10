import { useState } from 'react'
import { Screen } from '../../components/layout/BackofficeLayout'
import { SearchPanel, Row, Actions, Select } from '../../components/ui/SearchPanel'
import { DataTable } from '../../components/ui/DataTable'
import { DateTimeRange, ExcelButton, PageSize, Pagination } from '../../components/ui/controls'
import { SummaryGrid } from '../../components/ui/Summary'
import { Modal } from '../../components/ui/Modal'
import {
  SITE_CODES, TRANSACTION_TYPE, CURRENCY, CARD_APPROVERS, FINAL_PAY_STATUS,
  TRADE_STATUS, BANKS, SIMPLE_PAY_TYPES,
} from '../../data/codes'
import { genTransactions, won } from '../../data/mock'

/**
 * 신용카드 / 간편결제 거래내역 조회 공통 화면 (CD_0100 / SP_0100)
 * kind: 'card' | 'simple'
 */
export default function TransactionScreen({ kind, title }) {
  const [view, setView] = useState('detail') // detail=건별, summary=요약
  const [advanced, setAdvanced] = useState(false)
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(200)
  const [rows, setRows] = useState([])
  const [cancelTarget, setCancelTarget] = useState(null)
  const [receiptTarget, setReceiptTarget] = useState(null)

  const search = (v) => {
    setView(v)
    setRows(genTransactions(47, kind))
    setPage(1)
  }

  const totalAmt = rows.reduce((a, r) => a + r.amount, 0)
  const okRows = rows.filter((r) => r.status !== '부분취소')
  const cancelRows = rows.filter((r) => r.status === '부분취소')

  const summaryItems = [
    { k: '총거래건수(₩)', v: won(rows.length) },
    { k: '승인건수(₩)', v: won(okRows.length) },
    { k: '취소건수(₩)', v: won(cancelRows.length) },
    { k: '총거래금액(₩)', v: won(totalAmt) },
    { k: '승인금액(₩)', v: won(okRows.reduce((a, r) => a + r.amount, 0)) },
    { k: '취소금액(₩)', v: won(cancelRows.reduce((a, r) => a + r.amount, 0)) },
  ]

  const pageRows = rows.slice((page - 1) * size, page * size)

  const columns = [
    { key: 'site', header: '사이트명(사이트코드)', width: 150, render: (r) => `${r.site}\n(${r.siteCode})`, align: 'left' },
    { key: 'type', header: '거래구분' },
    { key: 'approveDate', header: '승인일자', width: 130 },
    { key: 'cancelDate', header: '취소일자', width: 130 },
    { key: 'orderNo', header: '주문번호', render: (r) => <span className="cell-link" onClick={() => setReceiptTarget(r)}>{r.orderNo}</span> },
    { key: 'memberNo', header: '컬리페이회원번호' },
    { key: 'orderer', header: '주문자' },
    { key: 'cardType', header: kind === 'card' ? '카드종류' : '결제수단' },
    { key: 'bank', header: '은행사' },
    { key: 'approveNo', header: '승인번호' },
    { key: 'status', header: '거래상태', render: (r) => <Badge status={r.status} /> },
    { key: 'installment', header: '할부' },
    { key: 'total', header: '총금액', align: 'right', render: (r) => won(r.total) },
    { key: 'amount', header: '거래금액', align: 'right', render: (r) => won(r.amount) },
    { key: 'supply', header: '과세공급가액', align: 'right', render: (r) => won(r.supply) },
    { key: 'tax', header: '과세부가세액', align: 'right', render: (r) => won(r.tax) },
    {
      key: 'cancel', header: '취소', render: (r) =>
        r.status !== '부분취소' ? (
          <button className="btn btn-danger btn-sm" onClick={() => setCancelTarget(r)}>취소</button>
        ) : '-',
    },
    { key: 'receipt', header: '매출전표', render: (r) => <button className="btn btn-gray btn-sm" onClick={() => setReceiptTarget(r)}>발행</button> },
    { key: 'product', header: '상품명', width: 180, align: 'left' },
    { key: 'media', header: '매체구분' },
  ]

  const summaryColumns = [
    { key: 'approveDate', header: '승인일자' },
    { key: 'okCnt', header: '총거래 건수', align: 'right' },
    { key: 'okAmt', header: '총거래 금액', align: 'right' },
    { key: 'apCnt', header: '승인 건수', align: 'right' },
    { key: 'apAmt', header: '승인 금액', align: 'right' },
    { key: 'cCnt', header: '취소 건수', align: 'right' },
    { key: 'cAmt', header: '취소 금액', align: 'right' },
  ]

  return (
    <Screen title={title}>
      <div className="row-gap" style={{ marginBottom: 8, color: '#666' }}>
        <input type="checkbox" checked={advanced} onChange={(e) => setAdvanced(e.target.checked)} />
        클릭하시면 {advanced ? '검색영역을 감춰 공간을 넓게 쓰실 수 있습니다.' : '상세검색을 하실 수 있습니다.'}
        <button className="btn btn-primary btn-sm" style={{ marginLeft: 'auto' }} onClick={() => setAdvanced((v) => !v)}>
          {advanced ? '_ CLOSE' : '🔍 상세검색'}
        </button>
      </div>

      <SearchPanel>
        <Row label="사이트코드">
          <Select value="A9BDS" options={SITE_CODES} width={320} onChange={() => {}} />
        </Row>
        <Row label="일자">
          <Select value="승인일자" options={['승인일자', '취소일자', kind === 'card' ? '시스템구매확인' : '구매확인일']} width={120} onChange={() => {}} />
          <DateTimeRange />
        </Row>
        <Row
          label="거래구분"
          label2="결제통화"
          field2={<Select value="KRW" options={CURRENCY} width={120} onChange={() => {}} />}
        >
          <Select value="ALL" options={TRANSACTION_TYPE} width={150} onChange={() => {}} />
        </Row>

        {advanced && (
          <>
            <Row
              label={kind === 'card' ? '카드승인/매입사' : '승인사'}
              label2="주문번호"
              field2={<input type="text" style={{ width: 220 }} />}
            >
              <Select value="카드승인사" options={['카드승인사', '카드매입사']} width={120} onChange={() => {}} />
              <Select value="전체" options={CARD_APPROVERS} width={160} onChange={() => {}} />
            </Row>
            <Row label="할부개월" label2="주문자" field2={<input type="text" style={{ width: 220 }} />}>
              <input type="text" style={{ width: 80 }} /> <span>~</span> <input type="text" style={{ width: 80 }} />
            </Row>
            <Row label="거래금액" label2="카드번호" field2={<input type="text" style={{ width: 220 }} />}>
              <input type="text" style={{ width: 200 }} />
            </Row>
            <Row label="거래번호" label2="승인번호" field2={<input type="text" style={{ width: 220 }} />}>
              <input type="text" style={{ width: 200 }} />
            </Row>
            <Row label="최종결제상태" label2="상품명" field2={<input type="text" style={{ width: 220 }} />}>
              <Select value="전체" options={FINAL_PAY_STATUS} width={150} onChange={() => {}} />
            </Row>
            <Row label="거래상태" label2="은행사" field2={<Select value="전체" options={BANKS} width={150} onChange={() => {}} />}>
              <Select value="전체" options={TRADE_STATUS} width={150} onChange={() => {}} />
            </Row>
            <Row label="기타구분">
              <div className="checklist">
                <label><input type="checkbox" /> 세이브결제</label>
                <label><input type="checkbox" /> 쿠폰결제</label>
                <label><input type="checkbox" /> PAYCO포인트</label>
                <label><input type="checkbox" /> 앱카드결제</label>
                <label><input type="checkbox" /> 페이핀결제</label>
              </div>
            </Row>
            <Row
              label="매체구분"
              label2="간편결제구분"
              field2={<Select value="전체" options={SIMPLE_PAY_TYPES} width={150} onChange={() => {}} />}
            >
              <Select value="전체" options={['전체', 'PC-WEB', '스마트폰']} width={150} onChange={() => {}} />
            </Row>
          </>
        )}

        <Actions>
          <button className="btn btn-primary" onClick={() => search('detail')}>🔍 건별조회</button>
          <button className="btn btn-primary" onClick={() => search('summary')}>🔍 요약조회</button>
          <button className="btn btn-gray" onClick={() => setRows([])}>초기화</button>
        </Actions>
      </SearchPanel>

      <div className="mt-16">
        <SummaryGrid items={summaryItems} cols={3} />
      </div>

      {view === 'detail' ? (
        <>
          <h3 className="bo-section-title">건별조회</h3>
          <div className="result-toolbar">
            <div className="left"><PageSize value={size} onChange={setSize} /></div>
            <div className="right">
              <button className="btn btn-gray btn-sm" disabled>조회항목편집</button>
              <button className="btn btn-gray btn-sm" disabled>매입요청</button>
              <button className="btn btn-danger btn-sm" disabled>거래취소</button>
              <ExcelButton />
            </div>
          </div>
          <DataTable columns={columns} rows={pageRows} />
          {rows.length > 0 && (
            <Pagination page={page} totalPages={Math.max(1, Math.ceil(rows.length / size))} onChange={setPage} />
          )}
        </>
      ) : (
        <>
          <h3 className="bo-section-title">요약조회</h3>
          <DataTable
            columns={summaryColumns}
            rows={rows.length ? [{
              id: 1, approveDate: '2022-02-07',
              okCnt: won(rows.length), okAmt: won(totalAmt),
              apCnt: won(okRows.length), apAmt: won(okRows.reduce((a, r) => a + r.amount, 0)),
              cCnt: won(cancelRows.length), cAmt: won(cancelRows.reduce((a, r) => a + r.amount, 0)),
            }] : []}
          />
        </>
      )}

      {cancelTarget && (
        <Modal title="취소요청" onClose={() => setCancelTarget(null)} width={520}
          footer={<>
            <button className="btn btn-primary" onClick={() => setCancelTarget(null)}>→ 등록하기</button>
            <button className="btn btn-outline" onClick={() => setCancelTarget(null)}>취소</button>
          </>}>
          <table className="form-table" style={{ borderTop: 'none' }}>
            <tbody>
              <tr><th>승인취소금액</th><td>{won(cancelTarget.amount)}원</td></tr>
              <tr><th>승인취소사유</th><td>
                <Select value="" options={[{ value: '', label: '선택하세요.' }, '고객 변심', '상품 품절', '중복 결제']} width={240} onChange={() => {}} />
              </td></tr>
              <tr><th>취소사유상세</th><td><textarea className="w-full" rows={4} /></td></tr>
            </tbody>
          </table>
        </Modal>
      )}

      {receiptTarget && (
        <Modal title="신용카드 매출전표" onClose={() => setReceiptTarget(null)} width={420}
          footer={<>
            <button className="btn btn-primary" onClick={() => setReceiptTarget(null)}>→ 발행하기</button>
            <button className="btn btn-primary" onClick={() => setReceiptTarget(null)}>→ 발행취소</button>
          </>}>
          <SalesSlip row={receiptTarget} />
        </Modal>
      )}
    </Screen>
  )
}

function Badge({ status }) {
  const cls = status === '부분취소' ? 'cancel' : status === '승인' ? 'ok' : status === '대금지급완료' ? 'gray' : 'wait'
  return <span className={`badge ${cls}`}>{status}</span>
}

function SalesSlip({ row }) {
  return (
    <div style={{ border: '1px solid #ccc', borderRadius: 6, padding: 16, fontSize: 12, lineHeight: 1.7 }}>
      <div style={{ textAlign: 'center', fontWeight: 800, fontSize: 15, marginBottom: 8 }}>온라인 신용카드 매출전표</div>
      <table style={{ width: '100%', fontSize: 12 }}>
        <tbody>
          <tr><td style={{ color: '#888' }}>주문번호</td><td>{row.orderNo}</td></tr>
          <tr><td style={{ color: '#888' }}>카드종류</td><td>{row.cardType}</td></tr>
          <tr><td style={{ color: '#888' }}>구매자</td><td>{row.orderer}</td></tr>
          <tr><td style={{ color: '#888' }}>거래일시</td><td>{row.approveDate}</td></tr>
          <tr><td style={{ color: '#888' }}>할부</td><td>{row.installment}</td></tr>
          <tr><td style={{ color: '#888' }}>거래상태</td><td>{row.status}</td></tr>
          <tr><td style={{ color: '#888' }}>승인번호</td><td>{row.approveNo}</td></tr>
          <tr><td style={{ color: '#888' }}>과세금액</td><td>{won(row.supply)}원</td></tr>
          <tr><td style={{ color: '#888' }}>부가세</td><td>{won(row.tax)}원</td></tr>
          <tr><td style={{ color: '#888', fontWeight: 700 }}>합계</td><td style={{ fontWeight: 700 }}>{won(row.amount)}원</td></tr>
        </tbody>
      </table>
      <div style={{ marginTop: 10, borderTop: '1px dashed #ccc', paddingTop: 8, color: '#888' }}>
        가맹점명 : 인터넷쇼핑몰결제 · 가맹점번호 : ********<br />
        주소 : 서울시 강남구 테헤란로 133, 18층
      </div>
    </div>
  )
}
