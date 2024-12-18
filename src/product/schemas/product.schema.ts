import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product {
  @Prop({
    required: true,
    minlength: [2, 'Product name is very short'],
    maxlength: [20, 'Product name is very long'],
    type: String,
  })
  name: string;
  @Prop({
    required: [true, 'SubCategory must be belong to parent category'],
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }]
    
  })
  category: string;
  @Prop({
    required: true,
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory' }]

  })
  subcategory: string;
  @Prop({
    required: true,
    min: [1, 'price must be 1 pound at least'],
    max: [5000, 'price must be 5000 pound at most'],
    type:Number
  })
  price: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
