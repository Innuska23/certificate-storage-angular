import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import ASN1 from '@lapo/asn1js';

import { Certificate } from '../../../../../models/certificate-model';
import { CertificateParseService } from '../../../services/certificate-parce.service';
import { CertificateStoreService } from '../../../services/certificate-store.service';

@Component({
    standalone: true,
    selector: 'app-certificate-download',
    templateUrl: './certificate-download.component.html',
})
export class CertificateDownloadComponent {
    public error: string | undefined;
    @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

    constructor(private certificateParseService: CertificateParseService, public certificateStoreService: CertificateStoreService, public router: Router) { }

    handleCleanError() {
        this.error = undefined
    }

    handleAddCertificate(certificate: Certificate): void {
        const existingCertificate = this.certificateStoreService.certificateList.find(cert => cert.commonName === certificate.commonName);
        if (existingCertificate) {
            // alert(`Сертифікат з назвою "${certificate.commonName}" вже існує`, 'Закрити', {
            //     duration: 3000,
            //     horizontalPosition: 'center',
            //     verticalPosition: 'top'
            // });
            return;
        }
        this.certificateStoreService.addCertificate(certificate);
        this.router.navigate(['/preview'], { state: { certificate } });
    }

    handleDragOver(event: DragEvent): void {
        event.preventDefault();
    }

    handleDrop(event: DragEvent): void {
        event.preventDefault();
        const files = event.dataTransfer?.files;
        if (files && files.length > 0) {
            const file = files[0];
            this.parseCertificate(file);
        }
    }

    handleFileInputChange(event: Event): void {
        const files = (event.target as HTMLInputElement)?.files;
        if (files && files.length > 0) {
            const file = files[0];
            this.parseCertificate(file);
        }
    }

    parseCertificate(file: File): void {
        const reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = () => {
            try {
                const result = ASN1.decode(reader.result as string);

                if (result.typeName() !== 'SEQUENCE') {
                    throw new Error('Неправильна структура конверта сертифіката (очікується SEQUENCE)');
                }

                const tbsCertificate = result.sub?.[0];
                const certValues = this.certificateParseService.parseTbsCertificate(tbsCertificate);

                if (certValues && Object.values(certValues).every(element => !!element)) {
                    this.handleAddCertificate(certValues);
                } else {
                    throw new Error("Не всі необхідні поля знайдені");
                }
            } catch (error: any) {
                // this.snackBar.open(error?.message || error || "Помилка не визначена", 'Закрити', {
                //     duration: 3000,
                //     horizontalPosition: 'center',
                //     verticalPosition: 'top'
                // });
            }
        };
        reader.onerror = () => {
            console.error(reader.error);
            // this.snackBar.open(reader.error?.message || 'Сталася помилка при зчитуванні файлу', 'Закрити', {
            //     duration: 3000,
            //     horizontalPosition: 'center',
            //     verticalPosition: 'top'
            // });
        };
    }

    openFileDialog(): void {
        this.fileInput.nativeElement.click();
    }
}
