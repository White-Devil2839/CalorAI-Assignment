export type RootStackParamList = {
  Intro: undefined;
  Swipe: undefined;
  Results: undefined;
  Faq: undefined;
  Search: undefined;
};

export const ROUTES = {
  Intro: 'Intro',
  Swipe: 'Swipe',
  Results: 'Results',
  Faq: 'Faq',
  Search: 'Search',
} as const;

export type RouteName = keyof RootStackParamList;
