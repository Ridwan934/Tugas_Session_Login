import { Controller, Get, Request, Post, Res, Render, UseGuards, UseFilters} from '@nestjs/common';

import { Response } from 'express';
import { LoginGuard } from './auth/common/guards/login.guard';
import { AuthenticatedGuard } from './auth/common/guards/authenticated.guard';
import { AuthExceptionFilter } from './auth/common/filters/auth-exceptions.filter';

@Controller()
@UseFilters(AuthExceptionFilter)
export class AppController {
  getHello(): any {
    throw new Error('Method not implemented.');
  }
  @Get('/')
  @Render('login')
  index(@Request() req): {message: string} {
    return{message: req.flash('loginError')};
  }

  @UseGuards(LoginGuard)
  @Post('/login')
  login(@Res() res: Response) {
    res.redirect('/home');
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/home')
  @Render('home')
  getHome(@Request() req) {
    return{user: req.user};
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/profile')
  @Render('profile')
  getProfile(@Request() req) {
    return{user: req.user} ;
  }

  @Get('/logout')
  logout(@Request() req, @Res() res: Response) {
    req.logout(()=>{
      res.redirect('/');
    });
    
  }
}
