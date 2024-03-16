import { Body, Get, Injectable, Post, Delete, Put, Param, Controller} from '@nestjs/common';
import { PostService } from 'src/services/post.service';
import { CreatePostDTO } from 'src/models/Posts/create-postDTO';
import { EditPostDTO } from 'src/models/Posts/edit-postDTO';

@Injectable()
@Controller('Post')
export class PostController {
 constructor(private postService: PostService){}

 @Post()
 create(@Body() request: CreatePostDTO){
  return this.postService.create(request);
 }
 @Put(":id")
 update(@Body() request: EditPostDTO, @Param('id') id: string) {
   return this.postService.update(id, request);
 }
 
 @Get()
 list() {
   return this.postService.listAll();
 }
 @Get(":id")
  listById(@Param('id') id: string) {
    return this.postService.listById(id);
  }
  @Delete(":id")
  delete(@Param('id') id: string) {
    return this.postService.delete(id);
  }
}
