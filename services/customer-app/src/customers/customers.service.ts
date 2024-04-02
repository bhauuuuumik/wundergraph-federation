import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Customer } from "./models/customer.model";

@Injectable()
export class CustomersService {
    constructor(@InjectModel(Customer) private customerModel: typeof Customer) { }

    async findAll(): Promise<Customer[]> {
        return this.customerModel.findAll();
    }

    async findOne(customer_id: number): Promise<Customer> {
        return this.customerModel.findOne({
            where: {
                customer_id
            }
        });
    }
}