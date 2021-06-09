import { Component, Input } from '@angular/core';
import { BoardService } from 'app/services/board.service';
import { timer } from 'rxjs';
import { take } from 'rxjs/operators';
import { sys } from 'typescript';

@Component({
  selector: 'pie-chart-column',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartColumnComponent {



  cards: string[] =[];
  counts: number[] = [];
  public constructor(private boardService: BoardService){
    
  }
   ngOnInit(): void{
    this.getColumnsAndTaskCount();

  }

  
  getColumnsAndTaskCount(): void {
    this.cards =[];
    this.counts = [];
    this.boardService.getCards().subscribe(
      data => {
        data.forEach(
          card=>{ 
            this.boardService.getTasksCount(card.id).subscribe(
              count=> { 
              if(card.name) {
                this.cards.push(card.name);
                this.counts.push(count);
              }
              console.log(this.cards);
              if(this.counts.length > 3){
               
                this.chartLabels = this.cards;
                this.chartDatasets =  [{ data: this.counts, label: 'Tasks singlechart Status' }];
              }
            });
          });
        });
  }
  public chartType: string = 'pie';



  public chartLabels: Array<any> = this.cards;
  public chartColors: Array<any> = [
    {
      backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#FDCCFC'],
      hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#FDCCFC'],
      borderWidth: 2,
    }
  ];

  public chartDatasets: Array<any> = [
    { data: this.counts, label: 'Tasks singlechart Status' }
  ];
  

  public chartOptions: any = {
    responsive: true 
  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }
}