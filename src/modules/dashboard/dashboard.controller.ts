import { Get } from '@nestjs/common';

import { AdminController } from '../../common/decorators/admin-controller.decorator';
import { DashboardService } from './dashboard.service';

@AdminController('dashboard', 'Dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  /** Admin panel bosh sahifasi uchun umumiy statistika */
  @Get()
  getOverview() {
    return this.dashboardService.getOverview();
  }
}
