import { Args, Int, Parent, Query, ResolveField, ResolveReference, Resolver } from "@nestjs/graphql";
import { Employee } from "./models/employee.model";
import { EmployeesService } from "./employees.service";

@Resolver(() => Employee)
export class EmployeesResolver {
    constructor(
        private employeesService: EmployeesService
    ) {}

    @Query(() => Employee)
    async employee(@Args('employee_id', {type: () => Int}) employee_id: number) {
        return this.employeesService.findOne(employee_id);
    }

    @Query(() => [Employee])
    async employees() {
        return this.employeesService.findAll();
    }

    @ResolveField('supervisor', () => Employee)
    supervisor(@Parent() employee: Employee): Promise<Employee> {
        return this.employeesService.findOne(employee.reports_to);
    }

    @ResolveReference()
    resolveReference(reference: { __typename: string; employee_id: number }) {
        return this.employeesService.findOne(reference.employee_id);
    }
}