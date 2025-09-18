import { useNavigate } from "react-router-dom";
import BackHeader from "../components/header/BackHeader";
import styles from "./TermsDetailPage.module.css";

export default function TermsDetailPage() {
  const navigate = useNavigate();

  return (
    <>
      <BackHeader title="위치정보 이용약관" />
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>제1조 (목적)</h2>
            <p className={styles.sectionContent}>
              본 약관은 경북지색(이하 "회사")이 제공하는 위치기반서비스에 대해
              회사와 개인위치정보주체와의 권리, 의무 및 책임사항, 기타 필요한
              사항을 규정함을 목적으로 합니다.
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>제2조 (약관의 효력 및 변경)</h2>
            <p className={styles.sectionContent}>
              ① 본 약관은 위치정보의 보호 및 이용 등에 관한 법률, 정보통신망
              이용촉진 및 정보보호 등에 관한 법률, 전기통신사업법 등 관련 법령에
              따라 작성되었습니다.
            </p>
            <p className={styles.sectionContent}>
              ② 본 약관의 내용은 회사의 서비스 화면에 게시하거나 기타의 방법으로
              이용자에게 공지하고, 본 약관에 동의한 개인위치정보주체에게
              적용됩니다.
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>제3조 (서비스 내용 및 요금)</h2>
            <p className={styles.sectionContent}>
              ① 회사는 위치정보사업자로부터 위치정보를 전달받아 아래와 같은
              위치기반서비스를 제공합니다.
            </p>
            <ul className={styles.list}>
              <li>현재 위치 기반 관광지 및 맛집 추천 서비스</li>
              <li>위치 기반 경북씰 수집 서비스</li>
              <li>위치 기반 여행 코스 추천 서비스</li>
              <li>위치 기반 날씨 정보 제공 서비스</li>
            </ul>
            <p className={styles.sectionContent}>
              ② 제1항의 위치기반서비스는 무료로 제공됩니다.
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
              제4조 (개인위치정보주체의 권리)
            </h2>
            <p className={styles.sectionContent}>
              ① 개인위치정보주체는 개인위치정보 수집·이용·제공에 대한 동의를
              언제든지 철회할 수 있습니다.
            </p>
            <p className={styles.sectionContent}>
              ② 개인위치정보주체는 개인위치정보의 수집·이용·제공의 일시정지를
              요구할 수 있습니다.
            </p>
            <p className={styles.sectionContent}>
              ③ 개인위치정보주체는 개인위치정보 수집·이용·제공사실 확인자료에
              대한 열람 또는 통지를 요구할 수 있습니다.
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
              제5조 (개인위치정보의 이용·제공)
            </h2>
            <p className={styles.sectionContent}>
              ① 회사는 개인위치정보를 이용하여 서비스를 제공하고자 하는 경우에는
              미리 약관에 명시한 후 개인위치정보주체의 동의를 얻어야 합니다.
            </p>
            <p className={styles.sectionContent}>
              ② 회사는 개인위치정보주체의 동의 없이 개인위치정보를 제3자에게
              제공하지 않으며, 제3자 제공 서비스를 제공하는 경우에는 제공받는자
              및 제공목적을 사전에 개인위치정보주체에게 고지하고 동의를
              받습니다.
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
              제6조 (개인위치정보의 보유기간)
            </h2>
            <p className={styles.sectionContent}>
              ① 회사는 위치정보의 보호 및 이용 등에 관한 법률 제16조 제2항에
              근거하여 개인위치정보를 수집한 때로부터 6개월간 보관합니다.
            </p>
            <p className={styles.sectionContent}>
              ② 개인위치정보주체가 동의를 철회한 경우에는 지체없이 개인위치정보
              및 위치정보 수집·이용·제공사실 확인자료를 파기합니다.
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
              제7조 (개인위치정보의 보호조치)
            </h2>
            <p className={styles.sectionContent}>
              회사는 개인위치정보를 안전하게 관리하기 위하여 다음과 같은
              보호조치를 취합니다.
            </p>
            <ul className={styles.list}>
              <li>개인위치정보의 암호화</li>
              <li>개인위치정보에 대한 접근통제 및 접근권한의 제한</li>
              <li>개인위치정보를 취급하는 직원의 최소화 및 교육</li>
              <li>개인위치정보 취급자의 지정 및 관리·감독</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>제8조 (손해배상)</h2>
            <p className={styles.sectionContent}>
              ① 회사가 위치정보의 보호 및 이용 등에 관한 법률 제15조 내지
              제26조의 규정을 위반한 행위로 개인위치정보주체에게 손해가 발생한
              경우 개인위치정보주체는 회사에 대하여 손해배상을 청구할 수
              있습니다.
            </p>
            <p className={styles.sectionContent}>
              ② 회사는 고의, 중대한 과실이 없는 한 개인위치정보주체에게 손해가
              발생하더라도 이에 대하여 책임을 부담하지 않습니다.
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>제9조 (분쟁의 조정 및 기타)</h2>
            <p className={styles.sectionContent}>
              ① 회사는 위치정보와 관련된 분쟁해결을 위해 이용자와 성실히
              협의합니다.
            </p>
            <p className={styles.sectionContent}>
              ② 제1항의 협의에서 분쟁이 해결되지 않은 경우, 당사자는
              개인정보보호위원회에 조정을 신청하거나 개인정보 분쟁조정위원회에
              조정을 신청할 수 있습니다.
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>제10조 (회사의 연락처)</h2>
            <p className={styles.sectionContent}>
              회사의 상호, 주소, 전화번호 기타 연락처는 다음과 같습니다.
            </p>
            <div className={styles.contactInfo}>
              <p>
                <strong>상호:</strong> 경북지색
              </p>
              <p>
                <strong>주소:</strong> 미정
              </p>
              <p>
                <strong>전화번호:</strong> 054-260-1111
              </p>
              <p>
                <strong>이메일:</strong> support@gbjs.co.kr
              </p>
            </div>
          </div>

          <div className={styles.effectiveDate}>
            <p>본 약관은 2025년 9월 18일부터 시행됩니다.</p>
          </div>
        </div>
      </div>
    </>
  );
}
