import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';
import M3 from './layout/theme/M3/M3.tsx';
import { I18nProvider } from './utils/@i18n/I18nProvider.tsx';

async function enableMocking() {
    if (process.env.NODE_ENV === 'development') {
        return
    }

    // @ts-ignore
    const {worker} = await import('./mocks/browser')

    return worker.start()
}

const container = document.getElementById('app') as Element;
const root = createRoot(container);

enableMocking().then(() => {
    root.render(
        <I18nProvider>
            <M3>
                <App/>
            </M3>
        </I18nProvider>
    )
});
