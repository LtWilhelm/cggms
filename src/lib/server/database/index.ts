import mongoose from 'mongoose';
// @ts-ignore
import {MONGODB_URI} from '$env/static/private';

mongoose.connect(MONGODB_URI);

export * from './models'
