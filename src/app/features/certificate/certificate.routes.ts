import { Route } from '@angular/router';

import { CertificateDownloadComponent } from './components/certificate/certificate-download/certificate-download.component';
import { CertificatePreviewComponent } from './components/certificate/certificate-preview/certificate-preview.component';

export const CERTIFICATE_ROUTES: Route[] = [{
  path: 'preview',
  component: CertificatePreviewComponent
}, {
  path: 'upload',
  component: CertificateDownloadComponent
},
{
  path: '**',
  redirectTo: 'preview'
}];
