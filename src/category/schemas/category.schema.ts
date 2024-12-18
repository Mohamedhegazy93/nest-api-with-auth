import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema({ timestamps: true })
export class Category {
  @Prop({
    required: true,
    minlength: [2, 'category name is very short'],
    maxlength: [20, 'category name is very long'],
    type: String,
  })
  name: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
