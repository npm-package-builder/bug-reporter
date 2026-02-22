import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

interface dummy{
  name:string,
  id:number
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'bug-reporter';
  count = 1;
  val:dummy = {
    name:"sreedhar",
    id:2
  }

  constructor(){
    setInterval(()=>{
      console.error(this.count);
      this.val.id = this.count;
      console.log(this.val);
      this.count++;
    },1000)
  }
}
