import { Schema, SchemaTypes, model } from 'mongoose';

const Attribute = new Schema({
  key: SchemaTypes.String,
  value: SchemaTypes.Mixed
})

const ContentType = new Schema({
  name: {
    type: SchemaTypes.String,
    required: true,
    unique: true
  },
  attributes: [Attribute],
  metatags: [Attribute]
})

export const contentTypes = model('contentType', ContentType);
