import { useState } from 'react'
import { Screen } from '../../components/layout/BackofficeLayout'
import { SearchPanel, Row, Actions, Select } from '../../components/ui/SearchPanel'
import { DataTable } from '../../components/ui/DataTable'
import { DateRange, ExcelButton, PageSize, Pagination } from '../../components/ui/controls'
import { SITE_CODES } from '../../data/codes'
import { won } from '../../data/mock'

// 신용카드/간편결제 > 중복거래 예상 (CD_0200 / SP_0100)
export default function DuplicateScreen({ title }) {
  const [page, setPage] = useState(1)
  const columns = [
    { key: 'site', header: '사이트명(사이트코드)' },
    { key: 'approveDate', header: '승인일자' },
    { key: 'orderNo', header: '주문번호' },
    { key: 'orderer', header: '주문자' },
    { key: 'cardNo', header: '주문자카드번호' },
    { key: 'cardType', header: '카드종류' },
    { key: 'approveNo', header: '승인번호' },
    { key: 'status', header: '거래상태' },
    { key: 'installment', header: '할부' },
    { key: 'amount', header: '거래금액', align: 'right' },
  ]
  return (
    <Screen title={title}>
      <SearchPanel>
        <Row
          label="사이트코드"
          label2="정렬조건"
          field2={<Select value="전체" options={['전체', '주문번호', '카드번호', '주문자명']} width={150} onChange={() => {}} />}
        >
          <Select value="A9BDS" options={SITE_CODES} width={300} onChange={() => {}} />
        </Row>
        <Row label="거래일자">
          <DateRange />
        </Row>
        <Row label="카드번호" label2="거래금액" field2={<input type="text" style={{ width: 200 }} />}>
          <input type="text" style={{ width: 200 }} />
          <span>중복건수</span>
          <input type="text" style={{ width: 70 }} /> <span>건 이상</span>
        </Row>
        <Actions>
          <button className="btn btn-primary">🔍 조회</button>
          <button className="btn btn-gray">초기화</button>
        </Actions>
      </SearchPanel>

      <div className="mt-16">
        <div className="summary-grid cols-2">
          <div className="summary-cell"><div className="k">건수(₩)</div><div className="v">{won(0)}</div></div>
          <div className="summary-cell"><div className="k">금액(₩)</div><div className="v">{won(0)}</div></div>
          <div className="summary-cell"><div className="k">건수($)</div><div className="v">{won(0)}</div></div>
          <div className="summary-cell"><div className="k">금액($)</div><div className="v">{won(0)}</div></div>
          <div className="summary-cell"><div className="k">건수(¥)</div><div className="v">{won(0)}</div></div>
          <div className="summary-cell"><div className="k">금액(¥)</div><div className="v">{won(0)}</div></div>
        </div>
      </div>

      <div className="result-toolbar">
        <div className="left"><PageSize /></div>
        <div className="right">
          <button className="btn btn-gray btn-sm" disabled>조회항목편집</button>
          <ExcelButton />
        </div>
      </div>
      <DataTable columns={columns} rows={[]} />
      <Pagination page={page} totalPages={10} onChange={setPage} />
    </Screen>
  )
}
