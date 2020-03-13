import { Component, OnInit } from '@angular/core';
import { SaleManagementService } from '../sale-management/sale-management.service';
import { first } from 'rxjs/operators';
import { CommonService } from '../shared/sharedservices/commons/common.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  constructor(private service: SaleManagementService,
    private commonservice: CommonService) { }
  totalsale;


  ngOnInit() {
    this.service.saleList()
            .pipe(first())
            .subscribe((data) => {
              // send success message to the user and redirect
              this.totalsale = this.commonservice.getformatCurrency(this.totalsales(data.sale));
              // this.totalsale = data;
              // console.log('total sale >'+this.totalsale);
            },
            error => {
              console.log('error occured... ' + error.status );
              let message;
              if (error.status === 404) {
                message = 'Produt not found';
              }
              if (error.status === 400) {
                message = 'An error occured in the process';
              }
              if (error.status === 500) {
                message = 'An error occured in the process';
              }
            });
  }

  totalsales(list: any): any {
    let total = 0;
    // return this.http.get<any>(`${environment.apiEndpoint}/sales`)
    // .pipe(map(data => {
      list.forEach((element) => {
        // console.log(`dd ${element['datesale']},`);
        let discount = 0;
        let taxe = 0;
        if (element['discount']) {
          // console.log('1');
          if (element['discount']> 0) {
            // console.log('11');
            discount = element['discount'];
          }
        }
        if (element['taxe']) {
          // console.log('2');
          if (element['taxe']>0) {
            // console.log('22');
            taxe = element['taxe'];
          }
        }
  
        if (discount > 0 || taxe > 0) {
          // console.log('3');
          // calculation
          element['productlist'].forEach(element2 => {
            // console.log('33');
            if (element2['quantity'] && element2['sale_price']) {
              total += element2['quantity'] * element2['sale_price']
            }
          });
          total = ((total * taxe) / 100 + total) - discount;
        } else {
          // console.log(`dd ${element['datesale']}, length> ${element['productlist'].length}`);
          element['productlist'].forEach(element3 => {
            // console.log('5');
            let discountline = 0;
            if (element3['quantity'] && element3['sale_price']) {
              if (element3['discountline'] && element3['discountline'] > 0) {
                discountline = element3['discountline'];
              }
              total += (element3['quantity'] * element3['sale_price']) - discountline
            }
          });
        }
        // discount
        // taxe
        // discountline
        // productlist
        // quantity
        // sale_price
        });
        return total; // no need to add [.json()], the object is already a json object
    // }));
  }


  date: Date = new Date();

  visitSaleChartData = [{
    label: 'CHN',
    data: [20, 40, 15, 35, 25, 50, 30, 20],
    borderWidth: 1,
    fill: false,
  },
  {
    label: 'USA',
    data: [40, 30, 20, 10, 50, 15, 35, 40],
    borderWidth: 1,
    fill: false,
  },
  {
    label: 'UK',
    data: [70, 10, 30, 40, 25, 50, 15, 30],
    borderWidth: 1,
    fill: false,
  }];

  visitSaleChartLabels = ["2013", "2014", "2014", "2015", "2016", "2017"];

  visitSaleChartOptions = {
    responsive: true,
    legend: false,
    scales: {
        yAxes: [{
            ticks: {
                display: false,
                min: 0,
                stepSize: 20,
                max: 80
            },
            gridLines: {
              drawBorder: false,
              color: 'rgba(235,237,242,1)',
              zeroLineColor: 'rgba(235,237,242,1)'
            }
        }],
        xAxes: [{
            gridLines: {
              display:false,
              drawBorder: false,
              color: 'rgba(0,0,0,1)',
              zeroLineColor: 'rgba(235,237,242,1)'
            },
            ticks: {
                padding: 20,
                fontColor: "#9c9fa6",
                autoSkip: true,
            },
            categoryPercentage: 0.4,
            barPercentage: 0.4
        }]
      }
  };

  visitSaleChartColors = [
    {
      backgroundColor: [
        'rgba(154, 85, 255, 1)',
        'rgba(154, 85, 255, 1)',
        'rgba(154, 85, 255, 1)',
        'rgba(154, 85, 255, 1)',
        'rgba(154, 85, 255, 1)',
        'rgba(154, 85, 255, 1)',
      ],
      borderColor: [
        'rgba(154, 85, 255, 1)',
        'rgba(154, 85, 255, 1)',
        'rgba(154, 85, 255, 1)',
        'rgba(154, 85, 255, 1)',
        'rgba(154, 85, 255, 1)',
        'rgba(154, 85, 255, 1)',
      ]
    },
    {
      backgroundColor: [
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
      ],
      borderColor: [
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
      ]
    },
    {
      backgroundColor: [
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
      ],
      borderColor: [
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
      ]
    },
  ];

  trafficChartData = [
    {
      data: [30, 30, 40],
    }
  ];

  trafficChartLabels = ["Search Engines", "Direct Click", "Bookmarks Click"];

  trafficChartOptions = {
    responsive: true,
    animation: {
      animateScale: true,
      animateRotate: true
    },
    legend: false,
  };

  trafficChartColors = [
    {
      backgroundColor: [
        'rgba(177, 148, 250, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(132, 217, 210, 1)'
      ],
      borderColor: [
        'rgba(177, 148, 250, .2)',
        'rgba(254, 112, 150, .2)',
        'rgba(132, 217, 210, .2)'
      ]
    }
  ];

}
