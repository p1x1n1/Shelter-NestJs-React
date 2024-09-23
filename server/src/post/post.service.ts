import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  findAll() {
    return this.postRepository.find();
  }

  findOne(id: number) {
    return this.postRepository.findOneBy({ id });
  }

  create(postData: Partial<Post>) {
    const post = this.postRepository.create(postData);
    return this.postRepository.save(post);
  }

  update(id: number, postData: Partial<Post>) {
    return this.postRepository.update(id, postData);
  }

  delete(id: number) {
    return this.postRepository.delete(id);
  }
}
