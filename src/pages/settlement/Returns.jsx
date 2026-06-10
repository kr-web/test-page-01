import { useState } from 'react'
import { Screen } from '../../components/layout/BackofficeLayout'
import { SearchPanel, Row, Actions, Select } from '../../components/ui/SearchPanel'
import { DataTable } from '../../components/ui/DataTable'
import { DateRange, ExcelButton } from '../../components/ui/controls'

// 정산관리 > 반송/부분 취소내역 (SM_0400)
export default function Returns() {
  const [basis, setBasis] = useState('return')
  const cols = [
    { key: 'site', header: '사이트명(사이트코드)' },
    { key: 'type', header: '거래구분' },
    { key: 'approveAt', header: '승인일시' },
    { key: 'orderNo', header: '주문번호(거래번호)' },
    { key: 'orderer', header: '주문자' },
    { key: 'card', header: '카드사' },
    { key: 'approveNo', header: '승인번호' },
    { key: 'currency', header: '통화코드' },
    { key: 'amount', header: '거래금액', align: 'right' },
    { key: 'fee', header: '수수료', align: 'right' },
    { key: 'freeFee', header: '무이자 수수료', align: 'right' },
    { key: 'pointSaveFee', header: '포인트적립수수료', align: 'right' },
    { key: 'pointUseFee', header: '포인트사용수수료', align: 'right' },
    { key: 'vat', header: '부가세', align: 'right' },
    { key: 'status', header: '거래상태' },
    { key: 'buyDate', header: '매입일자' },
    { key: 'settleDate', header: '정산일자' },
    { key: 'note', header: '비고' },
  ]
  return (
    <Screen title="반송/부분 취소내역">
      <SearchPanel>
        <Row label="사이트코드">
          <Select value="ALL" options={[{ value: 'ALL', label: '====== 전체 ======' }, { value: 'A9BDS', label: '[A9BDS] 마켓컬리(조회용)' }]} width={320} onChange={() => {}} />
        </Row>
        <Row label="일자">
          <Select value="지급변경일자" options={['지급변경일자', '정산일자']} width={130} onChange={() => {}} />
          <DateRange />
        </Row>
        <Row label="조회기준">
          <div className="radio-group">
            <label><input type="radio" name="b" checked={basis === 'return'} onChange={() => setBasis('return')} /> 반송내역</label>
            <label><input type="radio" name="b" checked={basis === 'partial'} onChange={() => setBasis('partial')} /> 부분취소내역</label>
          </div>
        </Row>
        <Actions><button className="btn btn-primary">🔍 조회</button></Actions>
      </SearchPanel>

      <h3 className="bo-section-title">반송내역</h3>
      <div className="result-toolbar"><div className="right"><ExcelButton /></div></div>
      <DataTable columns={cols} rows={[]} />

      <h3 className="bo-section-title">부분취소내역</h3>
      <div className="result-toolbar"><div className="right"><ExcelButton /></div></div>
      <DataTable columns={cols} rows={[]} />
    </Screen>
  )
}
