import type { IAttribute } from './types';

const typeAttributes: Record<string, IAttribute<string | boolean | number>[]> = {
  'string': [
    {
      key: 'formatted',
      value: false
    },
  ],
  'long': [
    {
      key: 'formatted',
      value: false
    },
  ],
}

export const getAttributes = (type: string) => {
  if (!type) return [];
  const atts: IAttribute<string | boolean | number>[] = [
    {
      key: 'limit',
      value: 1,
      attributes: [{
        key: 'help',
        value: 'Set to `0` for unlimited values'
      }]
    },
    ...typeAttributes[type] || []
  ]

  return atts;
}