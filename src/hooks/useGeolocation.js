import { useState, useEffect } from "react";

export const useGeolocation = () => {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: "", lng: "" },
    address: {
      province: "", // 시/도
      city: "", // 시/군/구
      district: "", // 읍/면/동
    },
    error: null,
  });

  // OpenStreetMap Nominatim API를 사용하여 좌표를 주소로 변환
  const getAddressFromCoords = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=ko`
      );

      if (!response.ok) {
        throw new Error("주소 변환 실패");
      }

      const data = await response.json();
      const addressComponents = data.address || {};

      let province =
        addressComponents.province || addressComponents.state || "";
      let city = addressComponents.city || addressComponents.county || "";
      let district =
        addressComponents.suburb ||
        addressComponents.town ||
        addressComponents.village ||
        "";

      if (
        province &&
        !province.includes("도") &&
        !province.includes("특별시") &&
        !province.includes("광역시")
      ) {
        province = province + "도";
      }
      if (
        city &&
        !city.includes("시") &&
        !city.includes("군") &&
        !city.includes("구")
      ) {
        city = city + "시";
      }

      return {
        province: province || "",
        city: city || "",
        district: district || "",
      };
    } catch (error) {
      console.error("주소 변환 실패:", error);
      return {
        province: "",
        city: "",
        district: "",
      };
    }
  };

  const onSuccess = async (position) => {
    const { latitude, longitude } = position.coords;
    const address = await getAddressFromCoords(latitude, longitude);

    setLocation({
      loaded: true,
      coordinates: {
        lat: latitude,
        lng: longitude,
      },
      address,
      error: null,
    });
  };

  const onError = (error) => {
    setLocation({
      loaded: true,
      coordinates: { lat: "", lng: "" },
      address: {
        province: "",
        city: "",
        district: "",
      },
      error: {
        code: error.code,
        message: error.message,
      },
    });
  };

  const requestLocation = () => {
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not supported",
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    });
  };

  useEffect(() => {
    requestLocation();

    // 권한 변경 감지
    if ("permissions" in navigator) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then((permission) => {
          permission.addEventListener("change", () => {
            if (permission.state === "granted") {
              requestLocation();
            }
          });
        });
    }

    // 페이지 포커스 시 재시도 (권한 허용 후 돌아왔을 때)
    const handleFocus = () => {
      if (document.visibilityState === "visible") {
        requestLocation();
      }
    };

    document.addEventListener("visibilitychange", handleFocus);
    window.addEventListener("focus", handleFocus);

    return () => {
      document.removeEventListener("visibilitychange", handleFocus);
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  return location;
};
