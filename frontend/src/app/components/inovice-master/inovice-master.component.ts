import { HttpClient } from "@angular/common/http";
import { Component, OnInit, EventEmitter, Input, Output } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NzMessageService } from "ng-zorro-antd/message";

import { ActivatedRoute, Router } from "@angular/router";
import { PDFGeneratorService } from "src/app/services/pdfgenerator.service";

@Component({
  selector: "app-inovice-master",
  templateUrl: "./inovice-master.component.html",
  styleUrls: ["./inovice-master.component.scss"],
})
export class InoviceMasterComponent {
  form: FormGroup;

  _billId = -1;

  get billId() {
    return this._billId;
  }

  // set billId(id: number) {
  //   this._billId = id;
  //   if (id > 0)
  //     this.http
  //       .get<TransportBill>(`${environment.apiUrl}/transport-bill/${id}`)
  //       .subscribe((data: TransportBill) => {
  //         this.form.patchValue(data);
  //         this.form.setControl("goods", this.setGoods(data.goods));
  //       });
  // }

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private message: NzMessageService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // this.route.params.subscribe((params: any) => {
    //   if (params.id) this.billId = Number(params.id);
    // });
    this.form = fb.group({
      consigneeName: ["", [Validators.required]],

      Date: ["", [Validators.required]],
      CustomerName: ["", [Validators.required]],
      Address: ["", [Validators.required]],
      gstno: ["", [Validators.required]],
      INDNo: ["", [Validators.required]],
      products: ["", [Validators.required]],
      PONO: ["", [Validators.required]],
      Spare: ["", [Validators.required]],
      Quantity: ["", [Validators.required]],
      Amount: ["", [Validators.required]],
      MachineDetails: ["", [Validators.required]],
      email:["", [Validators.required]],
      cin : ["", [Validators.required]],
      pan :["", [Validators.required]],
      gstin :["", [Validators.required]],
      addressline1 : ["", [Validators.required]],
      addressline2 : ["", [Validators.required]],
      addressline3  : ["", [Validators.required]],
      customercode : ["", [Validators.required]],
      state: ["", [Validators.required]],
      customergst: ["", [Validators.required]],

      goods: fb.array([this.createProductsForm()]),
    });
  }
  ngOnInit(): void {}

  get productsForm() {
    return this.form.get("goods") as FormArray;
  }

  createProductsForm(): FormGroup {
    return this.fb.group({
      id: null,
      hta: ["", [Validators.required]],
      productdescription: ["", [Validators.required]],
      hsnsac: ["", [Validators.required]],
      qty: ["", [Validators.required]],
      uom: ["", [Validators.required]],
      rate: ["", [Validators.required]],
      value: ["", [Validators.required]],
      
    });
  }

  setGoods(goods: any[]): FormArray {
    const formArray: any = new FormArray([]);
    goods.forEach((d: any) => {
      formArray.push(
        this.fb.group({
          id: d.id,
          hta: d.hta,
          productdescription: d.productdescription,
          hsnsac: d.hsnsac,
          qty: d.qty,
          uom: d.uom,
          rate: d.rate,
          value: d.value,
        })
      );
    });
    return formArray;
  }

  submit() {
    let totalPrice = this.form.value.goods
      .reduce((sum: number, g: any) => (sum += g.qty * g.rate), 0)
      .toFixed(2);
      const toword = require('num-words')
      

    let docDefinition: any = {
      content: [
        {
          columns: [
            [
              {
                text: "KRAFT AUTO PARTS",
                bold: true,
                color : "#0968f7",
                fit: "100",
              },
              { text: "Registered Office: ", bold: true, fontSize: 10 },
              { text: "20&21, Vasantham nagar,", bold: true, fontSize: 10 },
              { text: "Thirumudivakkam,", bold: true, fontSize: 10 },
              { text: "Chennai-132.", bold: true, fontSize: 10 },
            ],
            [
              {
                text: "ORIGINAL FOR RECiPIENTS",
                alignment: "center",
                bold: true,
                color : "#0968f7",
                fit: "100",
              },
              {
                text: `E-Mail  :  ${this.form.value.email}` ,
                alignment: "left",
                bold: true,
                fontSize: 10,
              },
              {
                text: `CIN       :  ${this.form.value.cin}     `,
                bold: true,
                fontSize: 10,
                alignment: "left",
              },
              {
                text: `PAN      :  ${this.form.value.pan}  `,
                bold: true,
                fontSize: 10,
                alignment: "left",
              },
              {
                text: `GSTIN  :  33CXEPD5628J1ZJ   `,
                bold: true,
                fontSize: 10,
                alignment: "left",
              },
            ],
          ],
        },

        { text: "            " },
        {
          text: "(SEC 31(1) OF GST ACT2017)",
          color : "#0968f7",
          fit: 0,
          fontSize: 8,
        },
        {
          text: "   ",
        },
        {
          text: "TAX INVOICE",
          color : "#0968f7",
          decoration: "underline",
          alignment: "center",
        },
        {text:"          "},
        {
          
          columns: [
            [
              { text: "Our Invoice ref   :", bold: true, fontSize:10},
              { text: "Invoice Date       :", bold: true, fontSize: 10 },
              { text: "Time Of Supply  :", bold: true, fontSize: 10 },
              { text: "Vendor Code      :", bold: true, fontSize: 10 },
            ],
            [
              {
                text: "Cust P.O No       :",
                alignment: "left",
                bold: true,
                fontSize: 10
              },
              {
                text: "Payment Team : ",
                alignment: "left",
                bold: true,
                fontSize: 10,
              },
              { text: "     ", bold: true, fontSize: 10, alignment: "left" },
              {
                text: "Checksheet No :",
                bold: true,
                fontSize: 10,
                alignment: "left",
              },
            ],
          ],
        },
        { text: "       " },
        {
          
          columns: [
            [
              {
                text: "Shipping Address/Place Of Supply:",
                color : "#0968f7",
                bold: true,
                decoration: "underline",
                alignment: "left",
              },
              { text: `${this.form.value.addressline1}`, bold: true, fontSize: 10 },
              { text: `${this.form.value.addressline2}`, bold: true, fontSize: 10 },
              { text: `${this.form.value.addressline3}`, bold: true, fontSize: 10 },
              { text: "   ", bold: true, fontSize: 10 },
              { text: `Customer Code :  ${this.form.value.customercode}`, bold: true, fontSize: 10 },
              { text: `State                    :  ${this.form.value.state}`, bold: true, fontSize: 10 },
              { text: `GSTIN                  :  ${this.form.value.customergst}`, bold: true, fontSize: 10 },
            ],
            [
              {
                text: "Billing address:",
                color : "#0968f7",
                decoration: "underline",
                bold: true,
                alignment: "left",
              },
              { text: `${this.form.value.addressline1}`, alignment: "left", bold: true, fontSize: 10 },
              { text: `${this.form.value.addressline2}`, bold: true, fontSize: 10, alignment: "left" },
              { text: `${this.form.value.addressline3}`, bold: true, fontSize: 10, alignment: "left" },
              { text: "    ", bold: true, fontSize: 10, alignment: "left" },

              {
                text: `Customer Code :  ${this.form.value.customercode}`,
                bold: true,
                fontSize: 10,
                alignment: "left",
              },
              {
                text: `State                    :  ${this.form.value.state}`,
                bold: true,
                fontSize: 10,
                alignment: "left",
              },
              {
                text: `GSTIN                  :  ${this.form.value.customergst}`,
                bold: true,
                fontSize: 10,
                alignment: "left",
              },
            ],
          ],
        
        },
        { text: "               " },
        // {
        //   text: "IRN NO:",
        //   fontSize: 10,
        // },
        {
          table: {
            headerRows: 1,

            widths: ["*", "auto", "auto", "auto", "auto", "auto", "auto"],
            body: [
              [
                "HTA" ,
                "Product Description",
                "HSN/SAC",
                "QTY",
                "UOM",
                "RATE",
                "VALUE",
              ],
              ...this.form.value.goods.map(
                (g: {
                  hta: any;
                  productdescription: any;
                  hsnsac: any;
                  qty: any;
                  uom: any;
                  rate: number;
                  value: number;
                }) => [
                  g.hta,
                  g.productdescription,
                  g.hsnsac,
                  g.qty,
                  g.uom,
                  g.rate,
                  g.value,
                  // (g.rate * g.qty).toFixed(2),
                ]
              ),

              [
                { text: "Total Amount", colSpan: 6 },
                {},
                {},
                {},
                {},
                {},
                totalPrice,
              ],
              [
                { text: "IGST @ 28%", colSpan: 6 },
                {},
                {},
                {},
                {},
                {},
                (totalPrice * 0.28).toFixed(2),
              ],
              [
                { text: "Grand Total", colSpan: 6 },
                {},
                {},
                {},
                {},
                {},
                (totalPrice * 1.28).toFixed(2),
              ],
            ],
          },
        },
        { text: "           " },
        {
          qr: "hello",
          fit: "50",
          alignment: "bottom-left",
        },
        
      ],
    };
    new PDFGeneratorService().generatePDF(docDefinition);
  }
}
