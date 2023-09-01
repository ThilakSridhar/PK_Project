import { Injectable } from "@angular/core";
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Injectable({
    providedIn: "root",
})
export class PDFGeneratorService {
    constructor() {}

    generatePDF(docDefinition: any) {
        pdfMake.createPdf(docDefinition).open();
    }
}
