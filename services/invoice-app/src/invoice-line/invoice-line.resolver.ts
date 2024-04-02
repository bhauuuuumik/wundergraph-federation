import { Resolver, Query, Mutation, Args, Int, ResolveReference, ResolveField, Parent } from '@nestjs/graphql';
import { InvoiceLineService } from './invoice-line.service';
import { InvoiceLine, Track } from './entities/invoice-line.entity';
import { CreateInvoiceLineInput } from './dto/create-invoice-line.input';
import { UpdateInvoiceLineInput } from './dto/update-invoice-line.input';

@Resolver(() => InvoiceLine)
export class InvoiceLineResolver {
  constructor(private readonly invoiceLineService: InvoiceLineService) { }

  @Mutation(() => InvoiceLine)
  createInvoiceLine(@Args('createInvoiceLineInput') createInvoiceLineInput: CreateInvoiceLineInput) {
    return this.invoiceLineService.create(createInvoiceLineInput);
  }

  @Query(() => [InvoiceLine], { name: 'invoiceLines' })
  findAll() {
    return this.invoiceLineService.findAll();
  }

  @Query(() => InvoiceLine, { name: 'invoiceLine' })
  findOne(@Args('invoice_line_id', { type: () => Int }) invoice_line_id: number) {
    return this.invoiceLineService.findOne(invoice_line_id);
  }

  @Mutation(() => InvoiceLine)
  updateInvoiceLine(@Args('updateInvoiceLineInput') updateInvoiceLineInput: UpdateInvoiceLineInput) {
    return this.invoiceLineService.update(updateInvoiceLineInput.invoice_line_id, updateInvoiceLineInput);
  }

  @Mutation(() => InvoiceLine)
  removeInvoiceLine(@Args('invoice_line_id', { type: () => Int }) invoice_line_id: number) {
    return this.invoiceLineService.remove(invoice_line_id);
  }

  @ResolveReference()
  resolveReference(reference: { __typename: string; invoice_line_id: number }) {
    return this.invoiceLineService.findOne(reference.invoice_line_id);
  }

  @ResolveField('track', () => Track)
  support_rep(@Parent() invoiceLine: InvoiceLine): {__typename: string, track_id: number} {
      return { __typename: 'Track', track_id: invoiceLine.track_id };
  }
}
