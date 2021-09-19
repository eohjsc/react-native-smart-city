import { useCallback, useState } from 'react';
import { axiosGet } from '../../../utils/Apis/axios';
import API from '../../../configs/API';

export default (unit, sensor) => {
  const [data, setData] = useState([]);
  const [isRefresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fetchData = useCallback(async (unit, sensor) => {
    setIsLoading(true);
    const { success, data } = await axiosGet(API.UNIT.MANAGE_ACCESS(unit.id), {
      params: { sensor_id: sensor.id },
    });
    if (success) {
      setData(data);
    }
    setIsLoading(false);
  }, []);

  const onRefresh = useCallback(async () => {
    setRefresh(true);
    await fetchData(unit, sensor);
    setRefresh(false);
  }, [unit, sensor, fetchData]);

  return {
    data,
    isRefresh,
    onRefresh,
    isLoading,
  };
};
