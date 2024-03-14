import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Certificate } from '../../models/certificate-model';

@Injectable({
    providedIn: 'root'
})
export class CertificateService {
    private certificateListSubject = new BehaviorSubject<Certificate[]>([]);
    certificateList$ = this.certificateListSubject.asObservable();

    private certificateSelectedSubject = new BehaviorSubject<Certificate | undefined>(undefined);
    certificateSelected$ = this.certificateSelectedSubject.asObservable();

    constructor() {
        const storedCertificates = localStorage.getItem('certificates');
        const certificateSelected = localStorage.getItem('certificateSelected');

        if (storedCertificates) {
            this.certificateListSubject.next(JSON.parse(storedCertificates));
        }
        if (certificateSelected) {
            this.certificateSelectedSubject.next(JSON.parse(certificateSelected));
        }
    }

    addCertificate(certificate: Certificate): void {
        const updatedCertificates = [...this.certificateListSubject.value, certificate];
        this.certificateListSubject.next(updatedCertificates);
        this.setLocalStorage('certificates', updatedCertificates);
        this.setCertificateSelected(certificate);
    }

    setCertificateSelected(certificate?: Certificate): void {
        this.certificateSelectedSubject.next(certificate);
        this.setLocalStorage('certificateSelected', certificate);
    }

    private setLocalStorage(key: string, value: any): void {
        localStorage.setItem(key, JSON.stringify(value));
    }
}
