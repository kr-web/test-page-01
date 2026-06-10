import { Routes, Route, Navigate } from 'react-router-dom'
import { BackofficeLayout } from './components/layout/BackofficeLayout'
import { Placeholder } from './components/ui/Placeholder'

// Auth
import Login from './pages/auth/Login'
import AuthCode from './pages/auth/AuthCode'
import FindId from './pages/auth/FindId'
import FindPassword from './pages/auth/FindPassword'
import Main from './pages/Main'

// 결제관리
import AllTransactions from './pages/payments/AllTransactions'
import AllRejections from './pages/payments/AllRejections'
import TransactionScreen from './pages/payments/TransactionScreen'
import DuplicateScreen from './pages/payments/DuplicateScreen'
import SalesByPeriod from './pages/payments/SalesByPeriod'
import SalesByMethod from './pages/payments/SalesByMethod'

// 정산관리
import Approvals from './pages/settlement/Approvals'
import Settlements from './pages/settlement/Settlements'
import Closings from './pages/settlement/Closings'
import Returns from './pages/settlement/Returns'
import Vat from './pages/settlement/Vat'
import SmeDiff from './pages/settlement/SmeDiff'

// 상점관리
import StoreBasic from './pages/store/StoreBasic'
import StoreContract from './pages/store/StoreContract'
import StoreManager from './pages/store/StoreManager'
import ChangePassword from './pages/store/ChangePassword'
import ChangeAccount from './pages/store/ChangeAccount'
import ChangeAdmin from './pages/store/ChangeAdmin'
import LoginAuthInfo from './pages/store/LoginAuthInfo'

// 회원관리
import JoinWithdraw from './pages/member/JoinWithdraw'
import PaymentMethods from './pages/member/PaymentMethods'
import MemberSalesStats from './pages/member/MemberSalesStats'
import MemberJoinStats from './pages/member/MemberJoinStats'

// 가맹점관리
import MerchantList from './pages/merchant/MerchantList'
import MerchantContracts from './pages/merchant/MerchantContracts'
import MerchantTransactions from './pages/merchant/MerchantTransactions'
import MerchantSettlements from './pages/merchant/MerchantSettlements'
import MerchantClosings from './pages/merchant/MerchantClosings'
import MerchantStats from './pages/merchant/MerchantStats'

// 시스템
import Downloads from './pages/system/Downloads'
import Accounts from './pages/system/Accounts'
import Menus from './pages/system/Menus'
import Roles from './pages/system/Roles'
import CommonCodes from './pages/system/CommonCodes'
import Holidays from './pages/system/Holidays'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/auth/code" element={<AuthCode />} />
      <Route path="/auth/find-id" element={<FindId />} />
      <Route path="/auth/find-pw" element={<FindPassword />} />

      <Route element={<BackofficeLayout />}>
        <Route path="/main" element={<Main />} />

        {/* 결제관리 */}
        <Route path="/payments/all-transactions" element={<AllTransactions />} />
        <Route path="/payments/all-rejections" element={<AllRejections />} />
        <Route path="/payments/card/transactions" element={<TransactionScreen kind="card" title="신용카드 거래내역 조회" />} />
        <Route path="/payments/card/duplicates" element={<DuplicateScreen title="신용카드 중복거래 예상" />} />
        <Route path="/payments/simple/transactions" element={<TransactionScreen kind="simple" title="간편결제 거래내역 조회" />} />
        <Route path="/payments/simple/duplicates" element={<DuplicateScreen title="간편결제 중복거래 예상" />} />
        <Route path="/payments/sales/period" element={<SalesByPeriod />} />
        <Route path="/payments/sales/method" element={<SalesByMethod />} />

        {/* 정산관리 */}
        <Route path="/settlement/approvals" element={<Approvals />} />
        <Route path="/settlement/settlements" element={<Settlements />} />
        <Route path="/settlement/closings" element={<Closings />} />
        <Route path="/settlement/returns" element={<Returns />} />
        <Route path="/settlement/vat" element={<Vat />} />
        <Route path="/settlement/sme-diff" element={<SmeDiff />} />

        {/* 상점관리 */}
        <Route path="/store/info/basic" element={<StoreBasic />} />
        <Route path="/store/info/contract" element={<StoreContract />} />
        <Route path="/store/info/manager" element={<StoreManager />} />
        <Route path="/store/info/promotion" element={<Placeholder title="카드사 프로모션 현황" note="카드사 프로모션 현황 화면 (설계 진행 중)" />} />
        <Route path="/store/change/password" element={<ChangePassword />} />
        <Route path="/store/change/account" element={<ChangeAccount />} />
        <Route path="/store/change/admin" element={<ChangeAdmin />} />
        <Route path="/store/change/login-auth" element={<LoginAuthInfo />} />

        {/* 회원관리 */}
        <Route path="/member/join-withdraw" element={<JoinWithdraw />} />
        <Route path="/member/payment-methods" element={<PaymentMethods />} />
        <Route path="/member/stats/sales" element={<MemberSalesStats />} />
        <Route path="/member/stats/join-withdraw" element={<MemberJoinStats />} />

        {/* 가맹점관리 */}
        <Route path="/merchant/list" element={<MerchantList />} />
        <Route path="/merchant/contracts" element={<MerchantContracts />} />
        <Route path="/merchant/transactions" element={<MerchantTransactions />} />
        <Route path="/merchant/settlements" element={<MerchantSettlements />} />
        <Route path="/merchant/closings" element={<MerchantClosings />} />
        <Route path="/merchant/stats" element={<MerchantStats />} />

        {/* 시스템 */}
        <Route path="/system/downloads" element={<Downloads />} />
        <Route path="/system/accounts" element={<Accounts />} />
        <Route path="/system/menus" element={<Menus />} />
        <Route path="/system/roles" element={<Roles />} />
        <Route path="/system/codes" element={<CommonCodes />} />
        <Route path="/system/holidays" element={<Holidays />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}
