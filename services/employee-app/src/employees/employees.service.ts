import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Employee } from "./models/employee.model";


@Injectable()
export class EmployeesService {
    constructor(@InjectModel(Employee) private employeeModel: typeof Employee) { }

    findAll(): Promise<Employee[]> {
        return this.employeeModel.findAll();
    }

    findOne(employee_id: number): Promise<Employee> {
        return this.employeeModel.findOne({
            where: {
                employee_id
            }
        });
    }

    async remove(employee_id: number): Promise<void> {
        const employee = await this.findOne(employee_id);
        await employee.destroy();
    }
}