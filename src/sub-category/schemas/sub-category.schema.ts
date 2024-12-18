import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type subCategoryDocument = HydratedDocument<SubCategory>;

@Schema({ timestamps: true })
export class SubCategory {
  @Prop({
    required: true,
    minlength: [2, 'subCategory name is very short'],
    maxlength: [20, 'subCategory name is very long'],
    type: String,
    unique:true
  })
  name: string;
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    required: [true, 'SubCategory must be belong to parent category']

    
  })
  category: string;
}

export const subCategorySchema = SchemaFactory.createForClass(SubCategory);
