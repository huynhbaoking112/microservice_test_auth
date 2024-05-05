import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Ctx, EventPattern, MessagePattern, RmqContext } from '@nestjs/microservices';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getHello(): string {
    return this.authService.getHello();
  }


  // @MessagePattern({cmd : 'get-user'})
  // async getUser(@Ctx() context: RmqContext){
   
  //   return {user: 'USER'}

  // }

    @EventPattern('test')
    getUser(){
      console.log('this is micro');
      
    }


}
