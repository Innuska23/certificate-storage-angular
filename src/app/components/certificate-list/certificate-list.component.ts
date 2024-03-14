import { Component } from '@angular/core';
import { Certificate } from '../../models/certificate-model';
import { CertificateService } from '../../services/certificate.service';

@Component({
  selector: 'app-certificate-list',
  templateUrl: './certificate-list.component.html',
  styleUrls: ['./certificate-list.component.css']
})
export class CertificateListComponent {
  certificateList: Certificate[];
  certificateSelected: Certificate | null;

  constructor(private certificateService: CertificateService) {
    this.certificateService.getCertificates().subscribe(certificates => {
      this.certificateList = certificates;
    });
    this.certificateService.getCertificate().subscribe(certificate => {
      this.certificateSelected = certificate;
    });
  }

  handleSelectCertificate(certificate: Certificate): void {
    this.certificateService.setCertificateSelected(certificate);
  }
}
