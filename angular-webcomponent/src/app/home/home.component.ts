import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section
      class="p-8 bg-white rounded-2xl shadow-md w-full max-w-3xl mx-auto mt-8 border border-gray-200"
    >
      <header class="border-b border-gray-100 pb-4 mb-6">
        <h2 class="text-2xl font-bold text-secondary">🧾 Formulário Angular</h2>
        <p class="text-neutral text-sm mt-1">
          Envie e receba dados do Next.js.
        </p>
      </header>

      <div class="mb-4 text-sm text-gray-600">
        <p><strong>Mensagem do Next:</strong> {{ externalMessage }}</p>
      </div>

      <form (ngSubmit)="submitForm()" class="flex flex-col gap-4">
        <div>
          <label class="block text-left text-sm font-medium text-neutral mb-1"
            >Nome</label
          >
          <input
            type="text"
            [(ngModel)]="formData.name"
            name="name"
            class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Digite seu nome"
          />
        </div>

        <div>
          <label class="block text-left text-sm font-medium text-neutral mb-1"
            >Mensagem</label
          >
          <textarea
            [(ngModel)]="formData.message"
            name="message"
            class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Digite uma mensagem"
          ></textarea>
        </div>

        <button
          type="submit"
          class="bg-primary hover:bg-accent text-white font-semibold px-4 py-2 rounded-md transition-all duration-300 self-start"
        >
          Enviar para o Next
        </button>
      </form>
    </section>
  `,
})
export class HomeComponent implements OnInit {
  @Input() externalMessage = 'Sem mensagem externa';
  formData = { name: '', message: '' };

  ngOnInit() {
    window.addEventListener('message-from-next', (e: any) => {
      if (e.detail?.text) {
        this.externalMessage = e.detail.text;
      }
    });
  }

  submitForm() {
    const event = new CustomEvent('form-submitted', { detail: this.formData });
    window.dispatchEvent(event);
  }
}
