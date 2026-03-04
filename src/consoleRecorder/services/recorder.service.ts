import { Injectable } from '@angular/core';
import { eventWithTime, record } from 'rrweb';
import { getRecordConsolePlugin } from '@rrweb/rrweb-plugin-console-record';

const ONE_MINUTE = 1*60*1000;
const THREE_MINUTES = 3*60*1000;


@Injectable({
  providedIn: 'root'
})
export class RecorderService {
  chunks:eventWithTime[] = [];
  currentSnapShot:eventWithTime[]=[];
  constructor() {}

  getChunks(){
    this.currentSnapShot = [...this.chunks];
    const now = Date.now();

    const filteredEvents = this.currentSnapShot.filter(event => {
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
      checkoutEveryNms:1000,
      emit: (event, isCheckout)=>{
        if(isCheckout){
          this.chunks.push(event);
          const now = Date.now();
          this.chunks = this.chunks.filter(event => {
            return (now - event.timestamp) <= THREE_MINUTES;
          });
        }
        this.chunks.push(event);
      },
      plugins:[
        getRecordConsolePlugin({
          level:['log','info','warn','error'],
          lengthThreshold:10000,
          stringifyOptions: {                      // Control object serialization
            depthOfLimit: 3,
            stringLengthLimit: 1000,
            numOfKeysLimit:2
          }
        })
      ],
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
