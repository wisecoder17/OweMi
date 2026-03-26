import mongoose, { Schema, Document } from 'mongoose';

export interface ITrader extends Document {
  businessName: string;
  phone?: string;
  email?: string;
  passwordHash?: string;
  createdAt: Date;
}

const TraderSchema: Schema = new Schema({
  businessName: { type: String, required: true },
  phone: { type: String },
  email: { type: String },
  passwordHash: { type: String },
}, { timestamps: true });

export default mongoose.model<ITrader>('Trader', TraderSchema);
