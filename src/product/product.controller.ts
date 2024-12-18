import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards,Request, UnauthorizedException, Req, ParseIntPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Role } from 'src/auth/guards/roles.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { isValidObjectId } from 'mongoose';
import { ParseObjectIdPipe } from 'src/category/pipes/objectIdPipe.pipe';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  create(@Body() createProductDto: CreateProductDto,@Req() req) {
    
    
    return this.productService.create(createProductDto,req.user);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id',ParseObjectIdPipe) id: string) {
    console.log(typeof id)
    return this.productService.findOne(id);
  }
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @Patch(':id')
  update(@Param('id',ParseObjectIdPipe) id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Param('id',ParseObjectIdPipe) id: string) {
    return this.productService.remove(id);
  }
}

