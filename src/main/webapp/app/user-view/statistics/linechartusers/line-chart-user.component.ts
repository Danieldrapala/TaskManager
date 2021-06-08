import { Component, Input } from '@angular/core';
import { StateStorageService } from 'app/services/state-storage.service';
import { StatisitcService } from 'app/services/statistics.service';

@Component({
  selector: 'line-chart-user',
  templateUrl: './line-chart-user.component.html',
  styleUrls: ['./line-chart-user.component.scss'],
})
export class LineChartUserComponent {

  @Input() userId : number | undefined;

  id!: number;
  tasksCompleted!: number[];
  tasksAssigned!: number[];
  public chartLabels: string[] =[];
  public constructor(private statsService: StatisitcService){
  }
  ngOnInit(): void {
    if(this.userId != undefined)
    {
      this.id = this.userId;
      this.getSixMonths();
      this.getTaskAssignedTo(this.id);
      this.getTaskCompleted(this.id);
    }

  }
  getSixMonths() {
    let date = new Date();
    var step;
    for (step = 5; step <= 0; step--) {
     this.chartLabels.push(this.chartMapLabels.get((date.getMonth()-1-step)%12)!)
    }
  }
  getTaskCompleted(id: number) {
    this.statsService.getTasksCompletedCountByUser(id).subscribe(
      data=>{
        this.tasksCompleted = data;
      }
    )
  }
  getTaskAssignedTo(id: number) {
    this.statsService.getTasksAssignedTo(id).subscribe(
      data=>{
        this.tasksAssigned = data;
      }
    )  }
  public chartType: string = 'line';

  public chartDatasets: Array<any> = [
    { data: [this.tasksCompleted], label: 'Tasks Completed' },
    { data: [this.tasksAssigned], label: 'Tasks Assigned To' }
  ];

  public chartMapLabels: Map<number,string> =new Map([
    [0, "January"],
    [1, "February"],
    [2, "March"],
    [3, "April"],
    [4, "May"],
    [5, "June"],
    [6, "July"],
    [7, "August"],
    [8, "September"],
    [9, "October"],
    [10, "November"],
    [11, "December"]
]);



  public chartOptions: any = {
    responsive: true
  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }
}