import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsResolver } from './items.resolver';

@Module({
  providers: [ItemsService, ItemsResolver]
})
export class ItemsModule {}
