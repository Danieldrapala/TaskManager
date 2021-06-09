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
      this.getSixMonths();
  }

  getTaskTerms(id: number) {
    this.statsService.getDragAndDropCount(id).subscribe(
      (data:number[])=>{ 
        this.dragAndDropCount = data;
        this.dataSets =  [{  data: this.assignmentCount , label: 'Assingment count'}, {  data: this.dragAndDropCount , label: 'DragAndDrop events count'}]
    }); 
  }

  getSixMonths() {
    let date = new Date();
    var step;
    for (step = 5; step >= 0; step--) {
     this.chartLabels.push(this.chartMapLabels.get((date.getMonth()-step)%12)!)
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

  public chartType: string = 'line';

  public dataSets: Array<any> = 
  [{  data: this.assignmentCount , label: 'Assingment count'}, {  data: this.dragAndDropCount  , label: 'DragAndDrop events count'}];

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
    [11, "December"]]);

  public chartOptions: any = {
    responsive: true
  };

  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }
}