import { Schema, SchemaTypes, model } from 'mongoose';

const Attribute = new Schema({
  key: SchemaTypes.String,
  value: SchemaTypes.Mixed,
  attributes: [{
    key: SchemaTypes.String,
    value: SchemaTypes.Mixed,
  }]
})

const ContentTypeSchema = new Schema({
  name: {
    type: SchemaTypes.String,
    required: true,
    unique: true
  },
  attributes: [Attribute],
  metatags: [Attribute],
})

export const Component = model('component', ContentTypeSchema);
