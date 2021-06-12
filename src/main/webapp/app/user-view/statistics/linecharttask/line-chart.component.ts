import { Component, Input } from '@angular/core';
import { StateStorageService } from 'app/services/state-storage.service';
import { StatisitcService } from 'app/services/statistics.service';

@Component({
  selector: 'line-chart-task',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartTaskComponent {

  @Input() 
  taskId : number | undefined;

  id!: number;
  assignmentCount: number[]= [];
  dragAndDropCount: number[] = [];
  public chartLabels: string[] =[];
  public constructor(private statsService: StatisitcService){
  }
  ngOnInit(): void {
      this.getTaskAssignedTo(this.taskId!);
      this.getTaskTerms(this.taskId!);
      this.getSortedDays();
  }

  getTaskTerms(id: number) {
    this.statsService.getDragAndDropCount(id).subscribe(
      (data:number[])=>{ 
        this.dragAndDropCount = data;
        this.dataSets =  [{  data: this.assignmentCount , label: 'Assingment count'}, {  data: this.dragAndDropCount , label: 'DragAndDrop events count'}]
    }); 
  }

  getSortedDays() {
    let date = new Date();
    var step;
    for (step = 6; step >= 0; step--) {
     this.chartLabels.push(this.chartMapLabels.get(this.mod((date.getDay()  - step), 7))!)
    }
  }


  getTaskAssignedTo(id: number) {
    this.statsService.getAssigmentForTask(id).subscribe(
      (data:number[])=>{ 
        this.assignmentCount = data;
        
        this.dataSets =  [{  data: this.assignmentCount , label: 'Assingment count'},
        {  data: this.dragAndDropCount , label: 'DragAndDrop events count'}]

      }); 
 
  }

  mod(n: number, m: number) {
    return ((n % m) + m) % m;
  }

  public chartType: string = 'line';

  public dataSets: Array<any> = 
  [{  data: this.assignmentCount , label: 'Assingment count'}, {  data: this.dragAndDropCount  , label: 'DragAndDrop events count'}];

  public chartMapLabels: Map<number,string> =new Map([
    [0, "Sunday"],
    [1, "Monday"],
    [2, "Tuesday"],
    [3, "Wendsday"],
    [4, "Thursday"],
    [5, "Friday"],
    [6, "Saturday"]
  ]);

  public chartOptions: any = {
    responsive: true
  };

  
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }
}
