import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './entities/product.entity';
import { Model } from 'mongoose';
import { Category } from 'src/category/entities/category.entity';
import { SubCategory } from 'src/sub-category/entities/sub-category.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private ProductModel: Model<Product>,
    @InjectModel(Category.name) private CategoryModel: Model<Category>,
    @InjectModel(SubCategory.name) private SubCategoryModel: Model<SubCategory>,
  ) {}

  async create(createProductDto: CreateProductDto, payload) {
    console.log(payload);

    //validate that categort exist in database
    const { category } = createProductDto;

    const categoryget = await this.CategoryModel.findById(category);
    if (!categoryget) {
      throw new NotFoundException(
        'this category is not found in category list',
      );
    }
    //validate that subcategory belong to this category
    const { subcategory } = createProductDto;
    const subcategoryId = await this.SubCategoryModel.findById(subcategory);
    if (!subcategoryId) {
      throw new NotFoundException('this subcategory dose not found');
    }

    //validate that subcategory belong to this category ot not
    const categoryOfSubCategory = subcategoryId.category.toString();

    if (category !== categoryOfSubCategory) {
      throw new NotFoundException(
        'this subcategory dose not belong to this category',
      );
    }

    return this.ProductModel.create(createProductDto);
  }

  findAll() {
    return this.ProductModel.find();
  }

  async findOne(id: string) {
    const product = await this.ProductModel.findById(id);
    if (!product) {
      throw new NotFoundException('no product for this id');
    }
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.ProductModel.findByIdAndUpdate(
      id,
      updateProductDto
    );
    if (!product) {
      throw new NotFoundException('no product for this id');
    }
    return product;
  }

  async remove(id: string) {
    const product = await this.ProductModel.findByIdAndDelete(id);
    if (!product) {
      throw new NotFoundException('no product for this id');
    }
    return {
      message: 'product deleted',
      data: product,
    };
  }
}
