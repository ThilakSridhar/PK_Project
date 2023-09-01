import { HttpClient } from "@angular/common/http";
import { Component, OnInit, EventEmitter, Input, Output } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NzMessageService } from "ng-zorro-antd/message";

import { environment } from "src/environments/environment";
import { Goods, TransportBill } from "src/app/models";
import { ActivatedRoute, Router } from "@angular/router";
import { PDFGeneratorService } from "src/app/services/pdfgenerator.service";

// import * as pdfMake from 'pdfmake/build/pdfmake';
// import * as pdfFonts from 'pdfmake/build/vfs_fonts'; 

// pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: "app-proforma-invoice",
  templateUrl: "./proforma-invoice.component.html",
  styleUrls: ["./proforma-invoice.component.scss"],
})
export class ProformaInvoiceComponent {
  form: FormGroup;

  _billId = -1;

  get billId() {
    return this._billId;
  }

  set billId(id: number) {
    this._billId = id;
    if (id > 0)
      this.http
        .get<TransportBill>(`${environment.apiUrl}/transport-bill/${id}`)
        .subscribe((data: TransportBill) => {
          this.form.patchValue(data);
          this.form.setControl("goods", this.setGoods(data.goods));
        });
  }

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private message: NzMessageService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe((params: any) => {
      if (params.id) this.billId = Number(params.id);
    });
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
      spare: ["", [Validators.required]],
      quantity: ["", [Validators.required]],
      amount: ["", [Validators.required]],
      model: ["", Validators.required],
      serialNumber: ["", Validators.required],
      delivery: ["", Validators.required],
    });
  }

  setGoods(goods: any[]): FormArray {
    const formArray: any = new FormArray([]);
    // let serialNo = 1;
    goods.forEach((d: any) => {
      formArray.push(
        this.fb.group({
          // serialNo:serialNo,
          id: d.id,
          spare: d.spare,
          quantity: d.quantity,
          amount: d.amount,
          model: d.model,
          serialNumber: d.serialNumber,
          delivery: d.delivery,
        })
      );
      // serialNo++;
    });
    return formArray;
  }

  submit() {

    let totalPrice = this.form.value.goods
      .reduce((sum: number, g: any) => sum + g.quantity * g.amount, 0)
      .toFixed(2);
    let count=1

    let docDefinition: any = {
      content: [
        {
          text: "PI No: 23119123440096",
          fontSize: "10",
          alignment: "left",
        },

       




        {
          text: " ",
          alignment: "left",
          fontSize: "3",
        },
        // {
        // doc.addImage('path/to/your/image.png', 'PNG', x, y, width, height);
        // },
        // {
        //   text: this.form.value.consigneeName,

        // },
        {
          text: `Date:${this.form.value.Date.toLocaleDateString()}`,
          alignment: "left",
          fontSize: "10",
        },

        // {
        //   image: 'assets/kraftimg.png', // Replace with the actual relative path to the image
        //   width: 100,
        //   alignment: 'right',
        //   margin: [0, 10],
        // },

        // {
        //   image: 'assets/pec-logo.png',
        // },
       
        {
          text: "KRAFT AUTO PARTS",
          fontSize: "20",
          alignment: "right",
          bold: true,
          fontWeight:[900],
          color: "#1164c7",
        },
        {
          text: "KRAFT AUTO PARTS PVT LTD",
          fontSize: "12",
          bold: true,
          alignment: "left",
          color: "black",
        },
        {
          text: " ",
          alignment: "left",
          fontSize: "2",
        },
        {
          text: "GSTIN : 33CXEPD5628J1ZJ",
          alignment: "left",
          fontSize: "9",
        },
        {
          text: " ",
          alignment: "left",
          fontSize: "2",
        },
        {
          text: "                                              PROFORMA INVOICE                                              ",
          fontSize: 16,
          bold: true,
          alignment: "center",
          color: "#093569",
          background: "#bed9ef",
          width: "100",
        },
        {
          text: " ",
          alignment: "left",
          fontSize: "5",
        },
        // {
        //   text: " ",
        //   alignment: "left",
        //   fontSize: "5",
        // },
        {
          columns: [
            [
              {
                text: this.form.value.consigneeName,
                bold: true,
                alignment: "left",
                fontfamily: "serif",
              },

              {
                text: " ",
                alignment: "left",
                fontSize: "4",
              },

              {
                text: this.form.value.Address,
                alignment: "left",
                fontSize: "11",
              },

              {
                text: " ",
                alignment: "left",
                fontSize: "4",
              },

              {
                text: `Kind Attention : ${this.form.value.CustomerName}`,
                alignment: "left",
                bold: true,
                fontSize: "11",
              },
              {
                text: " ",
                alignment: "left",
                fontSize: "4",
              },
            ],
            [
              {
                text: `PO No:${
                  this.form.value.PONO
                }.${this.form.value.Date.toLocaleDateString()}`,
                alignment: "right",
                fontSize: "10",
              },
            ],
          ],
        },
        {
          fontSize: "10",

          table: {
            headerRows: 1,
            background: "#D7D5D5",
            fontSize: "1",
            widths: ["auto","*", "auto", "auto", "auto", "auto"],
            body: [
              [
                "sNo",
                "MachineDetails",
                "Spare",
                // "Delivery",
                "Quantity",
                "Price",
                "Amount",
              ],
              ...this.form.value.goods.map(
                (g: {
              
                  model: any;
                  serialNumber: any;
                  spare: any;
                  quantity: any;
                  amount: number;
                  // delivery: number
                }) => [
                  
                  count++,
                  `${g.model} \n${g.serialNumber}`,
                  g.spare,
                  // g.delivery,
                  g.quantity,
                  g.amount,
                  (g.amount * g.quantity).toFixed(2),
                ]
              ),
              // ['Product', 'Price', 'Quantity', 'Amount'],
              // ...this.form.value.products.map(p => ([Spare.name, Amount.price, Quantity.qty, (Amount.price*Quantity.qty).toFixed(2)])),
              [
                { text: "Total Amount",fontSize: "10", colSpan: 5 },
                {},
                {},
                {},
                {},
                
                totalPrice,
              ],
              [
                { text: "CGST @ 9%",fontSize: "10", colSpan: 5 },
                {},
                {},
                {},
                {},
                
                (totalPrice * 0.09).toFixed(2),
              ],
              [
                { text: "SGST @ 9% ",fontSize: "10", colSpan: 5 },
                {},
                {},
                {},
                {},
                
                (totalPrice * 0.09).toFixed(2),
              ],
              [
                { text: "Total (EXWORKS)",fontSize: "10", colSpan: 5 },
                {},
                {},
                {},
                {},
                
                (totalPrice * 1.18).toFixed(2),
              ],
            ],
          },
        },
        {
          text: " ",
          alignment: "left",
          fontSize: "4",
        },
        {
          text: "HSN Code: 84549000 applicable for above all machinery items",
          bold: true,
          fontSize: "10",
        },
        {
          text: " ",
          alignment: "left",
          fontSize: "8",
        },
        {
          text: "Terms & Conditions :",
          style: "sectionHeader",
          bold: true,
          decoration: "underline",
          fontSize: "12",
        },
        {
          text: " ",
          alignment: "left",
          fontSize: "6",
        },
        {
          text: "Payment        : 100% RTGS before dispatch",
          fontSize: "10",
        },
        {
          text: " ",
          alignment: "left",
          fontSize: "8",
        },
        {
          text: "Validity          : 30 days from issuance date",
          fontSize: "10",
        },
        {
          text: " ",
          alignment: "left",
          fontSize: "8",
        },
        {
          text: "Delivery         : Payment against delivery",
          fontSize: "10",
        },
        {
          text: " ",
          alignment: "left",
          fontSize: "8",
        },
        {
          text: "Please make your payment to below account details :",
          style: "sectionHeader",
          bold: true,
          decoration: "underline",
          fontSize: "12",
        },
        {
          text: " ",
          alignment: "left",
          fontSize: "8",
        },
        {
          text: "Beneficiary                   : KRAFT AUTOPARTS PRIVATE LIMITED",
          fontSize: "10",
        },
        {
          text: " ",
          alignment: "left",
          fontSize: "8",
        },
        {
          text: "Credit Account No      : 0777102000015260",
          fontSize: "10",
        },
        {
          text: " ",
          alignment: "left",
          fontSize: "8",
        },
        {
          text: "Center                           : Chennai",
          fontSize: "10",
        },
        {
          text: " ",
          alignment: "left",
          fontSize: "8",
        },
        {
          text: "Bank Name                  : IDBI Bank",
          fontSize: "10",
        },
        {
          text: " ",
          alignment: "left",
          fontSize: "8",
        },
        {
          text: "Address of Bank         : J-19, III Avenue, Anna Nagar, Chennai-600102",
          fontSize: "10",
        },
        {
          text: " ",
          alignment: "left",
          fontSize: "8",
        },
        {
          text: "Account Type              : CC Account",
          fontSize: "10",
        },
        {
          text: " ",
          alignment: "left",
          fontSize: "8",
        },
        {
          text: "IFSC Code                   : IBKL0000777",
          fontSize: "10",
        },
        {
          text: " ",
          alignment: "left",
          fontSize: "15",
        },
        {
          columns: [
            [{ qr: `${this.form.value.consigneeName} ${this.form.value.CustomerName} ${this.form.value.Address} ${
              this.form.value.PONO}`, fit: '60' }],
            [
              {
                text: "for Kraft Autoparts Private Limited",
                alignment: "right",
                italics: true,
                bold: true,
                fontSize: 10,
              },
            ],
          ],
        },
        {
          text: " ",
          alignment: "left",
          fontSize: "40",
        },
        {
          text: "....................................................................................",
          bold: true,
          alignment: "center",
          color: "#1164c7",
          fontSize: "22",
        },
        // {
        //   text: "6, Spartan Avenue, Mogappair East, Chennai - 600037",
        //   alignment: "left",
        //   fontSize: "10",
        // },
        // {
        //   text: " ",
        //   alignment: "left",
        //   fontSize: "4",
        // },
        // {
        //   text: "+91 9840940913",
        //   alignment: "left",
        //   fontSize: "10",
        // },
        // {
        //   text: "sps@tvenka.com",
        //   alignment: "right",
        //   fontSize: "10",
        // },
        {
        columns: [
          [
            {
              text: "20&21,Vasantham nagar,Thirumudivakkam,Chennai-600132",
              alignment: "left",
              fontSize: "9",
          },
          
          ],
          [
            {
              text: "www.kraftauto.in",
              alignment: "right",
              fontSize: "9", 
            },

          ]
            
            

        ]

        },

        {
          text: " ",
          alignment: "left",
          fontSize: "2",
          
        },


        // {
        //   // you'll most often use dataURI images on the browser side
        //   // if no width/height/fit is provided, the original size will be used
        //   image: "assets/kraftimg.png"
        // },




        {
          columns: [
            [
              {
                text: "+91 9840940913",
                alignment: "left",
                fontSize: "9",
            },
            
            ],
            [
              {
                text: "sps@tvenka.com",
                alignment: "right",
                fontSize: "9", 
              },
  
            ]
              
              
  
          ]
  
          }
        





      ],
    };
    new PDFGeneratorService().generatePDF(docDefinition);
  }
}
