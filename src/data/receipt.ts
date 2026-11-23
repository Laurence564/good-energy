import {type Download} from '@playwright/test';
import {buffer as toBuffer} from 'node:stream/consumers';
import {PDFParse} from 'pdf-parse';

const ITEM_TOTAL = /Item total\s*(\$[\d,]+\.\d{2})/i;
const TAX = /\bTax\s*(\$[\d,]+\.\d{2})/i;
const TOTAL = /(?<!Item\s)\bTotal\s*(\$[\d,]+\.\d{2})/i;

export class Receipt {

    private constructor(public readonly buffer: Buffer, public readonly text: string) {

    }

    static async fromDownload(download: Download): Promise<Receipt> {
        const bytes = await toBuffer(await download.createReadStream());
        const parser = new PDFParse({data: bytes});

        try {
            const {text} = await parser.getText();
            return new Receipt(bytes, text);
        } finally {
            await parser.destroy();
        }
    }

    get itemTotal(): string | null {
        return this.match(ITEM_TOTAL);
    }

    get tax(): string | null {
        return this.match(TAX);
    }

    get total(): string | null {
        return this.match(TOTAL);
    }

    private match(pattern: RegExp): string | null {
        return this.text.match(pattern)?.[1] ?? null;
    }
}