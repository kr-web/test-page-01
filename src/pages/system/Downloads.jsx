import { useState } from 'react'
import { Screen } from '../../components/layout/BackofficeLayout'
import { SearchPanel, Row, Actions, Select } from '../../components/ui/SearchPanel'
import { DataTable } from '../../components/ui/DataTable'
import { DateRange, Pagination } from '../../components/ui/controls'
import { genDownloads } from '../../data/mock'

// 시스템 > 다운로드 관리 (SY_0100)
export default function Downloads() {
  const [rows, setRows] = useState(genDownloads())
  const [page, setPage] = useState(1)
  const size = 10
  const pageRows = rows.slice((page - 1) * size, page * size)
  const columns = [
    { key: 'id', header: '번호', width: 60 },
    { key: 'reqAt', header: '요청일시' },
    { key: 'menu', header: '실행 메뉴' },
    { key: 'state', header: '다운로드 진행상태', render: (r) => <span className={`badge ${r.state.includes('완료') ? 'ok' : 'wait'}`}>{r.state}</span> },
    { key: 'file', header: '엑셀다운로드', render: (r) => <span className="cell-link">{r.file}</span> },
    { key: 'lastAt', header: '최종다운로드 일시' },
    { key: 'count', header: '다운로드수', align: 'right' },
  ]
  return (
    <Screen title="다운로드 관리">
      <h3 className="bo-section-title">조회조건</h3>
      <SearchPanel>
        <Row label="요청일자" label2="실행 메뉴" field2={<Select value="전체" options={['전체', '전체 거래내역', '신용카드 거래내역', '정산내역']} width={180} onChange={() => {}} />}>
          <DateRange presets={false} />
        </Row>
        <Row label="다운로드 진행상태">
          <Select value="전체" options={['전체', '다운로드 진행중', '다운로드 완료']} width={180} onChange={() => {}} />
        </Row>
        <Actions><button className="btn btn-primary" onClick={() => { setRows(genDownloads()); setPage(1) }}>🔍 조회</button></Actions>
      </SearchPanel>

      <h3 className="bo-section-title">다운로드 목록</h3>
      <DataTable columns={columns} rows={pageRows} />
      <Pagination page={page} totalPages={Math.ceil(rows.length / size)} onChange={setPage} />
    </Screen>
  )
}
