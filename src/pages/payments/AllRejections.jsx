import { useState } from 'react'
import { Screen } from '../../components/layout/BackofficeLayout'
import { SearchPanel, Row, Actions, Select } from '../../components/ui/SearchPanel'
import { DataTable } from '../../components/ui/DataTable'
import { DateRange, ExcelButton, PageSize, Pagination } from '../../components/ui/controls'
import { MiniSummary } from '../../components/ui/Summary'
import { SITE_CODES, PAY_METHODS } from '../../data/codes'

// 결제관리 > 통합내역 조회 > 전체 거절내역 (IH_0200)
export default function AllRejections() {
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(200)

  const columns = [
    { key: 'site', header: '사이트명\n(사이트코드)' },
    { key: 'method', header: '결제수단' },
    { key: 'type', header: '거래구분' },
    { key: 'date', header: '거절일자' },
    { key: 'orderNo', header: '주문번호' },
    { key: 'memberNo', header: '컬리페이회원번호' },
    { key: 'orderer', header: '주문자' },
    { key: 'service', header: '서비스회사' },
    { key: 'methodNo', header: '결제수단번호' },
    { key: 'installment', header: '할부' },
    { key: 'amount', header: '거래금액', align: 'right' },
    { key: 'rejectCode', header: '거절코드' },
    { key: 'rejectReason', header: '거절사유' },
    { key: 'media', header: '매체구분' },
  ]

  return (
    <Screen title="전체 거절내역">
      <SearchPanel>
        <Row label="사이트코드">
          <Select value="A9BDS" options={SITE_CODES} width={320} onChange={() => {}} />
        </Row>
        <Row label="결제수단">
          <Select value="ALL" options={PAY_METHODS} width={150} onChange={() => {}} />
        </Row>
        <Row label="거절일자">
          <DateRange />
        </Row>
        <Row
          label="검색조건"
          label2="매체구분"
          field2={<Select value="전체" options={['전체', 'PC-WEB', '스마트폰']} width={150} onChange={() => {}} />}
        >
          <Select value="전체" options={['전체', '주문자', '주문번호', '거래금액', '거절코드']} width={150} onChange={() => {}} />
          <input type="text" style={{ width: 200 }} />
        </Row>
        <Actions>
          <button className="btn btn-primary">🔍 조회</button>
        </Actions>
      </SearchPanel>

      <div className="mt-16">
        <MiniSummary
          items={[
            { k: '거절건수 원 / 달러 / 엔화', v: '0 / 0 / 0' },
            { k: '거절금액 원 / 달러 / 엔화', v: '0 / 0 / 0' },
          ]}
        />
      </div>

      <div className="result-toolbar">
        <div className="left"><PageSize value={size} onChange={setSize} /></div>
        <div className="right"><ExcelButton /></div>
      </div>

      <DataTable columns={columns} rows={[]} />
      <Pagination page={page} totalPages={10} onChange={setPage} />
    </Screen>
  )
}
