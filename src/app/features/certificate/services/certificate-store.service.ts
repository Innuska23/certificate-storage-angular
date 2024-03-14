import { Certificate } from "../../../models/certificate-model";

export class CertificateStoreService {
    public certificateList: Certificate[] = [];
    public certificateSelected: Certificate | undefined;

    constructor() {
        const storedCertificates = localStorage.getItem('certificates');
        const certificateSelected = localStorage.getItem('certificateSelected');

        if (storedCertificates) {
            this.certificateList = JSON.parse(storedCertificates);
        }
        if (certificateSelected) {
            this.certificateSelected = JSON.parse(certificateSelected);
        }
    }

    addCertificate(certificate: Certificate): void {
        const updatedCertificates = [...this.certificateList, certificate];
        this.certificateList = updatedCertificates;
        this.setLocalStorage('certificates', updatedCertificates);
        this.setCertificateSelected(certificate);
    }

    setCertificateSelected(certificate?: Certificate): void {
        this.certificateSelected = certificate;
        this.setLocalStorage('certificateSelected', certificate);
    }

    private setLocalStorage(key: string, value: any): void {
        localStorage.setItem(key, JSON.stringify(value));
    }
}
