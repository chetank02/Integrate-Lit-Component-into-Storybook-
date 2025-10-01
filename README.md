Integrate a **Lit component** into **Storybook**, using **Vite** as the bundler and **TypeScript**.

## 📁 Project Setup (in VS Code)

```bash
mkdir lit-storybook-project
cd lit-storybook-project
npm init -y
```

### 📦 Install Lit and TypeScript

```bash
npm install lit @lit/reactive-element @lit/decorators
npm install typescript --save-dev
```

### 📄 Create `tsconfig.json`

If you don't have one yet:

```bash
npx tsc --init
```

You can edit it like this for better Lit + Storybook compatibility:

```json
{
  "compilerOptions": {
    "target": "es2020",
    "module": "esnext",
    "moduleResolution": "node",
    "outDir": "dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "lib": ["esnext", "dom"]
  },
  "include": ["src"]
}
```

---

## ⚡ Vite Setup (for local dev bundling)

```bash
npm create vite@latest
# Choose: "vanilla" or "vanilla-ts" as the framework

cd <your-project-name>
npm install
npm run dev
```

Make sure your Lit components live in `src/` and are exported as ES modules.

---

## 📚 Storybook Setup for Web Components (Lit)

```bash
npx storybook@latest init --type web_components
```

This sets up Storybook tailored for Lit/Web Components.

### 🔧 Configure Storybook (if needed)

* Modify `.storybook/main.js` (or `main.ts`) to use Vite:

```js
// .storybook/main.js
module.exports = {
  framework: {
    name: '@storybook/web-components-vite',
    options: {}
  },
  stories: ['../src/**/*.stories.@(js|ts)'],
  addons: ['@storybook/addon-essentials']
};
```

If you're using TypeScript:

```ts
// .storybook/main.ts
import type { StorybookConfig } from '@storybook/web-components-vite';

const config: StorybookConfig = {
  framework: {
    name: '@storybook/web-components-vite',
    options: {}
  },
  stories: ['../src/**/*.stories.@(js|ts)'],
  addons: ['@storybook/addon-essentials']
};

export default config;
```

---

## 🧱 Create a Lit Component Example

```ts
// src/MyComponent.ts
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('my-component')
export class MyComponent extends LitElement {
  @property() name = 'World';

  static styles = css`
    p {
      color: steelblue;
      font-weight: bold;
    }
  `;

  render() {
    return html`<p>Hello, ${this.name}!</p>`;
  }
}
```

---

## 📘 Create a Story for the Component

```ts
// src/MyComponent.stories.ts
import './MyComponent';

export default {
  title: 'Example/MyComponent',
  component: 'my-component',
  argTypes: {
    name: { control: 'text' }
  }
};

const Template = ({ name }: { name: string }) =>
  `<my-component name="${name}"></my-component>`;

export const Default = Template.bind({});
Default.args = {
  name: 'World'
};
```

---

## 🚀 Run Storybook

```bash
npm run storybook
```

Your Lit component should appear in the Storybook UI.

---

## ✅ Summary

### What You've Done:

* Initialized a Lit + TypeScript project
* Added Vite for bundling
* Set up Storybook for Lit components
* Wrote a Lit component and created a story for it


