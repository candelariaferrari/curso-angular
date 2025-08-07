import { ChangeDetectionStrategy, Component, signal } from "@angular/core";

@Component({
  templateUrl: './counter-page.component.html',
  styleUrl: './counter-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush, //estamos diciendo que quiero usar zoneJS
})
export class CounterPageComponent {
  counter = 15;
  // señales
  counterSignal = signal(10);

  constructor() {
    setInterval(()=> { //zoneless es bueno para trabajar con señales
      //this.counter += 1;
      this.counterSignal.update((v)=> v + 1)
      //this.increaseBy(1)
      console.log('tick');

    },2000);
  }



  increaseBy(value: number) {
    this.counter += value;
    this.counterSignal.update(current => current + value) //call back funtion
  }
  resetCounter() {
    this.counter = 0;
    this.counterSignal.set(0)
  }
}
