import {Module} from '@nestjs/common';
import {NewsServiceAdmin} from './services/news.service.admin';
import {NewsControllerAdmin} from './controllers/news.controller.admin';
import {NewsServicePublic} from './services/news.service.public';
import {NewsControllerPublic} from './controllers/news.controller.public';

@Module({
  providers: [NewsServiceAdmin, NewsServicePublic],
  controllers: [NewsControllerAdmin, NewsControllerPublic],
})
export class NewsModule {
}