import { useState } from 'react'
import { Screen } from '../../components/layout/BackofficeLayout'
import { SearchPanel, Row, Actions, Select } from '../../components/ui/SearchPanel'
import { DataTable } from '../../components/ui/DataTable'
import { DateRange, ExcelButton } from '../../components/ui/controls'
import { won } from '../../data/mock'

// 정산관리 > 부가세 신고 참고자료 (SM_0500)
export default function Vat() {
  const [basis, setBasis] = useState('card') // card=카드사별, month=월별

  const declareCols = basis === 'card'
    ? [
        { key: 'card', header: '카드사', align: 'left' },
        { key: 'bizNo', header: '사업자번호' },
        { key: 'type', header: '거래구분' },
        { key: 'cnt', header: '건수', align: 'right' },
        { key: 'amt', header: '매출금액', align: 'right' },
        { key: 'supply', header: '매출공급가액', align: 'right' },
        { key: 'tax', header: '매출세액', align: 'right' },
      ]
    : [
        { key: 'month', header: '조회월' },
        { key: 'type', header: '거래구분' },
        { key: 'cnt', header: '건수', align: 'right' },
        { key: 'amt', header: '매출금액', align: 'right' },
        { key: 'supply', header: '매출공급가액', align: 'right' },
        { key: 'tax', header: '매출세액', align: 'right' },
      ]

  const declareRows = basis === 'card'
    ? [{ id: 1, card: '롯데아멕스카드', bizNo: '1208154231', type: '매입/취소/부분취소', cnt: 0, amt: 0, supply: 0, tax: 0 }]
    : [{ id: 1, month: '2022.01', type: '매입/취소/부분취소', cnt: 0, amt: 0, supply: 0, tax: 0 }]

  const feeCols = [
    { key: 'item', header: '항목' },
    { key: 'bizNo', header: '사업자번호' },
    { key: 'supply', header: '매입공급가액', align: 'right' },
    { key: 'tax', header: '매입세액', align: 'right' },
    { key: 'sum', header: '합계', align: 'right' },
  ]
  const feeRows = [{ id: 1, item: 'PG수수료', bizNo: '1138521083', supply: won(0), tax: won(0), sum: won(0) }]

  return (
    <Screen title="부가세신고 참고자료">
      <SearchPanel>
        <Row label="사이트코드" label2="결제수단" field2={<Select value="신용카드" options={['신용카드']} width={150} onChange={() => {}} />}>
          <Select value="ALL" options={[{ value: 'ALL', label: '====== 전체 ======' }, { value: 'A9BDS', label: '[A9BDS] 마켓컬리(조회용)' }]} width={300} onChange={() => {}} />
        </Row>
        <Row label="조회기간" label2="통화구분" field2={<Select value="원화" options={['원화', '달러', '엔화']} width={150} onChange={() => {}} />}>
          <DateRange presets={false} />
        </Row>
        <Row label="조회기준">
          <div className="radio-group">
            <label><input type="radio" name="b" checked={basis === 'card'} onChange={() => setBasis('card')} /> 카드사별 합계</label>
            <label><input type="radio" name="b" checked={basis === 'month'} onChange={() => setBasis('month')} /> 월별 합계</label>
          </div>
        </Row>
        <Actions><button className="btn btn-primary">🔍 조회</button></Actions>
      </SearchPanel>

      <h3 className="bo-section-title">신용카드 부가세 신고 명세서</h3>
      <table className="form-table" style={{ marginBottom: 8 }}>
        <tbody>
          <tr><th>사이트코드</th><td>A9BDS</td><th>회사명</th><td>이커머스영업팀 테스트</td></tr>
          <tr><th>등록번호</th><td>1138521083</td><th>대상기간</th><td>2022.01.01 ~ 2022.01.31</td></tr>
        </tbody>
      </table>
      <div className="result-toolbar"><div className="right"><ExcelButton /></div></div>
      <DataTable
        columns={declareCols}
        rows={declareRows}
        footer={
          <tr className="sum-row">
            <td colSpan={basis === 'card' ? 3 : 2}>매출총합계</td>
            <td className="num">0</td><td className="num">0</td><td className="num">0</td><td className="num">0</td>
          </tr>
        }
      />

      <h3 className="bo-section-title">신용카드 수수료 거래명세서</h3>
      <table className="form-table" style={{ marginBottom: 8 }}>
        <tbody>
          <tr><th>사이트코드</th><td>A9BDS</td><th>회사명</th><td>이커머스영업팀 테스트</td></tr>
          <tr><th>등록번호</th><td>1138521083</td><th>대상기간</th><td>2022.01.01 ~ 2022.01.31</td></tr>
        </tbody>
      </table>
      <div className="result-toolbar"><div className="right"><ExcelButton /></div></div>
      <DataTable columns={feeCols} rows={feeRows} />
    </Screen>
  )
}
