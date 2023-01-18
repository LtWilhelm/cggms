import mongoose from 'mongoose';
import {MONGODB_URI} from '$env/static/private';

mongoose.connect(MONGODB_URI);

export * from './models'
