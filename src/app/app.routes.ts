import { Routes } from '@angular/router';
import { VideoPlayerComponent } from '../screenRecorder/components/video-player/video-player.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'screen-recorder',
        pathMatch: 'full'
    },
    {
        path: 'screen-recorder',
        component: VideoPlayerComponent
    }
];
