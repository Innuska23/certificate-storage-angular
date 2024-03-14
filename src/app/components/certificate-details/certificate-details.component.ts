import { Component } from '@angular/core';
import { Certificate } from '../../models/certificate-model';
import { CertificateStoreService } from '../../features/certificate/services/certificate-store.service';

@Component({
  selector: 'app-certificate-details',
  templateUrl: './certificate-details.component.html',
})
export class CertificateDetailsComponent {
  certificateSelected?: Certificate;

  constructor(private certificateService: CertificateStoreService) {
    this.certificateSelected = this.certificateService.certificateSelected;
  }
}
