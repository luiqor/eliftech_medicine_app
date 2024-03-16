import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ProductEntity } from "./ProductEntity";

@Entity("sellershops")
export class SellerShopEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  shopName!: string;

  @ManyToMany(() => ProductEntity, (product) => product.sellerShops)
  @JoinTable()
  products!: ProductEntity[];
}
