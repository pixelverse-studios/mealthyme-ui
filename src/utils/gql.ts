export const isHandledError = (data: { __typename: string }) =>
  data.__typename === 'Errors'
