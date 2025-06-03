import { AfterViewInit, Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { DropdownComponent } from '../../../../libraries/base-dropdown/dropdown.component';
import {
  Chart,
  registerables
} from 'chart.js';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StatisticsService } from './statistics.service';

Chart.register(...registerables);

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [FormsModule, CommonModule, DropdownComponent],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css',
  providers: [StatisticsService]
})
export class StatisticsComponent implements AfterViewInit {

  #service = inject(StatisticsService);
  @ViewChild('doughnut_chart') chartCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('barChart') barChartCanvas!: ElementRef<HTMLCanvasElement>;

  chartBar!: Chart;
  chartDoughnut!: Chart;
  optionMonth = [{
    name: 'Tháng 1',
    id: '01'
  }, {
    name: 'Tháng 2',
    id: '02'
  }, {
    name: 'Tháng 3',
    id: '03'
  }, {
    name: 'Tháng 4',
    id: '04'
  }, {
    name: 'Tháng 5',
    id: '05'
  },
  {
    name: 'Tháng 6',
    id: '06'
  },
  {
    name: 'Tháng 7',
    id: '07'
  },
  {
    name: 'Tháng 8',
    id: '08'
  },
  {
    name: 'Tháng 9',
    id: '09'
  },
  {
    name: 'Tháng 10',
    id: '10'
  },
  {
    name: 'Tháng 11',
    id: '11'
  },
  {
    name: 'Tháng 12',
    id: '12'
  }
  ];

  optionYear = [
    {
      name: '2022',
      id: 2022
    },
    {
      name: '2023',
      id: 2023
    },
    {
      name: '2024',
      id: 2024
    },
    {
      name: '2025',
      id: 2025
    },
    {
      name: '2026',
      id: 2026
    },
    {
      name: '2027',
      id: 2027
    },
    {
      name: '2028',
      id: 2028
    },
    {
      name: '2029',
      id: 2029
    },
    {
      name: '2030',
      id: 2030
    }
  ]
  optionCard = [{
    name: 'Ca tập',
    id: 101
  }, {
    name: 'Loại thẻ',
    id: 102
  }]
  optionMarket = [{
    name: 'Doanh thu theo tháng',
    id: 103
  }, {
    name: 'Thời gian tập trong ngày',
    id: 104
  }
  ];
  currentTime = new Date();
  month = this.currentTime.getMonth() + 1;
  year = this.currentTime.getFullYear();
  optionMarketId = 103;
  optionCardId = 101;
  stats = {
    totalNam: 0,
    totalNu: 0,
    averageAge: 0,
    theHetHan: 0,
    doanhThu: 0
  }
  labelBar: any[] = [];
  dataBar: any[] = [];

  ngAfterViewInit(): void {
    this.doughnutChart();

    setTimeout(() => {
      this.getStat();
      this.getBarCharts();
    })
  }


  getStat() {
    this.#service.getStats(this.month, this.year).subscribe(res => {
      if (res.status == 200 && res.ok == true) {
        this.stats = res.body.innerBody;
      }
    }
    );
  }
  getBarCharts() {
    this.#service.getBarChart(this.optionMarketId, this.month, this.year).subscribe(res => {
      if (res.status == 200 && res.ok == true) {
        const data = [...res.body.innerBody] as any[];
        this.labelBar = data.map((x: any) => x.labels);
        this.dataBar = data.map((x: any) => x.datasets);
        this.barChart();
      }
    }
    );
  }
  onDropdownSelected(event: any, e: string): void {
    if (e == 'month') {
      this.month = event;
    }
    if (e == 'year') {
      this.year = event;
    }
    if (e == 'optionCardId') {
      this.optionMarketId = event;
      // this.getStat();
    }
    if (e == 'optionMarketId') {
      this.optionMarketId = event;
      this.getBarCharts();
    }
  }

  doughnutChart() {
    this.chartDoughnut = new Chart(this.chartCanvas.nativeElement, {
      type: 'doughnut', // hoặc 'line', 'pie', v.v.
      data: {
        labels: ['Tháng 1', 'Tháng 2', 'Tháng 3'],
        datasets: [{
          label: 'Doanh thu',
          data: [65, 59, 80],
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'bottom'
          }
        }
      }
    });
  }
  barChart() {
    this.chartBar?.destroy();
    this.chartBar = new Chart(this.barChartCanvas.nativeElement, {
      type: 'bar', // hoặc 'line', 'pie', v.v.
      data: {
        labels: [...this.labelBar],
        datasets: [{
          label: 'Doanh thu',
          data: [...this.dataBar],
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
            position: 'bottom'
          }
        }
      }
    });
  }

  filter() {
    this.getStat();
  }
}
