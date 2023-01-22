import { Schema, SchemaTypes, model } from 'mongoose';

const ContentSchema = new Schema({
  title: SchemaTypes.String,
  component: SchemaTypes.String
}, {strict: false});

export const Content = model('content', ContentSchema, 'content');
export const Revision = model('revision', ContentSchema);
