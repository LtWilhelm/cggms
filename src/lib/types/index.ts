export type fieldTypes =
| "string"
| "number"
| "boolean"
| "reference"
| "component"
| "content"
| "";

export interface IField {
  name: string;
  type: fieldTypes;
  ref: string;
  attributes?: {
    key: string;
    value: string | number;
  }[]
}

export interface IMetadata {
  key: string;
  value: string;
}

export interface IAttribute<T = string, K = string> {
  _id?: string;
  key: string;
  value: T | string;
  attributes?: IAttribute<K>[];
}

export interface IComponent{
  _id: string;
  name: string;
  attributes: IAttribute[];
  metatags: IAttribute[];
  components: string[];
}

export type Block = string | number | (string | number)[];

export interface IContent {
  _id: string;
  component: string;
  title: string;
  refs: string[];
  [key: string]: Block | Record<string, Block>;
}
