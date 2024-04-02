import { Injectable } from '@nestjs/common';
import { CreateInvoiceLineInput } from './dto/create-invoice-line.input';
import { UpdateInvoiceLineInput } from './dto/update-invoice-line.input';
import { InjectModel } from '@nestjs/sequelize';
import { InvoiceLine } from './entities/invoice-line.entity';

@Injectable()
export class InvoiceLineService {

  constructor(
    @InjectModel(InvoiceLine) private invoiceLineModel: typeof InvoiceLine
  ) { }
  create(createInvoiceLineInput: CreateInvoiceLineInput) {
    const { invoice_id, track_id, unit_price, quantity } = createInvoiceLineInput;
    return this.invoiceLineModel.create({
      invoice_id,
      track_id,
      unit_price,
      quantity
    });
  }

  findAll() {
    return this.invoiceLineModel.findAll();
  }

  findAllByInvoiceId(invoice_id: number) {
    return this.invoiceLineModel.findAll({
      where: {
        invoice_id
      }
    });
  }
  
  findOne(invoice_line_id: number) {
    return this.invoiceLineModel.findOne({
      where: {
        invoice_line_id
      }
    });
  }

  async update(invoice_line_id: number, updateInvoiceLineInput: UpdateInvoiceLineInput) {
    const { unit_price, quantity } = updateInvoiceLineInput;
    const [affectedCount] = await this.invoiceLineModel.update({
      unit_price,
      quantity
    }, {
      where: {
        invoice_line_id
      }
    });
    if (affectedCount > 0) {
      return this.findOne(invoice_line_id);
    }
  }

  remove(invoice_line_id: number) {
    return this.invoiceLineModel.destroy({
      where: {
        invoice_line_id
      }
    });
  }
}
