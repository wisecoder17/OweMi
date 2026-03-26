import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

// Load env directly to bypass module resolution issues in standalone script
dotenv.config({ path: path.join(__dirname, '../../.env') });

const MONGODB_URI = process.env.MONGODB_URI;

// Quick inline schema for seeding (Don't depend on model imports to avoid resolution issues)
const TraderSchema = new mongoose.Schema({
  name: String,
  businessName: String,
  phone: String,
});

const Trader = mongoose.model('Trader', TraderSchema);

async function seed() {
  if (!MONGODB_URI) {
    console.error('No MONGODB_URI found in .env. Current PWD:', process.cwd());
    process.exit(1);
  }

  try {
    // Force specific timeout etc for a safe seed
    await mongoose.connect(MONGODB_URI, { connectTimeoutMS: 20000 });
    console.log('Connected to Atlas for seeding...');

    const traderId = "60d0fe4f5311236168a109ca";
    
    // Upsert the main demo trader record
    await Trader.findByIdAndUpdate(
      new mongoose.Types.ObjectId(traderId), 
      { 
        name: "Richard", 
        businessName: "Richard General Stores", 
        phone: "08012345678" 
      },
      { upsert: true, new: true }
    );

    console.log('✅ TRADER SEED SUCCESSFUL.');
    console.log('You can now check your Atlas dashboard—the "traders" collection is created.');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', (error as Error).message);
    process.exit(1);
  }
}

seed();
