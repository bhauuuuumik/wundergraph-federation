import { Directive, Field, ID, ObjectType } from "@nestjs/graphql";
import { AutoIncrement, BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";

@ObjectType()
@Directive('@key(fields: "employee_id")')
@Table({
    tableName: 'employee',
    timestamps: false
})
export class Employee extends Model {
    
    @PrimaryKey
    @AutoIncrement
    @Column
    @Field(() => ID)
    employee_id: number;

    @Column
    @Field({nullable: false})
    first_name: string;

    @Column
    @Field({nullable: false})
    last_name: string;

    @Column
    @Field()
    title?: string;

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
    @ForeignKey(() => Employee)
    reports_to?: number;

    @Field(() => Employee, {nullable: true})
    @BelongsTo(() => Employee, 'employee_id')
    supervisor?: Employee;

    @Column
    @Field()
    birth_date?: Date;

    @Column
    @Field()
    hire_date?: Date;
}