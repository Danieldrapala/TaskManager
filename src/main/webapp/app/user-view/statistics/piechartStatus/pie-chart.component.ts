import { Component } from '@angular/core';
import { StatisitcService } from 'app/services/statistics.service';

@Component({
  selector: 'pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent {
  public chartType: string = 'pie';


  public constructor(private statsService: StatisitcService){
  }
  ngOnInit(): void {
    this.getTasksStatus();

  }

  public chartLabels: Array<any> = ['Free Tasks', 'Assigned Tasks', 'Completed Tasks'];

  public chartColors: Array<any> = [
    {
      backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C'],
      hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870'],
      borderWidth: 2,
    }
  ];



  id!: number;
  dataSet: any =[];

  public chartDatasets: Array<any> = [
    { data: this.dataSet, label: 'Tasks assignment Status' }
  ];
  
  

  getTasksStatus(){
    this.statsService.getTaskCount().subscribe(
      (data:number[])=>{ 
        this.chartDatasets = [
          { data: data, label: 'Tasks assignment Status' }];
    });
  }
 
  public chartOptions: any = {
    responsive: true
  };

  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

}