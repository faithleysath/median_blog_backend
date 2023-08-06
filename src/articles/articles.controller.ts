import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  NotFoundException,
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
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(createArticleDto);
  }

  @Get()
  @ApiTags('articles')
  @ApiOkResponse({ type: [ArticleEntity] })
  findAll() {
    return this.articlesService.findAll();
  }

  @Get('drafts')
  @ApiTags('articles')
  @ApiOkResponse({ type: [ArticleEntity] })
  findDrafts() {
    return this.articlesService.findDrafts();
  }

  @Get(':id')
  @ApiTags('articles')
  @ApiOkResponse({ type: ArticleEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const article = await this.articlesService.findOne(id);
    if (!article) {
      throw new NotFoundException(`Article #${id} not found`);
    }
    return article;
  }

  @Patch(':id')
  @ApiTags('articles')
  @ApiOkResponse({ type: ArticleEntity })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    return this.articlesService.update(id, updateArticleDto);
  }

  @Delete(':id')
  @ApiTags('articles')
  @ApiOkResponse({ type: ArticleEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.articlesService.remove(id);
  }
}
