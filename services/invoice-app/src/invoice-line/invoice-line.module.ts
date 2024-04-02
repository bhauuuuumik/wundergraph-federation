import { Module } from '@nestjs/common';
import { InvoiceLineService } from './invoice-line.service';
import { InvoiceLineResolver } from './invoice-line.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { InvoiceLine } from './entities/invoice-line.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([InvoiceLine])
  ],
  providers: [InvoiceLineResolver, InvoiceLineService],
  exports: [InvoiceLineService]
})
export class InvoiceLineModule {}
