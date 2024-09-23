import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { PostService } from './post.service';
import { Post as PostEntity } from './post.entity';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.postService.findOne(id);
  }

  @Post()
  create(@Body() postData: Partial<PostEntity>) {
    return this.postService.create(postData);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() postData: Partial<PostEntity>) {
    return this.postService.update(id, postData);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.postService.delete(id);
  }
}
