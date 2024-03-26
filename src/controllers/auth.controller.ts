import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AuthDto } from 'src/dtos/auth/auth.dto';
import { AuthDocument } from 'src/schemas/auth/auth.schema';
import { AuthService } from 'src/services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  createAuth(authDto: AuthDto) {
    return this.authService.createAuth(authDto);
  }

  @Get()
  getAllAuths(): Promise<AuthDocument[]> {
    return this.authService.findAllAuths();
  }

  @Get(':authId')
  getAuthById(@Param('authId') authId: string): Promise<AuthDocument> {
    return this.authService.findOneAuth(authId);
  }

  @Put(':authId')
  updateAuth(
    @Param('authId') authId: string,
    @Body() authDto: AuthDto,
  ): Promise<AuthDocument> {
    return this.authService.updateAuth(authId, authDto);
  }

  @Delete(':authId')
  deleteAuth(@Param('authId') authId: string): Promise<{ message: string }> {
    return this.authService.deleteAuth(authId);
  }

  // @Post('login')
  // login(@Body() loginDto: LoginDto) {
  //   // return this.authService.login(loginDto);
  // }

  // @Post('register')
  // register(@Body() userDto: UserDto) {
  //   // return this.authService.register(userDto);
  // }

  // @UseGuards(AuthGuard, RolesGuard)
  // @Roles(Role.Guest)
  // @Get('profile')
  // getProfile() {
  //   return 'Profile';
  // }

  // @UseGuards(AuthGuard, RolesGuard)
  // @Roles(Role.Admin)
  // @Get('dashboard')
  // getDashboard() {
  //   return 'Dashboard';
  // }
}
