import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceResolver } from './invoice.resolver';
import { InvoiceLineModule } from 'src/invoice-line/invoice-line.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Invoice } from './entities/invoice.entity';

@Module({
  imports: [
    InvoiceLineModule,
    SequelizeModule.forFeature([Invoice])
  ],
  providers: [
    InvoiceResolver,
    InvoiceService
  ],
})
export class InvoiceModule { }
