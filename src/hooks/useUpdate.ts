import { useCallback } from 'react';
import { useState } from 'react';
const useUpdate = () => {
  const [, setState] = useState({});
  return useCallback(() => setState({}), []);
};

export default useUpdate;
