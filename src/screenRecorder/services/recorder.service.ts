import { Injectable } from '@angular/core';

import { record } from 'rrweb';
import { eventWithTime } from '@rrweb/types';
interface domRecord{
  snap: any,
  timestamp: number
} 
const TWO_MINUTES = 30*1000;
const FIVE_MINUTES = 5*60*1000;

@Injectable({
  providedIn: 'root'
})
export class RecorderService {
  chunks:eventWithTime[] = [];
  latestRecords:eventWithTime[] = [];
  constructor() {}

   getChunks(){
    return this.latestRecords;
   }

  startRecording(){
    record({
      checkoutEveryNms : 2000,
      emit:(event, isCheckout)=>{
        if(isCheckout){
          this.chunks.push(event);
          this.latestRecords = this.chunks;
        }
        console.log(event);
        this.chunks.push(event);
      },
      recordCanvas:true,
      recordCrossOriginIframes:false,
      maskAllInputs:false,
      maskInputOptions:{
        password: true,
        color: false
      }
    })
  }
}
