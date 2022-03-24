import { LightningElement } from 'lwc';
import getCertPopularity from '@salesforce/apex/CertPopularity.getCertPopularity';
import { loadScript } from 'lightning/platformResourceLoader';
import chartjs from '@salesforce/resourceUrl/chart';

const CHART_CONFIG = {
    dom_selector: 'canvas.certBarChart',
    type: 'bar',
    color: 'rgb(255,99,132)',
    options:{
        responsive:true,
        legend: { display: false },
        title: { display: false },
        animation: { animateScale: true }
    }
}

export default class CertPopularity extends LightningElement {
    error;
    _chart;
    _chartjsInitialized = false;

    renderedCallback(){
        if (this._chartjsInitialized){
            return;
        }
        this._chartjsInitialized = true;
        loadScript(this, chartjs)
        .then(getCertPopularity)
        .then((result) => {
            console.log('Data returned from Apex', result);
            //TODO: process data and render chart here
            const certData = result;
            const certLabels = [];
            for( let i=0; i < certData.length; i++ ){
                certLabels.push(certData[i].Name);
                certCounts.push(certData[i].Number_of_Certified_Professionals__c);
            }
        })
        .catch(error => {
            this.error = error;
            });
    }
}