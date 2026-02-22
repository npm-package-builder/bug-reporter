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
        // console.log(event);
        this.chunks.push(event);
        // const originalLog = (console.log as any)['__rrweb_original__'] || console.log;
        // const originalWarn = (console.warn as any)['__rrweb_original__'] || console.warn;
        // const originalError = (console.error as any)['__rrweb_original__'] || console.error;
        // const originalInfo = (console.info as any)['__rrweb_original__'] || console.info;

        // // These will NOT trigger a new rrweb event (No Infinite Loop)
        // originalLog('Normal info');
        // originalWarn('This is a safe warning');
        // originalError('This is a safe error');
        // originalInfo('This is a safe info');
        
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

    })
  }
}
