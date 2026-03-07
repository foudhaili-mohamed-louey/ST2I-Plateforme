import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit, OnDestroy {
  intervalId: any;
  images: string[] = [
    'images/Welcome_login3.png',
    'images/Welcome_login1.png',
    'images/Welcome_login2.png'
  ];
  currentImage: string = this.images[0];

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  ngOnInit(): void {
    this.startSlideshow();
  }

  startSlideshow() {
    let index = 0;
    this.intervalId = setInterval(() => {
      index = (index + 1) % this.images.length;
      this.currentImage = this.images[index];
      this.cdr.detectChanges();
    }, 9000);
  }
}
