import { Component, ElementRef, ViewChild } from '@angular/core';
import { getReplayConsolePlugin } from '@rrweb/rrweb-plugin-console-replay';
import { RecorderService } from '../../services/recorder.service';
import { Replayer } from 'rrweb';
import rrwebPlayer from 'rrweb-player';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-console-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './console-player.component.html',
  styleUrl: './console-player.component.scss'
})
export class ConsolePlayerComponent {
  player:Replayer | undefined;
  rrWebPlayer:rrwebPlayer | undefined;
  @ViewChild('player-container', { static: true }) playerContainer!: ElementRef;
  playbackLogs: { level: string, message: any }[] = [];
  constructor(private recorder:RecorderService){}

  startRecording(){
    this.recorder.startRecording();
  }
  
  getRecordings(){
    return this.recorder.getChunks();
  }

  playRecordings(){
    const chunks: any = this.getRecordings();
    this.player = new Replayer(chunks,{
      plugins:[
        getReplayConsolePlugin({
          level: ['log', 'info', 'warn', 'error'],
          replayLogger: {
            log: (data: any) => this.playbackLogs.push({ level: 'log', message: data }),
            warn: (data: any) => this.playbackLogs.push({ level: 'warn', message: data }),
            error: (data: any) => this.playbackLogs.push({ level: 'error', message: data }),
            info: (data: any) => this.playbackLogs.push({ level: 'info', message: data }),
          }
        })
      ]
    });
    this.player.play();
  }

  // playRecordingsUsingRrWeb(){
  //   const chunks: any = this.getRecordings();
  //   if (this.rrWebPlayer) {
  //     this.rrWebPlayer.pause();
  //     const playerContainer = document.getElementById('replayer');
  //     if (playerContainer) {
  //       playerContainer.innerHTML = '';
  //     }
  //   }
  //   this.rrWebPlayer = new rrwebPlayer({
  //     target: document.getElementById('replayer') as HTMLElement,
  //     props: {
  //       events: chunks,
  //       autoPlay:false,
  //       UNSAFE_replayCanvas:true,
  //       plugins:[
  //         getReplayConsolePlugin({
  //           level:['log','info','warn','error']
  //         })
  //       ]
  //     }
  //   })
  //   this.rrWebPlayer.play();
  // }
}
