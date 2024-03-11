import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm"

@Entity('product')
export class ProductEntity extends BaseEntity{
    @PrimaryColumn()
    id!: string

    @Column()
    name!: string

    @Column({type: 'numeric'})
    price!: number

    @Column()
    image!: string

    @Column('text', { array: true })
    sellerShop!: string[];

    @Column({type: 'int', default: 0})
    countInStock!: number
}