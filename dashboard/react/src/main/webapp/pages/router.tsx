import { Navigate, Route, Routes } from "react-router-dom";
import pagesData from "./pagesData";
import MainLayout from "./Layout/MainLayout";
import { useTranslation } from 'react-i18next';
import { routerType } from './types/router.types.ts';

const Router = () => {
    const { t } = useTranslation();

    const pageRoutes = pagesData.map(({ path, title, element }: routerType) => {
        return <Route key={t(title)} path={`/${path}`} element={element} />;
    });

    return (
        <Routes>
            <Route element={<MainLayout />} path="/">
                <Route index element={<Navigate to="/Home" replace />} />
                {pageRoutes}
            </Route>
        </Routes>
    );
};

export default Router;
