
export class CertificateParseService {
    private getObjectIdentifierValues(normalizedTbsCertificate: string): { [key: string]: string } {
        const values = normalizedTbsCertificate?.match(/OBJECT_IDENTIFIER[\s\S]*?SET/gm);

        const result: { [key: string]: string } = {};

        values?.forEach((item: string) => {
            let key = item
                .match(/\|.*?\|/gm)?.[0].replace(/\|/g, "");
            const value = item
                .match(/UTF8String[\s\S]*?SET/gm)?.[0]
                .split(":")[1]
                .split("\n")[0]
                .replace(/SET/g, "");

            if (key && result[key]) {
                key = `subject${key[0].toUpperCase()}${key.slice(1)}`;
            }

            if (key && value) {
                result[key] = value;
            }
        });

        return result;
    }

    private getTimeTbsCertificate(normalizedTbsCertificate: string): { from?: string | null, to?: string | null } {
        const values = normalizedTbsCertificate?.match(/UTCTime.*?UTC/gm);
        const result: { from?: string | null, to?: string | null } = {};

        const dates = values?.map((item) => {
            const dateMatch = item.match(/\d{2}(?=\d{2}(Z))/gm); // Пошук двоцифрових чисел перед 'Z'
            const date = dateMatch?.[0]?.replace(/(\d{2})(?=\d{2}(Z))/gm, '$1:'); // Додавання роздільника ":" між годинами та хвилинами
            return date || null;
        });

        result.from = dates?.[0] || null;
        result.to = dates?.[1] || null;

        return result;
    }

    public parseTbsCertificate(tbsCertificate: any): { commonName: string, issuerCN: string, validFrom: string, validTo: string } | undefined {
        if (!tbsCertificate) return undefined;

        const normalizedTbsCertificate = tbsCertificate.toPrettyString();

        const objectIdentifierValues = this.getObjectIdentifierValues(normalizedTbsCertificate);
        const timeValues = this.getTimeTbsCertificate(normalizedTbsCertificate);

        const commonName = objectIdentifierValues?.['commonName'] || '';
        const issuerCN = objectIdentifierValues?.['subjectCommonName'] || '';
        const validFrom = timeValues.from || '';
        const validTo = timeValues.to || '';

        return {
            commonName,
            issuerCN,
            validFrom,
            validTo,
        };
    }
}
