import { Component } from '@angular/core';

@Component({
  selector: 'pie-chart-user',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartUsersComponent {
  public chartType: string = 'pie';

  public chartDatasets: Array<any> = [
    { data: [300, 50, 100, 20], label: 'User Assigned To Tasks' }
  ];

  public chartLabels: Array<any> = ['user1', 'user1', 'user1'];

  public chartColors: Array<any> = [
    {
      backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C'],
      hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870'],
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }
}