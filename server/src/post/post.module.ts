import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { Post } from './post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [PostService],
  controllers:[PostController],
  exports: [PostService],
  imports: [
    TypeOrmModule.forFeature([Post]),
  ],
})
export class PostModule {}
