import { Component, HostListener, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SwPush } from '@angular/service-worker';
import { map, Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-notifier',
  templateUrl: './notifier.component.html',
  styleUrls: ['./notifier.component.sass'],
})
export class NotifierComponent implements OnInit {
  private readonly swPushPublicKey =
    'BOQo2dBUgQoO77jpQkQ600JZrgVxIiVWzmmdVytvwuUqBkmx9L5mITnFglM9W3dhYo8rxkYourjFFIcZtZ5iJCw';

  constructor(private swPush: SwPush, private title: Title) {}

  private sub: Subscription = new Subscription();

  ngOnInit(): void {}

  @HostListener('document:visibilitychange', ['$event'])
  setPageTitle() {
    if (document.hidden) {
      this.sub = timer(0, 2000)
        .pipe(
          map(() => {
            let title =
              this.title.getTitle() == 'melibo' ? 'neuer Live Chat' : 'melibo';
            this.title.setTitle(title);
          })
        )
        .subscribe();
    } else {
      this.sub.unsubscribe();
      this.title.setTitle('melibo');
    }
  }

  pushSubscription() {
    if (!this.swPush.isEnabled) {
      console.log('Notification is not enabled');
      return;
    }
    this.swPush
      .requestSubscription({
        serverPublicKey: this.swPushPublicKey,
      })
      .then((sub) => {
        console.log(JSON.stringify(sub));
      })
      .catch((error) => console.log(error));
  }
}
