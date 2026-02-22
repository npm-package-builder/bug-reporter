import { Routes } from '@angular/router';
import { VideoPlayerComponent } from '../screenRecorder/components/video-player/video-player.component';
import { ConsolePlayerComponent } from '../consoleRecorder/components/console-player/console-player.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'console-recorder',
        pathMatch: 'full'
    },
    {
        path: 'screen-recorder',
        component: VideoPlayerComponent
    },
    {
        path: 'console-recorder',
        component: ConsolePlayerComponent
    }
];
