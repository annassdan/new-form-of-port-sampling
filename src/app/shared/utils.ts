import {Subscription} from 'rxjs';

export function unsubscribes(subscribers: Subscription[]) {
  if (subscribers) {
    subscribers.forEach((sub: Subscription) => {
      try {
        sub.unsubscribe();
      } catch (e) {
        console.log('sub.unsubscribe() tidak dapat dilakukan...');
      }
    });
  }

  return [];
}
