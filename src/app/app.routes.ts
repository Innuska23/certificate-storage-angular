import { Routes } from '@angular/router';
import { CertificateComponent } from './features/certificate/certificate.component';
import { CERTIFICATE_ROUTES } from './features/certificate/certificate.routes';

export const APP_ROUTES: Routes = [{
    path: '',
    component: CertificateComponent,
    children: CERTIFICATE_ROUTES
}];
