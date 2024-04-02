import { Args, Int, Parent, Query, ResolveField, ResolveReference, Resolver } from "@nestjs/graphql";
import { Customer } from "./models/customer.model";
import { CustomersService } from "./customers.service";
import { Employee } from "./models/employee.model";

@Resolver(() => Customer)
export class CustomersResolver {
    constructor(
        private customersService: CustomersService
    ) { }

    @Query(() => Customer)
    async customer(@Args('customer_id', { type: () => Int }) customer_id: number) {
        return this.customersService.findOne(customer_id);
    }

    @Query(() => [Customer])
    async customers() {
        return this.customersService.findAll();
    }

    @ResolveField('support_rep', () => Employee)
    support_rep(@Parent() customer: Customer): { __typename: string, employee_id: number } {
        return { __typename: 'Employee', employee_id: customer.support_rep_id };
    }

    @ResolveReference()
    resolveReference(reference: { __typename: string; customer_id: number }) {
        return this.customersService.findOne(reference.customer_id);
    }
}