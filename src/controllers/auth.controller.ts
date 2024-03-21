import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { LoginDto } from 'src/dto/auth/login.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { AuthService } from 'src/services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile() {
    return 'Profile';
  }
}
