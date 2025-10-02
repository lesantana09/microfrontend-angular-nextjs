import { createCustomElement } from '@angular/elements';
import { createApplication } from '@angular/platform-browser';
import { HomeComponent } from './app/home/home.component';

const TAG_NAME = 'angular-home';
let defined = false;

async function registerElement() {
  if (defined || customElements.get(TAG_NAME)) {
    defined = true;
    return;
  }

  const appRef = await createApplication({
    providers: [],
  });
  const element = createCustomElement(HomeComponent, {
    injector: appRef.injector,
  });

  customElements.define(TAG_NAME, element);
  defined = true;
}

export async function defineAngularHomeElement(): Promise<void> {
  await registerElement();
}

export default defineAngularHomeElement;
