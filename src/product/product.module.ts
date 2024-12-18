import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product } from './entities/product.entity';
import { ProductSchema } from './schemas/product.schema';
import { Category } from 'src/category/entities/category.entity';
import { CategorySchema } from 'src/category/schemas/category.schema';
import { SubCategory } from 'src/sub-category/entities/sub-category.entity';
import { subCategorySchema } from 'src/sub-category/schemas/sub-category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: Category.name, schema: CategorySchema },
      { name: SubCategory.name, schema: subCategorySchema },
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
