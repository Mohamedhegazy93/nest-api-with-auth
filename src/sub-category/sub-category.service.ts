import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { SubCategory } from './entities/sub-category.entity';
import { Model } from 'mongoose';
import { Category } from 'src/category/entities/category.entity';

@Injectable()
export class SubCategoryService {
  constructor(
    @InjectModel(SubCategory.name) private subCategoryModel: Model<SubCategory>,
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async create(
    createSubCategoryDto: CreateSubCategoryDto,
  ): Promise<SubCategory> {
    const { category } = createSubCategoryDto;
    const categoryget = await this.categoryModel.findById(category);
    if (!categoryget) {
      throw new NotFoundException(
        'this category is not found in category list',
      );
    }
    return this.subCategoryModel.create(createSubCategoryDto);
  }

  findAll() {
    return this.subCategoryModel
      .find()
      .select('_id name category')
      .populate('category', 'name');
  }

  async findOne(id: string) {
    const subCategory = await this.subCategoryModel.findById(id);
    if (!subCategory) {
      throw new NotFoundException('no subcategory for this id');
    }
    return this.subCategoryModel
      .findById(id)
      .select('id name')
      .populate('category', 'name -_id');
  }

  async update(id: string, updateSubCategoryDto: UpdateSubCategoryDto) {
    const subCategory = await this.subCategoryModel.findById(id);
    if (!id) {
      throw new NotFoundException('no subcategory for this id');
    }
    return this.subCategoryModel.findByIdAndUpdate(id, updateSubCategoryDto);
  }

  async remove(id: string) {
    const subcategory = await this.subCategoryModel.findByIdAndDelete(id);
    if (!subcategory) {
      throw new NotFoundException('no subcategory for this id');
    }
    return {
      message: 'subcategory deleted',
      data: subcategory,
    };
  }
}
