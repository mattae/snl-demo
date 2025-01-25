import { EnvironmentProviders, Provider } from '@angular/core';
import { HttpEvent, HttpHandlerFn, HttpRequest, provideHttpClient, withInterceptors } from '@angular/common/http';
import { Observable } from 'rxjs';

export const authInterceptor = (request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
    if (!request || !request.url || (request.url.startsWith('http'))) {
        return next(request);
    }

    request = request.clone({
        setHeaders: {
            Authorization: 'Basic YWRtaW46YWRtaW4='
        }
    });

    return next(request);
}

export const provideInterceptor = (): Array<Provider | EnvironmentProviders> => {
    return [
        provideHttpClient(withInterceptors([authInterceptor])),
    ];
};
