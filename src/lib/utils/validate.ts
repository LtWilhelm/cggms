import type { Block, IAttribute } from '$lib/types';

export const validate = (value: Block | undefined, attribute: IAttribute) => {
  const validators = attribute.attributes?.filter(a => a.key === 'validator') || [];

  for (const validator of validators) {
    switch (validator.value) {
      case 'required':
        if (!value) throw 'Field is required';
        break;
      default:
        break;
    }
  } 
}