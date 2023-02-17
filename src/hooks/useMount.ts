import { useEffect } from 'react';
import { isFunction } from './utils/index';
import isDev from './utils/isDev';

const useMount = (fn: () => void) => {
  if (isDev) {
    if (!isFunction) {
      console.log(
        `useMount: parameter \`fn\` expected to be a function, but got "${typeof fn}".`
      );
    }
  }
  useEffect(() => {
    fn?.();
  }, []);
};

export default useMount;
