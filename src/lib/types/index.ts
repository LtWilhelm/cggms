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
}

export interface IMetadata {
  key: string;
  value: string;
}

export interface IComponent {
  _id: string;
  name: string;
  attributes: {
    _id: string;
    key: string;
    value: string;
  }[];
  metatags: {
    _id: string;
    key: string;
    value: string;
  }[];
}