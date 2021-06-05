import { Component } from '@angular/core';

@Component({
  selector: 'pie-chart-column',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartColumnComponent {
  public chartType: string = 'pie';

  public chartDatasets: Array<any> = [
    { data: [300, 50, 100], label: 'Tasks Column Status' }
  ];

  public chartLabels: Array<any> = ['Board1', 'Board2', 'Board3'];

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