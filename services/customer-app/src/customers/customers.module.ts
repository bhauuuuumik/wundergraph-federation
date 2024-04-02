import { Module } from "@nestjs/common";
import { CustomersResolver } from "./customers.resolver";
import { CustomersService } from "./customers.service";
import { Customer } from "./models/customer.model";
import { SequelizeModule } from "@nestjs/sequelize";


@Module({
    imports: [SequelizeModule.forFeature([Customer])],
    providers: [CustomersResolver, CustomersService]
})
export class CustomersModule {}