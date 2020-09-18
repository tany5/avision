import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { AnalysisService } from './analysis.service';
import {ThemePalette} from '@angular/material/core';
import {ProgressBarMode} from '@angular/material/progress-bar';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss']
})
export class AnalysisComponent implements OnInit {
  @Input() barChartData: ChartDataSets[]
  @Input() barChartData2: ChartDataSets[]
  @Input() barChartDataAll: ChartDataSets[]
  @Input() barChartLabels: Label[]
  @Input() barChartLabels2: Label[]
  @Input() barChartType: ChartType
  @Input() barChartType2: ChartType
  
  
  @Input() appProgressBarColor;

  styleEl:HTMLStyleElement = document.createElement('style');
  color = 'blue'
  orange = "orange"
  green = 'green'
  mode: ProgressBarMode = 'buffer';
  value = 0;
  bufferValue = 75;
  
  public barChartLegend: any = { legend: { display: true, labels: { fontColor: 'black' } } }

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales : {
      yAxes: [{
          ticks: {
          beginAtZero: true,  
            max : 100,
            min: -10
          }
      }],
      xAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    },
    animation: {
      onComplete: function () {
        const chartInstance = this.chart,
          ctx = chartInstance.ctx;

        const fontSize = 16;
        const fontStyle = '600';
        const fontFamily = 'Open Sans';
        ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);

        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillStyle = '#000';

        this.data.datasets.forEach(function (dataset, i) {
          const meta = chartInstance.controller.getDatasetMeta(i);
          meta.data.forEach(function (bar, index) {
            if(dataset.data[index] != 0){
              const data = dataset.data[index];
              ctx.fillText(data, bar._model.x, bar._model.y - 0);
            }
          });
        });
      }
    }
    
  };
 
  chartReady: boolean = false
  test_full_marks: any
  rank_count: any
  test_time_taken: any
  test_total_time: any
  total_given_exam: any
  total_score: any
  quiz_name: any
  user_name: any
  accuracy: any
  precentile: any
  total_attempted: any
  total_qs: any
  chartColors: any

  total_correct: any
  total_wrong: any
  sectionScore: any
  sectionPosition: any = 0
  allMarkTopper: any = 0
  allMarkYour: any = 0
  allMarkAverage: any = 0
  allCorrectTopper: any = 0
  allCorrectYour: any = 0
  allCorrectAverage: any = 0
  allWrongTopper: any = 0
  allWrongYour: any = 0
  allWrongAverage: any = 0
  prodId: any
  allArrayLoaded: boolean = false
  total_skip:any

  topperArray: any
  avarageArray: any
  yourArray: any
  barChartPlugins: any
  topperArrayBySection: any
  avarageArrayBySection: any
  yourArrayBySection: any
  compare_result: boolean = false
  static counter = 0;
  uniqueAttr = `app-progress-bar-color-${AnalysisComponent.counter++}`;
  regStat : boolean = false;

  
  constructor(private router: Router, private analysisService: AnalysisService, private route: ActivatedRoute, private el: ElementRef) {

    if(localStorage.getItem('userloggedInSchollarship') == '1'){

      this.regStat=true;
    }
    
    const nativeEl: HTMLElement = this.el.nativeElement;
    nativeEl.setAttribute(this.uniqueAttr,'');
    nativeEl.appendChild(this.styleEl);
    this.styleEl.innerText = `
      [${this.uniqueAttr}] .mat-progress-bar-fill::after {
        background-color: ${this.appProgressBarColor};
      }
    `;
    this.route.parent.params.subscribe(
      (params: Params) => {
        this.prodId = params['prodId']
      })



    this.barChartType2 = "bar"
    this.barChartDataAll = [
      { data: [0, 0, 0], label: 'Topper' },
      { data: [0, 0, 0], label: 'You' },
      { data: [0, 0, 0], label: 'Average' }
    ]
    this.analysisService.rankScore(localStorage.getItem("currentUserId"), this.prodId).subscribe(
      (res) => {
        
        console.log(res)
        this.test_full_marks = res['score']['test_full_marks']
        this.rank_count = res['score']['rank_count']
        this.test_time_taken = res['score']['test_time_taken']
        this.test_total_time = res['score']['test_total_time']
        this.total_given_exam = res['score']['total_given_exam']
        this.total_score = res['score']['total_score']
        this.quiz_name = res['score']['quiz_name']
        this.user_name = res['score']['user_name']
        this.accuracy = res['score']['accuracy']
        this.precentile = res['score']['precentile']
        this.total_attempted = res['score']['total_attempted']
        this.total_qs = res['score']['total_qs']
        this.total_correct = res['score']['total_correct']
        this.total_wrong = res['score']['total_wrong']
        this.total_skip = res['score']['total_skip']

        const total_qs = parseInt(this.total_qs)

        this.barChartData = [{ data: [total_qs, this.total_attempted, this.total_correct, this.total_wrong,  this.total_skip], label: 'Total Question' }
        ]


        this.barChartLabels = ['Total Question', 'Attempted', 'Correct', 'Wrong', 'skipped'];
        this.barChartType = "bar"

        this.chartReady = true
        
        
        

        this.chartColors = [
          {
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 2,
          }
        ]

      },
      (error) => {
        console.log(error)
      })

    this.analysisService.sectionalAnalysisMaark(localStorage.getItem("currentUserId"), this.prodId).subscribe(
      (res) => {
        this.sectionScore = res['score']
        console.log(this.sectionScore)

        this.barChartData2 = [
          { data: [0, 0, 0], label: 'Topper' },
          { data: [0, 0, 0], label: 'You' },
          { data: [0, 0, 0], label: 'Average' }
        ]

        this.barChartDataAll = [
          { data: [0, 0, 0], label: 'Topper' },
          { data: [0, 0, 0], label: 'You' },
          { data: [0, 0, 0], label: 'Average' }
        ]
        let data = []
        for (var i = 0; i < this.sectionScore[0]['section_anlysis_arr'].length; i++) {
          data.push(this.sectionScore[0]['section_anlysis_arr'][i].topper)

          this.barChartData2[0].data = data
        }

        data = []
        for (var i = 0; i < this.sectionScore[0]['section_anlysis_arr'].length; i++) {
          data.push(this.sectionScore[0]['section_anlysis_arr'][i].your)

          this.barChartData2[1].data = data
        }
        data = []
        for (var i = 0; i < this.sectionScore[0]['section_anlysis_arr'].length; i++) {
          data.push(this.sectionScore[0]['section_anlysis_arr'][i].averge)

          this.barChartData2[2].data = data
        }


        var k
        var all_data = []
        for (var l = 0; l < 3; l++) {
          for (var i = 0; i < 3; i++) {

            console.log("i:", i, "p:", l)
            this.allMarkTopper = parseInt(this.allMarkTopper) + parseInt(this.sectionScore[i].section_anlysis_arr[l].topper)
            this.allMarkYour = parseInt(this.allMarkYour) + parseInt(this.sectionScore[i].section_anlysis_arr[l].your)
            this.allMarkAverage = parseInt(this.allMarkAverage) + parseInt(this.sectionScore[i].section_anlysis_arr[l].averge)
            console.log("Topper", this.allMarkTopper, "Your", this.allMarkYour, "Average", this.allMarkAverage)



          }
          all_data.push([this.allMarkTopper, this.allMarkYour, this.allMarkAverage])
          console.log("mark", this.allMarkTopper, "COrrect", this.allMarkYour, "Wrong", this.allMarkAverage)
          //this.barChartDataAll[l].data = all_data
          //all_data =[]
          this.allMarkTopper = 0
          this.allMarkYour = 0
          this.allMarkAverage = 0
        }

        console.log("all array", all_data)
        var all_chart_data = []
        for (var i = 0; i < all_data.length; i++) {
          for (var j = 0; j < all_data.length; j++) {
            all_chart_data.push(all_data[j][i])
          }
          this.barChartDataAll[i].data = all_chart_data
          all_chart_data = []
        }




        this.barChartLabels2 = ['Mark', 'Correct', 'Wrong'];
        this.barChartType2 = "bar"

      },
      (error) => {
        console.log(error)
      })

    this.analysisService.compareWithTopper(localStorage.getItem("currentUserId"), this.prodId).subscribe(
      (res) => {
        
        this.topperArray = res['compare_result']['topper_arr']
        this.yourArray = res['compare_result']['your_arr']
        this.avarageArray = res['compare_result']['average_arr']
        this.allArrayLoaded = true
      },
      (error) => {
        console.log(error)
      })
  }



  getAnalyticalDetails(k, j) {

    let data = []
    for (var i = 0; i < this.sectionScore[k]['section_anlysis_arr'].length; i++) {
      data.push(this.sectionScore[k]['section_anlysis_arr'][i].topper)
      console.log(data)
      this.barChartData2[0].data = data
    }

    data = []
    for (var i = 0; i < this.sectionScore[k]['section_anlysis_arr'].length; i++) {
      data.push(this.sectionScore[k]['section_anlysis_arr'][i].your)
      console.log(data)
      this.barChartData2[1].data = data

    }
    data = []
    for (var i = 0; i < this.sectionScore[k]['section_anlysis_arr'].length; i++) {
      data.push(this.sectionScore[k]['section_anlysis_arr'][i].averge)
      console.log(data)
      this.barChartData2[2].data = data

    }
  }

  getAnalyticalDetailsById(section_id) {
    
    this.analysisService.compareWithTopperBySection(localStorage.getItem("currentUserId"), this.prodId,section_id).subscribe(
      (res)=> {
        console.log(res)
        this.compare_result =true
        this.topperArrayBySection = res['compare_result']['topper_arr']
        this.yourArrayBySection = res['compare_result']['your_arr']
        this.avarageArrayBySection = res['compare_result']['average_arr']
        
      },
      (error)=> {
        console.log(error)
      }
    )
  }

  ngOnInit(): void {

  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/'])
  }

  GoToSol(){
    this.router.navigate(['exam',this.prodId,'solution'])
  }

}
