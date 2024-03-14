import { Component, OnChanges } from '@angular/core';
import { Router } from '@angular/router';

import { Certificate } from '../../../../../models/certificate-model';
import { CertificateStoreService } from '../../../services/certificate-store.service';
import { CommonModule } from '@angular/common';
import { CertificateDetailsComponent } from '../../../../../components/certificate-details/certificate-details.component';

@Component({
  selector: 'app-certificate-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './certificate-preview.component.html',
})
export class CertificatePreviewComponent implements OnChanges {
  certificateList: Certificate[] = [];
  certificate: Certificate | undefined;
  isCertificatesExist: boolean = false;

  constructor(private certificateStoreService: CertificateStoreService, public router: Router) {

  }

  navigateToUpload() { }

  ngOnChanges() {
    this.certificateList = this.certificateStoreService.certificateList;
    // this.certificate = this.router.getCurrentNavigation()?.extras.state?.certificate;
    this.isCertificatesExist = !!this.certificate || !!this.certificateList.length;
  }
}
