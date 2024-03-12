import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm"
import { OrderEntity } from "./OrderEntity"

@Entity('order_items')
export class OrderItemEntity extends BaseEntity{
    @PrimaryColumn()
    id!: string

    @Column()
    name!: string

    @Column({type: 'numeric'})
    price!: number

    @Column()
    image!: string

    @ManyToOne(() => OrderEntity, (order) => order.items)
    order!: OrderEntity
}