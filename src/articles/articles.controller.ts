import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ApiTags, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { ArticleEntity } from './entities/article.entity';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @ApiTags('articles')
  @ApiCreatedResponse({ type: ArticleEntity })
  async create(@Body() createArticleDto: CreateArticleDto) {
    return await this.articlesService.create(createArticleDto);
  }

  @Get()
  @ApiTags('articles')
  @ApiOkResponse({ type: [ArticleEntity] })
  async findAll() {
    return await this.articlesService.findAll();
  }

  @Get('drafts')
  @ApiTags('articles')
  @ApiOkResponse({ type: [ArticleEntity] })
  async findDrafts() {
    return await this.articlesService.findDrafts();
  }

  @Get(':id')
  @ApiTags('articles')
  @ApiOkResponse({ type: ArticleEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.articlesService.findOne(id);
  }

  @Patch(':id')
  @ApiTags('articles')
  @ApiOkResponse({ type: ArticleEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    return await this.articlesService.update(id, updateArticleDto);
  }

  @Delete(':id')
  @ApiTags('articles')
  @ApiOkResponse({ type: ArticleEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.articlesService.remove(id);
  }
}
