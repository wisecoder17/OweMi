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
  traderId: { type: Schema.Types.ObjectId, ref: 'Trader', required: true },
  customerId: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
  amount: { type: Number, required: true },
  item: { type: String },
  dueDate: { type: Date, required: true },
  status: { type: String, enum: ["unpaid", "paid", "overdue"], default: "unpaid" },
  recordedAt: { type: Date, default: Date.now },
  paidAt: { type: Date }
}, { timestamps: true });

export default mongoose.model<IDebt>('Debt', DebtSchema);
