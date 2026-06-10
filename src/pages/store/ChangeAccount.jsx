import { Screen } from '../../components/layout/BackofficeLayout'
import { DataTable } from '../../components/ui/DataTable'

// 상점관리 > 정보변경 > 입금계좌 변경 (SM_0100)
const ROWS = [
  {
    id: 1, type: '예금주가 법인(개인)명의의 계좌가 아닌 경우',
    docs: '1) 계좌변경요청 및 확약서 원본 (개인/법인 인감도장 날인)\n2) 변경통장사본\n3) 개인/법인 인감증명서 원본 첨부 (발급일 3개월 이내)',
    guide: '우편/방문 접수', method: '입금계좌변경 신청 후 구비서류 우편접수 또는 방문접수',
  },
  {
    id: 2, type: '예금주가 법인(개인)명의의 계좌인 경우',
    docs: '1) 계좌변경요청 및 확약서 사본\n2) 변경통장사본\n3) 개인 : 대표자신분증 앞뒤 사본\n4) 법인 : 법인 인감증명서 사본',
    guide: '팩스/메일 접수', method: '입금계좌변경 신청 후 구비서류 우편접수 또는 방문접수',
  },
  {
    id: 3, type: '상호만 변경이 되는 경우',
    docs: '1) 사업자등록증 사본\n2) 통장 사본', guide: '', method: '',
  },
]

export default function ChangeAccount() {
  const columns = [
    { key: 'type', header: '입금계좌 변경 구분', align: 'left', width: 220 },
    { key: 'docs', header: '구비서류', align: 'left', render: (r) => <span style={{ whiteSpace: 'pre-line' }}>{r.docs}</span> },
    { key: 'guide', header: '접수안내', width: 120 },
    { key: 'method', header: '접수방법', align: 'left', width: 200 },
    {
      key: 'act', header: '접수하기', width: 130, render: (r) => r.id === 1 ? (
        <div className="pill-tree">
          <button className="btn btn-primary btn-sm">입금계좌 변경신청</button>
          <button className="btn btn-primary btn-sm">구비서류 다운로드</button>
        </div>
      ) : '',
    },
  ]
  return (
    <Screen title="입금계좌 변경">
      <h3 className="bo-section-title">입금계좌 등록현황</h3>
      <table className="form-table">
        <tbody>
          <tr><th>업체명</th><td>이커머스영업팀 테스트</td><th>결제은행</th><td>기업은행</td></tr>
          <tr><th>계좌번호</th><td>1111111111111</td><th>예금주</th><td>안지은</td></tr>
        </tbody>
      </table>

      <h3 className="bo-section-title">입금계좌 변경신청</h3>
      <p className="hint" style={{ color: '#c0392b', marginBottom: 8 }}>
        ※ 반드시 입금계좌변경 신청을 온라인으로 하신 후, 구비서류를 제출하셔야 정상적으로 처리됩니다.
      </p>
      <DataTable columns={columns} rows={ROWS} />

      <h3 className="bo-section-title">우편/방문 접수</h3>
      <table className="form-table"><tbody>
        <tr><td>(우)06133 서울특별시 강남구 테헤란로 133, 18층(역삼동) [컬리 페이먼츠 전자결제 담당자 앞]</td></tr>
      </tbody></table>

      <h3 className="bo-section-title">팩스/메일 접수</h3>
      <table className="form-table"><tbody>
        <tr><td>팩스번호 : 0000-000-9911<br />메일주소 : crm@kurlypayments.co.kr</td></tr>
      </tbody></table>
    </Screen>
  )
}
