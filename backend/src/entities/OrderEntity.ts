import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { OrderItemEntity } from "./OrderItemEntity"

@Entity('orders')
export class OrderEntity extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column()
    customerName!:string 
    
    @Column()
    email!:string 
    
    @Column()
    phone!:string
    
    @Column()
    address!:string
    
    @OneToMany(() => OrderItemEntity, (item) => item.order, {cascade: true})
    items!: OrderItemEntity[]

    @Column({type: 'numeric'})
    totalPrice!: number

    @Column({default: false})
    isPaid!: boolean

    @Column({default: false})
    isShipped!: boolean
}