# 🎨 Guia de Identidade Visual — IDS

Este documento define o **Design System base** adotado entre os projetos **Next.js (host)** e **Angular (remote)**, garantindo padronização visual, escalabilidade e independência de hospedagem.

---

## 🧩 Estrutura do IDS

Cada projeto mantém sua própria configuração de Tailwind CSS, **baseada nos mesmos tokens visuais** definidos abaixo.  
Esses tokens formam o núcleo da identidade visual e podem ser versionados de forma independente.

---

## 🎨 Paleta de Cores

| Token        | Hex Code  | Uso Principal                              |
|---------------|-----------|--------------------------------------------|
| **primary**   | `#FF6200` | Cor principal — botões, ícones e links     |
| **secondary** | `#002766` | Cor de contraste e áreas secundárias       |
| **neutral**   | `#4C4C4C` | Cor neutra para textos e títulos           |
| **background**| `#F9FAFB` | Cor base de fundo                          |
| **accent**    | `#FFD166` | Destaques, bordas e indicadores visuais    |

---

## 🖋️ Tipografia

| Token | Valor | Uso |
|--------|--------|-----|
| **font-family** | `Inter, sans-serif` | Fonte padrão para todos os textos |
| **font-size** | base: 16px, escala modular | Usar Tailwind (`text-sm`, `text-lg`, `text-2xl`, etc.) |

**Exemplo de aplicação:**
```html
<h1 class="text-2xl font-bold text-primary">Título principal</h1>
<p class="text-neutral">Texto de apoio com cor neutra.</p>
```

---

## 🧱 Componentes Estruturais

### 🔹 Header padrão

```html
<header class="bg-primary text-white p-4 flex justify-between items-center shadow">
  <h1 class="text-lg font-bold">🚀 Portal IDS</h1>
  <nav class="space-x-4">
    <a href="#" class="hover:text-accent">Home</a>
    <a href="#" class="hover:text-accent">Sobre</a>
    <a href="#" class="hover:text-accent">Contato</a>
  </nav>
</header>
```

### 🔹 Footer padrão

```html
<footer class="bg-secondary text-white text-center py-3 mt-8">
  <p>© 2025 Portal IDS — Todos os direitos reservados.</p>
</footer>
```

---

## 🧰 Boas Práticas

1. **Nunca sobrescrever diretamente tokens primários.**  
   Use classes do Tailwind e mantenha a consistência.

2. **Evite CSS customizado local.**  
   Centralize ajustes via utilitários do Tailwind.

3. **Fontes e cores são parte do IDS** — qualquer alteração deve ser replicada nos dois projetos.

4. **Design tokens versionados.**  
   Futuramente, este IDS poderá ser convertido em um pacote NPM (`@ids/tokens`) para unificar temas.

---

## 🧩 Estrutura de Arquivos

Cada projeto possui seu próprio Tailwind configurado com os mesmos tokens:

### **Next.js**
```
next-host/
  ├── tailwind.config.js
  ├── app/
  │   └── layout.tsx
  └── styles/
      └── globals.css
```

### **Angular**
```
angular-webcomponent/
  ├── tailwind.config.js
  └── src/
      └── styles.scss
```

---

## 🚀 Evolução Futura

| Etapa | Objetivo | Status |
|--------|-----------|--------|
| 🎨 Padronizar paleta + fonte | Definir base visual comum | ✅ |
| 🧱 Header/Footer compartilhado | Criar layouts consistentes | ✅ |
| 📦 IDS NPM Package | Centralizar tokens em `@ids/tokens` | 🔜 |
| 🧩 Componentes React/Angular compartilhados | Criar Botões, Inputs e Cards | 🔜 |

---

**Autor:** Leandro Santana  
**Última atualização:** Outubro de 2025  
**Versão:** 1.0.0