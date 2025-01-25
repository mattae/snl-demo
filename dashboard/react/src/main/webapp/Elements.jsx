import { createRoot } from 'react-dom/client';
import WebComponentsProviders from './web-components.providers';
import BarchartComponent from './chart/chart-component';

class BarchartElement extends HTMLElement {
    connectedCallback() {
        const root = createRoot(this);
        root.render(
            <WebComponentsProviders>
                <BarchartComponent/>
            </WebComponentsProviders>
        );
    }
}

// Register the Web Components with unique tag names
if (!customElements.get('barchart-element')) {
    customElements.define('barchart-element', BarchartElement);
}
