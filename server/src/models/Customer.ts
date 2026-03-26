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
    signal: "good" | "caution" | "risk" | "none";
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
  bvn: { type: String, required: true, trim: true },
  nin: { type: String, trim: true },
  name: { type: String, required: true, trim: true },
  photoUrl: { type: String },
  phone: { type: String, trim: true },
  dob: { type: Date },
  verificationType: { type: String, enum: ["BVN", "NIN"], default: "BVN" },
  identityConfirmed: { type: Boolean, default: false },
  creditStatus: {
    hasHistory: { type: Boolean, default: false },
    signal: { type: String, enum: ["good", "caution", "risk", "none"], default: "none" },
    score: { type: Number, default: null },
    summary: { type: String },
    history: { type: Array, default: [] }
  },
  owemiScore: { type: Number }
}, { timestamps: true });

// Compound index for unique verification per trader relationship (Production Safety)
CustomerSchema.index({ traderId: 1, bvn: 1 }, { unique: true });

export default mongoose.model<ICustomer>('Customer', CustomerSchema);
