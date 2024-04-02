import { Module } from "@nestjs/common";
import { EmployeesResolver } from "./employees.resolver";
import { EmployeesService } from "./employees.service";
import { Employee } from "./models/employee.model";
import { SequelizeModule } from "@nestjs/sequelize";


@Module({
    imports: [SequelizeModule.forFeature([Employee])],
    providers: [EmployeesResolver, EmployeesService]
})
export class EmployeesModule {}