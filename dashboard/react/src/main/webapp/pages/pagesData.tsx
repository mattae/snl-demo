import Home from './Home/Home.tsx';
import { routerType } from './types/router.types.ts';
import BarchartComponent from '../chart/chart-component.tsx';

const pagesData: routerType[] = [
    {
        path: 'Home',
        element: <Home />,
        title: 'Home',
        icon: 'material-outline:home'
    },
    {
        path: 'barchart',
        element: <BarchartComponent />,
        title: 'Barchart',
        icon: 'material-outline:library_books'
    },
];

export default pagesData;
