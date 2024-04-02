import { Directive, Field, ID, ObjectType } from "@nestjs/graphql";
import { AutoIncrement, Column, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Employee } from "./employee.model";

@ObjectType()
@Directive(`@key(fields: "customer_id")`)
@Table({
    tableName: 'customer',
    timestamps: false
})
export class Customer extends Model {
    
    @PrimaryKey
    @AutoIncrement
    @Column
    @Field(() => ID)
    customer_id: number;

    @Column
    @Field({nullable: false})
    first_name: string;

    @Column
    @Field({nullable: false})
    last_name: string;

    @Column
    @Field()
    company?: string;

    @Column
    @Field()
    address?: string;

    @Column
    @Field()
    city?: string;

    @Column
    @Field()
    state?: string;

    @Column
    @Field()
    country?: string;

    @Column
    @Field()
    postal_code?: string;

    @Column
    @Field()
    phone?: string;

    @Column
    @Field()
    fax?: string;

    @Column
    @Field()
    email?: string;

    @Column
    @Field()
    support_rep_id?: number;

    @Field(() => Employee)
    support_rep?: Employee;
}