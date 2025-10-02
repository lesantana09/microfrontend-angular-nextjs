import { ApplicationRef } from '@angular/core';
import { HomeComponent } from './app/home/home.component';

export interface HomeRenderProps {
  title?: string;
  message?: string;
}

async function bootstrapHomeComponent() {
  const { bootstrapApplication } = await import('@angular/platform-browser');
  return bootstrapApplication(HomeComponent);
}

function applyProps(appRef: ApplicationRef, props: HomeRenderProps = {}) {
  const component = appRef.components[0];
  if (!component) {
    return;
  }

  if (props.title !== undefined) {
    (component.instance as HomeComponent).title = props.title;
  }

  if (props.message !== undefined) {
    (component.instance as HomeComponent).message = props.message;
  }

  component.changeDetectorRef.detectChanges();
}

export async function renderHome(
  el: HTMLElement,
  props: HomeRenderProps = {}
): Promise<() => void> {
  const host = document.createElement('app-home');
  el.appendChild(host);

  const appRef = await bootstrapHomeComponent();
  applyProps(appRef, props);

  return () => {
    appRef.destroy();
    host.remove();
  };
}

export default renderHome;

export { HomeComponent };
