import mongoose, { Schema, Document } from 'mongoose';

export interface ICustomer extends Document {
  traderId: mongoose.Types.ObjectId;
  bvn: string;
  nin?: string;
  name: string;
  photoUrl?: string;
  phone?: string;
  dob?: Date;
  verificationType: "BVN" | "NIN";
  identityConfirmed: boolean;
  creditStatus: {
    hasHistory: boolean;
    score?: number | null;
    summary?: string;
    history?: any[];
  };
  owemiScore?: number;
  createdAt: Date;
  updatedAt: Date;
}

const CustomerSchema: Schema = new Schema({
  traderId: { type: Schema.Types.ObjectId, ref: 'Trader', required: true },
  bvn: { type: String, required: true },
  nin: { type: String },
  name: { type: String, required: true },
  photoUrl: { type: String },
  phone: { type: String },
  dob: { type: Date },
  verificationType: { type: String, enum: ["BVN", "NIN"], default: "BVN" },
  identityConfirmed: { type: Boolean, default: false },
  creditStatus: {
    hasHistory: { type: Boolean, default: false },
    score: { type: Number, default: null },
    summary: { type: String },
    history: { type: Array, default: [] }
  },
  owemiScore: { type: Number }
}, { timestamps: true });

export default mongoose.model<ICustomer>('Customer', CustomerSchema);
