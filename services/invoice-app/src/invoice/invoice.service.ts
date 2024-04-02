import { Injectable } from '@nestjs/common';
import { CreateInvoiceInput } from './dto/create-invoice.input';
import { UpdateInvoiceInput } from './dto/update-invoice.input';
import { Invoice } from './entities/invoice.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectModel(Invoice) private invoiceModel: typeof Invoice
  ) { }
  create(createInvoiceInput: CreateInvoiceInput) {
    const {
      invoice_date, customer_id, billing_address, billing_city,
      billing_country, billing_postal_code, billing_state, total
    } = createInvoiceInput;
    return this.invoiceModel.create({
      invoice_date,
      customer_id,
      billing_address,
      billing_city,
      billing_country,
      billing_postal_code,
      billing_state,
      total
    });
  }

  findAll() {
    return this.invoiceModel.findAll();
  }

  findAllByCustomerId(customer_id: number) {
    return this.invoiceModel.findAll({
      where: {
        customer_id
      }
    });
  }

  findOne(invoice_id: number) {
    return this.invoiceModel.findOne({
      where: {
        invoice_id
      }
    });
  }

  async update(invoice_id: number, updateInvoiceInput: UpdateInvoiceInput) {
    const { invoice_date, billing_address, billing_city, billing_country,
      billing_state, billing_postal_code, total
    } = updateInvoiceInput;

    const [affectedCount] = await this.invoiceModel.update({
      invoice_date, billing_address, billing_city, billing_country,
      billing_state, billing_postal_code, total
    }, {
      where: {
        invoice_id
      }
    });

    if (affectedCount > 0) {
      return this.findOne(invoice_id);
    }
  }

  remove(invoice_id: number) {
    return this.invoiceModel.destroy({
      where: {
        invoice_id
      }
    });
  }
}
