import { Injectable, HttpException, HttpStatus} from '@nestjs/common';
import { Posts } from 'src/models/Posts/Posts';
import { CreatePostDTO } from 'src/models/Posts/create-postDTO';
import { EditPostDTO } from 'src/models/Posts/edit-postDTO';
import { PostRepository } from 'src/repositories/Post/post.prisma';
import { AccountStatus } from 'src/models/user/account-status-enum';
import { PostStatus } from 'src/models/Posts/posts-status';

@Injectable()
export class PostService {
  constructor(private postRepository: PostRepository) { }

  async create(post: CreatePostDTO) {
    const {user, title, body } = post;
    console.log(post)
    const newPost = await Posts.PostBuild(user, title, body);
    return this.postRepository.create(newPost);
  }

  async update(id: string, post: EditPostDTO){
    if (!id) throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    const existedPost = await this.postRepository.listById(id);
    if (!existedPost) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    const {user, title, body} = post;
    const updatedPost = await Posts.PostBuild(user,title, body)
    updatedPost.identifier = existedPost.id;
    updatedPost.created_at = existedPost.created_at;
    updatedPost.updatedAt = new Date();
    return this.postRepository.update(id, updatedPost);
  }

  async listAll() {
    return this.postRepository.list();
  }

  async listById(id: string) {
    if (!id) throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    const existedPost = await this.postRepository.listById(id);
    if (!existedPost) throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    return existedPost;
  }
  async delete(id: string) {
    console.log(id)
    if (!id) throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    const existedPost = await this.postRepository.listById(id);
    console.log(existedPost)
    if (!existedPost) throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    const post = { ...existedPost, status: PostStatus.DELETED }
    post.deleted_at = new Date();
    return this.postRepository.delete(id);
  }
}
