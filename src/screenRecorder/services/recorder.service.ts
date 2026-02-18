import { Injectable } from '@angular/core';

import { record } from 'rrweb';
import { eventWithTime } from '@rrweb/types';
interface domRecord{
  snap: any,
  timestamp: number
} 
const ONE_MINUTE = 1*60*1000;
const THREE_MINUTES = 3*60*1000;

@Injectable({
  providedIn: 'root'
})
export class RecorderService {
  chunks:eventWithTime[] = [];
  dummay:any[]=[];
  constructor() {}

   getChunks(){
    this.dummay = [...this.chunks];
    const now = Date.now();

    const filteredEvents = this.dummay.filter(event => {
      return (now - event.timestamp) <= ONE_MINUTE;
    });
    const firstValidIndex = filteredEvents.findIndex(event => event.type === 4);
    if(firstValidIndex == -1){
      return [];
    }
    if(firstValidIndex == 0){
      return filteredEvents;
    }else{
      return filteredEvents.slice(firstValidIndex-1);
    }
   }

  startRecording(){
    record({
      checkoutEveryNms : 1000,
      emit:(event, isCheckout)=>{
        if(isCheckout){
          this.chunks.push(event);
          const now = Date.now();
          this.chunks = this.chunks.filter(event => {
            return (now - event.timestamp) <= THREE_MINUTES;
          });
        }
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
