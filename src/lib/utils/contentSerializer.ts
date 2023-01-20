export const serializeContent = (data: FormData) => {
  const name = data.get('name');

  const serialized: any = {};

  for (const [fieldName, fieldValue] of data.entries()) {
    if (fieldName === 'name') continue;
    const dir = fieldName.split('__');
    let last = serialized;

    for (let i = 0; i < dir.length; i++) {
      const key = dir[i];
      const next = dir[i + 1];

      if (!next) {
        if (!Number.isNaN(Number(key))) {
          last[Number(key)] = fieldValue;
        } else
          last[key] = fieldValue;
      }
      if (!Number.isNaN(Number(next))) {
        last[key] = [...last[key]]
      }
      last = last[key];
    }
  }

  return serialized;
}