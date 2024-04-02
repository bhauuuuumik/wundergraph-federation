import { Resolver, Query, Mutation, Args, Int, ResolveReference, Parent, ResolveField } from '@nestjs/graphql';
import { InvoiceService } from './invoice.service';
import { Customer, Invoice } from './entities/invoice.entity';
import { CreateInvoiceInput } from './dto/create-invoice.input';
import { UpdateInvoiceInput } from './dto/update-invoice.input';
import { InvoiceLine } from 'src/invoice-line/entities/invoice-line.entity';
import { InvoiceLineService } from 'src/invoice-line/invoice-line.service';

@Resolver(() => Invoice)
export class InvoiceResolver {
  constructor(
    private readonly invoiceService: InvoiceService,
    private readonly invoiceLineService: InvoiceLineService,
  ) { }

  @Mutation(() => Invoice)
  createInvoice(@Args('createInvoiceInput') createInvoiceInput: CreateInvoiceInput) {
    return this.invoiceService.create(createInvoiceInput);
  }

  @Query(() => [Invoice], { name: 'invoices' })
  findAll() {
    return this.invoiceService.findAll();
  }

  @Query(() => Invoice, { name: 'invoice' })
  findOne(@Args('invoice_id', { type: () => Int }) invoice_id: number) {
    return this.invoiceService.findOne(invoice_id);
  }

  @Mutation(() => Invoice)
  updateInvoice(@Args('updateInvoiceInput') updateInvoiceInput: UpdateInvoiceInput) {
    return this.invoiceService.update(updateInvoiceInput.invoice_id, updateInvoiceInput);
  }

  @Mutation(() => Invoice)
  removeInvoice(@Args('invoice_id', { type: () => Int }) invoice_id: number) {
    return this.invoiceService.remove(invoice_id);
  }

  @ResolveReference()
  resolveReference(reference: { __typename: string; invoice_id: number }) {
    return this.invoiceService.findOne(reference.invoice_id);
  }

  @ResolveField('invoiceLines', () => [InvoiceLine])
  getInvoiceLines(@Parent() invoice: Invoice) {
    return this.invoiceLineService.findAllByInvoiceId(invoice.invoice_id);
  }

  @ResolveField('customer', () => Customer)
  getCustomer(@Parent() invoice: Invoice): {__typename: string, customer_id: number} {
      return { __typename: 'Customer', customer_id: invoice.customer_id };
  }
}
