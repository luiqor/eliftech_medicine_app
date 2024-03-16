import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { SellerShopEntity } from "./SellerShopEntity";

@Entity("products")
export class ProductEntity extends BaseEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  name!: string;

  @Column({ type: "numeric" })
  price!: number;

  @Column()
  image!: string;

  @ManyToMany(() => SellerShopEntity, (shop) => shop.products)
  @JoinTable()
  sellerShops!: SellerShopEntity[];

  @Column({ type: "int", default: 0 })
  countInStock!: number;
}
