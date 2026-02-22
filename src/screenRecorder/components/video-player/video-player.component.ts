import { Component } from '@angular/core';
import rrwebPlayer from 'rrweb-player';
import { RecorderService } from '../../services/recorder.service';
@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [],
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.scss'
})
export class VideoPlayerComponent {
  player:rrwebPlayer | undefined;
  constructor(private recodService:RecorderService){

  }
  startRecording(){
    this.recodService.startRecording();
  }
  getRecordings(){
    return this.recodService.getChunks();
  }
  playRecording() {
    const chunks: any = this.getRecordings();
    if (this.player) {
      this.player.pause();
      const playerContainer = document.getElementById('replayer');
      if (playerContainer) {
        playerContainer.innerHTML = '';
      }
    }
    this.player = new rrwebPlayer({
      target: document.getElementById('replayer') as HTMLElement,
      props: {events: chunks, autoPlay:false, UNSAFE_replayCanvas:true}
    })
    this.player.play();
  }
}
