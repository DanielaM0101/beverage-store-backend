import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Product } from '@prisma/client';
import { CreateProductDto } from './create-product.dto';
import { UpdateProductDto } from './update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      const createdProduct = await this.prisma.product.create({
        data: {
          name: createProductDto.name,
          description: createProductDto.description,
          price: createProductDto.price,
          // Añade aquí otros campos según sea necesario
        },
      });
      return createdProduct;
    } catch (error) {
      throw new Error(`Error creating product: ${error.message}`);
    }
  }

  async findAll(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    try {
      const updatedProduct = await this.prisma.product.update({
        where: { id },
        data: {
          name: updateProductDto.name,
          description: updateProductDto.description,
          price: updateProductDto.price,
          // Añade aquí otros campos según sea necesario
        },
      });
      return updatedProduct;
    } catch (error) {
      throw new Error(`Error updating product with ID ${id}: ${error.message}`);
    }
  }

  async remove(id: number): Promise<Product> {
    try {
      const deletedProduct = await this.prisma.product.delete({ where: { id } });
      if (!deletedProduct) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }
      return deletedProduct;
    } catch (error) {
      throw new Error(`Error deleting product with ID ${id}: ${error.message}`);
    }
  }
}
