import { useState, useEffect, useRef, useCallback } from 'react';
import { useGeolocation } from './useGeolocation';
import { getSpotList } from '../apis/spotApi';

export const useSearchData = (searchQuery, sortBy) => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  const observerRef = useRef();
  const location = useGeolocation();
  const isRequestingRef = useRef(false);

  const transformApiResponse = (apiData) => {
    return apiData.map((item) => ({
      contentId: item.contentid || item.contentId || item.id,
      title: item.title,
      firstimage: item.firstimage,
      distance: item.distance,
      addr1: item.addr1,
      type: item.type,
      ttsExist: item.ttsExist,
      imageUrl: item.firstimage,
      description: item.addr1,
      tags: [item.type],
      name: item.title,
      id: item.contentid || item.contentId || item.id,
    }));
  };

  const fetchSpotList = useCallback(
    async (page = 1, append = false, query = searchQuery) => {
      if (!query?.trim() || isRequestingRef.current) return;

      try {
        isRequestingRef.current = true;
        setLoading(true);

        const latitude =
          location.loaded && !location.error
            ? location.coordinates.lat
            : 36.5759985;
        const longitude =
          location.loaded && !location.error
            ? location.coordinates.lng
            : 128.505832;

        const response = await getSpotList(
          page,
          10,
          query,
          sortBy.key,
          latitude,
          longitude
        );

        let responseData = null;
        if (response.data && response.data.content) {
          responseData = response.data;
        } else if (response.content) {
          responseData = response;
        }

        if (responseData?.content) {
          const transformedData = transformApiResponse(responseData.content);

          if (append) {
            setSearchResults((prev) => [...prev, ...transformedData]);
          } else {
            setSearchResults(transformedData);
          }

          setTotalElements(responseData.totalElements);
          setHasMore(!responseData.last);
          setCurrentPage(responseData.pageNum + 2);
        }
      } catch (error) {
        console.error('스팟 목록 조회 실패:', error);

        if (error.response?.status === 400) {
          console.error('잘못된 요청 (400):', {
            message: error.message,
            status: error.response.status,
            data: error.response.data,
          });
        }

        if (error.response?.status === 500) {
          console.error('서버 내부 오류 (500):', {
            message: error.message,
            status: error.response.status,
            data: error.response.data,
          });
        }

        setLoading(false);

        if (error.response?.status === 400 || error.response?.status === 500) {
          setHasMore(false);
        }
      } finally {
        setLoading(false);
        isRequestingRef.current = false;
      }
    },
    [sortBy.key]
  );

  const executeSearch = useCallback(() => {
    if (searchQuery?.trim()) {
      setSearchResults([]);
      setCurrentPage(1);
      setHasMore(true);
      fetchSpotList(1, false, searchQuery);
    }
  }, [fetchSpotList, searchQuery]);

  useEffect(() => {
    if (searchQuery?.trim() && searchResults.length > 0) {
      setSearchResults([]);
      setCurrentPage(1);
      setHasMore(true);
      fetchSpotList(1, false, searchQuery);
    }
  }, [sortBy.key, fetchSpotList]);

  const lastElementRef = useCallback(
    (node) => {
      if (loading || isRequestingRef.current) return;

      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore && !isRequestingRef.current) {
          fetchSpotList(currentPage, true, searchQuery);
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [loading, hasMore, currentPage, fetchSpotList, searchResults.length]
  );

  return {
    searchResults,
    loading,
    hasMore,
    totalElements,
    lastElementRef,
    executeSearch,
  };
};
