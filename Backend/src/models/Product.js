import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, index: 'text' },
    description: { type: String, default: '' },
    price: { type: Number, required: true },
    images: [{ type: String }],
    category: { type: String, index: true },
    stock: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
  },
  { timestamps: true }
);

productSchema.index({ title: 'text', description: 'text', category: 'text' });

export const Product = mongoose.model('Product', productSchema);


