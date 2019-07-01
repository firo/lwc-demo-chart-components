import { LightningElement, api } from 'lwc';
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';

import ChartJS from '@salesforce/resourceUrl/ChartJSJS';
import ChartCSS from '@salesforce/resourceUrl/ChartJSCSS';

export default class fi_DemoChart extends LightningElement {

    @api strIconName;
    @api strTitle ='Daily Usage';
    @api bolChartHover;
    @api strDatasetLabel1 = 'Average Usage';
    @api strDatasetBorderColor1;
    @api strDatasetBackgroundColor1;
    @api strDatasetLabel2 = 'Customer Usage';
    @api strDatasetBorderColor2;
    @api strDatasetBackgroundColor2;
    @api x1label;
    @api x2label;
    @api x3label;
    @api x4label;
    @api x5label;
    @api x6label;
    @api x7label;
    @api x1value;
    @api x2value;
    @api x3value;
    @api x4value;
    @api x5value;
    @api x6value;
    @api x7value;
    @api y1value;
    @api y2value;
    @api y3value;
    @api y4value;
    @api y5value;
    @api y6value;
    @api y7value;

    chartJSRendered = false;

    renderedCallback() {
        if (this.chartJSRendered) {
            return;
        }
        this.chartJSRendered = true;

        Promise.all([
            loadScript(this, ChartJS + '/'),
            loadStyle(this, ChartCSS + '/'),
        ])
            .then(() => {
                // eslint-disable-next-line no-console
                console.info("ChartJS Loaded");
                this.initializeD3();

            })
            .catch(error => {
                this.dispatchEvent(
                    // eslint-disable-next-line no-undef
                    new ShowToastEvent({
                        title: 'Error loading ChartJS',
                        message: error.message,
                        variant: 'error',
                    }),
                );
            });
    }
    initializeD3() {
		var config = {
			type: 'line',
			data: {
				labels: [this.x1label, this.x2label, this.x3label, this.x4label, this.x5label, this.x6label, this.x7label],
				datasets: [{
					label: this.strDatasetLabel1,
					backgroundColor: 'rgba('+this.strDatasetBackgroundColor1+')',
					borderColor: 'rgba('+this.strDatasetBorderColor1+')',
					data: [
						this.x1value,
						this.x2value,
						this.x3value,
						this.x4value,
						this.x5value,
						this.x6value,
						this.x7value
                    ],
                    borderWidth: 4,
                    borderDash: [5, 5],

					fill: false,
				}, {
					label: this.strDatasetLabel2,
					fill: false,
					backgroundColor: 'rgba('+this.strDatasetBackgroundColor2+')',
					borderColor: 'rgba('+this.strDatasetBorderColor2+')',
					data: [
						this.y1value,
						this.y2value,
						this.y3value,
						this.y4value,
						this.y5value,
            this.y6value,
            this.y7value
                    ],
                    borderWidth: 4
				}]
			},
			options: {
				responsive: true,
				title: {
					display: false,
					text: 'Chart.js Line Chart'
				},
				tooltips: {
					mode: 'index',
					intersect: false,
				},
				hover: {
					mode: 'nearest',
					intersect: this.bolChartHover
				},
				scales: {
					xAxes: [{
                        gridLines: {
                            color: "rgba(0, 0, 0, 0)",
                        },
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Day Hours'
						}
					}],
					yAxes: [{
                        gridLines: {
                            color: "rgba(0, 0, 0, 0)",
                        },
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Usage'
						}
					}]
				}
			}
        };
        var ctx = this.template.querySelector('canvas').getContext('2d');
        // eslint-disable-next-line no-undef
        window.myLine = new Chart(ctx, config);
    }
}
