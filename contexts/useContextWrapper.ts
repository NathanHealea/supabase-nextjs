import { Context, useContext } from 'react';

interface ContextConfig {
  contextName: string;
  providerName: string;
}

const useContextWrapper = <T extends unknown>(
  ReactContext: Context<T>,
  config: ContextConfig
): T => {
  const context = useContext(ReactContext);
  const { contextName, providerName } = config;

  if (!context) {
    throw new Error(`${contextName} must be used within a ${providerName}`);
  }

  return context;
};

export default useContextWrapper;
