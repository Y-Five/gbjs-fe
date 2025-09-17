import { useState, useEffect } from 'react';
import { getAllSeals, getUserSeals } from '../../apis/sealApi';
import { useAuth } from '../../hooks/useAuth';

export default function SealsDataProvider({ children }) {
  const { isLoggedIn, isLoading: authLoading } = useAuth();
  const [seals, setSeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentSortBy, setCurrentSortBy] = useState('NUMBER');
  const [isInitialized, setIsInitialized] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchSeals = async (sortBy = 'NUMBER') => {
    try {
      setError(null);

      // 로그인 상태에 따라 다른 API 호출
      let response;
      if (isLoggedIn) {
        response = await getUserSeals(sortBy);
      } else {
        response = await getUserSeals(sortBy);
      }

      const sealsData = response?.data?.seals || response?.seals || [];
      setSeals(Array.isArray(sealsData) ? sealsData : []);
    } catch (error) {
      console.error('띠부씰 조회 실패:', error);
      setError('띠부씰 정보를 불러오는 중 오류가 발생했습니다.');
      setSeals([]);
    }
  };

  const refreshSeals = async (sortBy) => {
    // 정렬 방식이 변경된 경우에만 API 호출
    if (sortBy !== currentSortBy && !isRefreshing) {
      setIsRefreshing(true);
      setCurrentSortBy(sortBy);
      try {
        await fetchSeals(sortBy);
      } finally {
        setIsRefreshing(false);
      }
    }
  };

  const updateSealsWithSort = async (sortBy) => {
    // 정렬 방식이 변경된 경우에만 API 호출
    if (sortBy !== currentSortBy && !isRefreshing) {
      setIsRefreshing(true);
      setCurrentSortBy(sortBy);
      try {
        await fetchSeals(sortBy);
      } finally {
        setIsRefreshing(false);
      }
    }
  };

  useEffect(() => {
    // 인증 상태 확인이 완료된 후에만 초기 데이터 로드
    if (!authLoading && !isInitialized) {
      setLoading(true);
      fetchSeals().finally(() => {
        setIsInitialized(true);
        setLoading(false);
      });
    }
  }, [authLoading, isInitialized]);

  useEffect(() => {
    // 로그인 상태가 변경되고 초기화가 완료된 후에만 데이터 다시 가져오기
    if (isInitialized && !authLoading && seals.length > 0) {
      setIsRefreshing(true);
      fetchSeals(currentSortBy).finally(() => {
        setIsRefreshing(false);
      });
    }
  }, [isLoggedIn, isInitialized, authLoading]);

  const totalCount = seals.length;
  const collectedCount = seals.filter((seal) => seal.collected).length;

  return children({
    seals,
    loading: loading,
    error,
    totalCount,
    collectedCount,
    fetchSeals,
    refreshSeals,
    updateSealsWithSort,
  });
}
