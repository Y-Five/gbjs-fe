import { APIService } from "./axios";

// 마이페이지 - 사용자 정보 조회
// GET /api/users
export async function getMyInfo() {
  const response = await APIService.private.get("/api/users");

  const payload = response?.data ?? response;

  return normalizeUser(payload);
}

// 닉네임 단건 조회
export async function getNickname() {
  const response = await APIService.private.get("/api/users/nickname");
  const payload = response?.data ?? response;
  return payload;
}

// 닉네임 중복 확인 (true=중복, false=사용 가능)
export async function checkNicknameAvailability(nickname) {
  const response = await APIService.private.get("/api/users/nickname/check", {
    params: { nickname },
  });
  const payload = response?.data ?? response;
  return payload;
}

// 닉네임 변경
export async function updateNickname(newNickname) {
  const response = await APIService.private.put("/api/users/nickname", {
    newNickname,
  });
  const payload = response?.data ?? response;
  return payload;
}

// 회원 탈퇴
export async function deleteUser() {
  const response = await APIService.private.delete("/api/users");
  const payload = response?.data ?? response;
  return payload;
}

// 이메일 수신 동의 토글
export async function toggleEmailMarketingConsent() {
  const response = await APIService.private.put(
    "/api/users/email-marketing-consent"
  );
  return response?.data ?? response;
}

// 위치 정보 제공 동의 토글
export async function toggleLocationConsent() {
  const response = await APIService.private.put("/api/users/location-consent");
  return response?.data ?? response;
}

// 푸시 알림 수신 동의 토글
export async function togglePushNotificationConsent() {
  const response = await APIService.private.put(
    "/api/users/push-notification-consent"
  );
  return response?.data ?? response;
}

// TTS 설정 업데이트 (FEMALE_A, FEMALE_B, MALE_C, MALE_D)
export async function updateTtsSetting(ttsSetting) {
  const response = await APIService.private.put("/api/users/tts-setting", {
    ttsSetting,
  });
  return response?.data ?? response;
}

function normalizeUser(raw) {
  if (!raw) return null;

  return {
    userId: raw.userId ?? null,
    profileImageUrl: raw.profileImageUrl ?? "",
    nickname: raw.nickname ?? "",
    sealCount: raw.sealCount ?? 0,
    // 서버에서 username이 이메일로 내려오는 케이스 매핑
    email: raw.username ?? "",
    ttsSetting: raw.ttsSetting ?? null,
    emailMarketingConsent: Boolean(raw.emailMarketingConsent),
    pushNotificationConsent: Boolean(raw.pushNotificationConsent),
    locationConsent: Boolean(raw.locationConsent),
  };
}

export default {
  getMyInfo,
  getNickname,
  checkNicknameAvailability,
  updateNickname,
  deleteUser,
  toggleEmailMarketingConsent,
  toggleLocationConsent,
  togglePushNotificationConsent,
  updateTtsSetting,
};
