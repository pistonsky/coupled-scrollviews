import { ScrollToCallback, CoupledScrollViewsHookResult } from './app/lib/react-native-coupled-scrollviews/types';

declare module 'react-native-coupled-scrollviews' {
  export function useCoupledScrollViews(mockedScrollTo?: ScrollToCallback): CoupledScrollViewsHookResult;
}
