import { Request, Response, Router } from "express";
import { OrderEntity } from "../entities/OrderEntity";
import { getRepository } from "typeorm";
import { Product } from "../types/Product";
import { OrderItemEntity } from "../entities/OrderItemEntity";

export const orderRouter = Router();

// api/orders/create_order
orderRouter.post("/create_order", async (req: Request, res: Response) => {
  if (!req.body || !req.body.orderItems || req.body.orderItems.length === 0) {
    res.status(400).send({ message: "Cart is empty" });
  } else {
    const orderRepository = getRepository(OrderEntity);
    const orderItemRepository = getRepository(OrderItemEntity);
    const createdOrder = await orderRepository.save({
      customerName: req.body.customerName,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      totalPrice: req.body.totalPrice,
    });

    const orderItems = req.body.orderItems.map((item: Product) => {
      const orderItem = new OrderItemEntity();
      orderItem.id = item.id;
      orderItem.name = item.name;
      orderItem.price = item.price;
      orderItem.image = item.image;
      orderItem.order = createdOrder;
      return orderItem;
    });

    const savedOrderItems = await orderItemRepository.save(orderItems);

    res.json({ order: createdOrder, orderItems: savedOrderItems });
  }
});
