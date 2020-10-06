import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import Order from '../infra/typeorm/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

@injectable()
class CreateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) { }

  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const customer = await this.customersRepository.findById(customer_id);

    if (!customer) {
      throw new AppError('Could not find customer with this id');
    }

    const products_list = await this.productsRepository.findAllById(products);

    if (products_list.length !== products.length) {
      throw new AppError('Some products does not exist');
    }

    const products_insufficient_quantity = products_list.find(stockProduct => {
      const product_order = products.find(
        product => stockProduct.id === product.id,
      );
      return product_order && stockProduct.quantity < product_order.quantity;
    });

    if (products_insufficient_quantity) {
      throw new AppError('Some products with insufficient available quantity');
    }

    const order_products = products.map(product => {
      const stockProduct = products_list.find(item => item.id === product.id);
      const { id: product_id, quantity } = product;
      return { product_id, quantity, price: stockProduct?.price || 0 };
    });

    const order = await this.ordersRepository.create({
      customer,
      products: order_products,
    });

    const updatedProducts = order_products.map(order_product => {
      const product = products_list.find(
        item => item.id === order_product.product_id,
      );
      const updateProduct = {
        id: order_product.product_id,
        quantity: product
          ? product.quantity - order_product.quantity
          : order_product.quantity,
      };
      return updateProduct;
    });

    await this.productsRepository.updateQuantity(updatedProducts);

    return order;
  }
}

export default CreateOrderService;
