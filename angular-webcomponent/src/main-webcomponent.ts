import { createApplication } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { HomeComponent } from './app/home/home.component';
import '@webcomponents/custom-elements/custom-elements.min.js';

(async () => {
  const app = await createApplication({ providers: [] });
  const el = createCustomElement(HomeComponent, { injector: app.injector });
  customElements.define('angular-home', el);
})();
