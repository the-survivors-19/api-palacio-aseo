import { Sale } from "src/sales/entities/sale.entity";
import { WeightProduct } from "src/weight_products/entities/weight_product.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('sales_details')
export class SalesDetails {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'double',
    default: 0
  })
  quantity: number;

  @Column({
    type: 'double',
    default: 0
  })
  price: number;

  @ManyToOne(() => Sale, sale => sale.id)
  @JoinColumn({
    name: 'sale_id'
  })
  sale: Sale;

  @ManyToOne(() => WeightProduct, weightProduct => weightProduct.id)
  @JoinColumn({
    name: 'product_id'
  })
  product: WeightProduct;

}