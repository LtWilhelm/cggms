type StructuredFormData =
  | string
  | boolean
  | number
  | File
  | StructuredFormData[];

export function formBody(body: FormData) {
  return [...body.entries()].reduce((data, [k, v]) => {
    let value: StructuredFormData = v;
    if (v === "true") value = true;
    if (v === "false") value = false;
    if (!isNaN(Number(v))) value = Number(v);

    try {
      const parsed = JSON.parse(value as string);
      if (parsed) value = parsed
    } catch {
      // 
    }

    if (k in data) {
      const val = data[k];
      value = Array.isArray(val) ? [...val, value] : [val, value];
    }

    data[k] = value;

    return data;
  }, {} as Record<string, StructuredFormData>);
}