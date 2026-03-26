import mongoose, { Schema, Document } from 'mongoose';

export interface IDebt extends Document {
  traderId: mongoose.Types.ObjectId;
  customerId: mongoose.Types.ObjectId;
  amount: number;
  item?: string;
  dueDate: Date;
  status: "unpaid" | "paid" | "overdue";
  recordedAt: Date;
  paidAt?: Date;
}

const DebtSchema: Schema = new Schema({
  traderId: { type: Schema.Types.ObjectId, ref: 'Trader', required: true, index: true },
  customerId: { type: Schema.Types.ObjectId, ref: 'Customer', required: true, index: true },
  amount: { type: Number, required: true, min: 0 },
  item: { type: String, trim: true },
  dueDate: { type: Date, required: true },
  status: { type: String, enum: ["unpaid", "paid", "overdue"], default: "unpaid", index: true },
  recordedAt: { type: Date, default: Date.now, index: true },
  paidAt: { type: Date }
}, { timestamps: true });

export default mongoose.model<IDebt>('Debt', DebtSchema);
