import { Directive, Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Directive('@extends')
@Directive(`@key(fields: "employee_id")`)
export class Employee {
    @Field(() => ID)
    @Directive('@external')
    employee_id: number;
}