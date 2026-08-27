import { Injectable } from '@nestjs/common';
import { Cron, SchedulerRegistry, Timeout } from '@nestjs/schedule';

@Injectable()
export class CronsService {
  constructor(private readonly scheduler: SchedulerRegistry) {
  }
  // @Cron('* * * */7 * *')
  // async doSomething() {
  //   console.log('Something has been done');
  // }
  //
  // @Timeout(7000)
  // async doSomethingElse() {
  //   console.log('Timeout!');
  // }
}