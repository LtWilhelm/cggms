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

export interface IAttribute<T = string> {
  _id: string;
  key: string;
  value: T | string;
  attributes?: IAttribute[];
}

export interface IComponent<T = string> {
  _id: string;
  name: string;
  attributes: IAttribute[];
  metatags: IAttribute[];
  components: T[];
}

export interface IContent {
  _id: string;
  component: string;
  title: string;
  refs: string[];
  [key: string]: string | number | (string | number)[];
}
