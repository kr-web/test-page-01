import { useState } from 'react'
import { Screen } from '../../components/layout/BackofficeLayout'
import { SearchPanel, Row, Actions, Select } from '../../components/ui/SearchPanel'
import { DataTable } from '../../components/ui/DataTable'
import { ExcelButton } from '../../components/ui/controls'
import { MonthRange } from '../../components/ui/controls'
import { PAY_METHODS } from '../../data/codes'
import { genIntegratedSummary, won } from '../../data/mock'

// 결제관리 > 통합내역 조회 > 전체 거래내역 (IH_0100)
export default function AllTransactions() {
  const [method, setMethod] = useState('ALL')
  const [rows, setRows] = useState([])
  const search = () => setRows(genIntegratedSummary())

  const columns = [
    { key: 'date', header: '거래일자' },
    { key: 'method', header: '결제수단' },
    { key: 'okCnt', header: '성공 건수', align: 'right', render: (r) => won(r.okCnt) },
    { key: 'okAmt', header: '성공 금액', align: 'right', render: (r) => won(r.okAmt) },
    { key: 'cancelCnt', header: '취소 건수', align: 'right', render: (r) => won(r.cancelCnt) },
    { key: 'cancelAmt', header: '취소 금액', align: 'right', render: (r) => won(r.cancelAmt) },
    { key: 'sumCnt', header: '합계 건수', align: 'right', render: (r) => won(r.sumCnt) },
    { key: 'sumAmt', header: '합계 금액', align: 'right', render: (r) => won(r.sumAmt) },
  ]

  const sum = rows.reduce(
    (a, r) => ({
      okCnt: a.okCnt + r.okCnt, okAmt: a.okAmt + r.okAmt,
      cancelCnt: a.cancelCnt + r.cancelCnt, cancelAmt: a.cancelAmt + r.cancelAmt,
      sumCnt: a.sumCnt + r.sumCnt, sumAmt: a.sumAmt + r.sumAmt,
    }),
    { okCnt: 0, okAmt: 0, cancelCnt: 0, cancelAmt: 0, sumCnt: 0, sumAmt: 0 }
  )

  return (
    <Screen title="전체 거래내역">
      <SearchPanel>
        <Row label="결제수단">
          <Select value={method} onChange={setMethod} options={PAY_METHODS} width={180} />
        </Row>
        <Row label="거래년월">
          <MonthRange single from="2022-02" />
        </Row>
        <Row label="사이트코드 선택">
          <label className="inline"><input type="checkbox" defaultChecked /> 전체</label>
        </Row>
        <div className="search-row">
          <div className="search-label" />
          <div className="search-field">
            <label className="inline"><input type="checkbox" defaultChecked /> [A9BDS] 마켓컬리(조회용)</label>
          </div>
        </div>
        <Actions>
          <button className="btn btn-primary" onClick={search}>🔍 조회</button>
        </Actions>
      </SearchPanel>

      <div className="result-toolbar">
        <div className="right"><ExcelButton /></div>
      </div>

      <DataTable
        columns={columns}
        rows={rows}
        footer={
          rows.length > 0 && (
            <tr className="sum-row">
              <td colSpan={2}>합계</td>
              <td className="num">{won(sum.okCnt)}</td>
              <td className="num">{won(sum.okAmt)}</td>
              <td className="num">{won(sum.cancelCnt)}</td>
              <td className="num">{won(sum.cancelAmt)}</td>
              <td className="num">{won(sum.sumCnt)}</td>
              <td className="num">{won(sum.sumAmt)}</td>
            </tr>
          )
        }
      />
    </Screen>
  )
}
