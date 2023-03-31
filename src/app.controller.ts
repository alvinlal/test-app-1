import { Controller, Get } from '@nestjs/common';
import axios from 'axios';
import { AppService } from './app.service';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
@Controller()
export class AppController {
  constructor(
    // @InjectDataSource() private dataSource: DataSource,
    private readonly appService: AppService,
  ) {}

  @Get('/')
  async getHello(): Promise<string> {
    return this.appService.getHello();
  }

  @Get('/test-app-2')
  async getFromTestApp2(): Promise<string> {
    const res = await axios.get('http://test-app-2.testapp.com:3000/');
    console.log(res.data);
    return res.data;
  }

  @Get('/test-db')
  async testDb() {
    // const res = await this.dataSource.query('SELECT VERSION()');
    // return res;
  }
}
