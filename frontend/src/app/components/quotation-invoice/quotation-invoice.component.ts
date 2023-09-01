import { HttpClient } from "@angular/common/http";
import { Component, OnInit, EventEmitter, Input, Output } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NzMessageService } from "ng-zorro-antd/message";

import { environment } from "src/environments/environment";
import { Goods, TransportBill } from "src/app/models";
import { ActivatedRoute, Router } from "@angular/router";
import { PDFGeneratorService } from "src/app/services/pdfgenerator.service";

class Product{
  name: string;
  price: number;
  qty: number;
}
class Invoice{
  customerName: string;
  address: string;
  contactNo: number;
  email: string;
  
  products: Product[] = [];
  additionalDetails: string;
  constructor(){
    // Initially one empty product row we will show 
    this.products.push(new Product());
  }
}

@Component({
  selector: 'app-quotation-invoice',
  templateUrl: './quotation-invoice.component.html',
  styleUrls: ['./quotation-invoice.component.scss']
})
export class QuotationInvoiceComponent {
  
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
      customerName: ["", [Validators.required]],
      quoteNumber: ["", [Validators.required]],
      tonnage: ["", [Validators.required]],
      gstin: ["", [Validators.required]],
      address: ["", [Validators.required]],
      date: ["", [Validators.required]],
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
      model: ["", [Validators.required]],
      serialNumber: ["", [Validators.required]],
      spare: ["", [Validators.required]],
      hsn: ["", [Validators.required]],
      delivery: ["", [Validators.required]],
      price: ["", [Validators.required]],
      quantity: ["", [Validators.required]],
    });
  }
  get goodsForm() {
    return this.form.get("goods") as FormArray;
  }
  
  createGoodsForm(): FormGroup {
    return this.fb.group({
      id: null,
      description: ["", [Validators.required]],
      quantity: ["", [Validators.required]],
      totalAmount: ["", [Validators.required]],
    });
  }

  setGoods(goods: Goods[]): FormArray {
    const formArray: any = new FormArray([]);
    goods.forEach((d: Goods) => {
      formArray.push(
        this.fb.group({
          id: d.id,
          description: d.description,
          quantity: d.quantity,
          totalAmount: d.totalAmount,
        })
      );
    });
    return formArray;
  }

  submit() {
    
  //   if (this.form.valid) {
  //     if (this.billId === -1)
  //       this.http
  //         .post(`${environment.apiUrl}/transport-bill`, this.form.value)
  //         .subscribe((data: any) => {
  //           this.message.success("Transport Bill added successfully");
  //           this.form.reset();
  //           this.router.navigate(["/transport-bill"]);
  //         });
  //     else
  //       this.http
  //         .put(`${environment.apiUrl}/transport-bill/${this.billId}`, {
  //           id: this.billId,
  //           ...this.form.value,
  //         })
  //         .subscribe((data: any) => {
  //           this.message.success("Transport Bill updated successfully");
  //           this.billId = -1;
  //           this.form.reset();
  //           this.router.navigate(["/transport-bill"]);
  //         });
  //   } else {
  //     Object.values(this.form.controls).forEach((control: any) => {
  //       if (control.controls?.length >= 1) {
  //         control.controls.forEach((fg: any) => {
  //           Object.values(fg.controls).forEach((control: any) => {
  //             if (control.invalid) {
  //               control.markAsDirty();
  //               control.updateValueAndValidity({ onlySelf: true });
  //             }
  //           });
  //         });
  //       }
  //       if (control.invalid) {
  //         control.markAsDirty();
  //         control.updateValueAndValidity({ onlySelf: true });
  //       }
  //     });
  //   }
  // }

  let docDefinition: any = {
    content: [
        
        {
          text: 'KRAFT AUTO PARTS',
          fontSize: 25,
          
          bold : true,
          alignment: 'right',
          color: 'red',
        },
        { 
          text: `Bill No : ${((Math.random() *1000).toFixed(0))}`,
          size:'8',
          alignment: 'left-top'
        },
        {
          text: `Date: ${this.form.value.date.toLocaleString()}`,
          alignment: 'left',
          fontSize : '8',
         
        },
        {
          text :'KRAFT AUTO PARTS Private Limited',
          fontSize: 16,
          bold: true,
          alignment: 'left',
          color: 'red',
        },
        {
          text:`GSTIN : ${this.form.value.gstin}`,
          style: "sectionHeader",
          fontSize:'10'
        },
        
        {
          text: '                                                               QUOTATION                                                                 ',
          fontSize: 14,
          bold: true,
          alignment: 'center',
          color: 'white',
          background :'red',
          
          
        },
        {
          text: 'KRAFT Auto Parts',
          fontSize: 9,
          bold:true,
          
        },
        {
          text: this.form.value.address,
          fontSize :"9",
         
          
        },
        {
          text: 'Kind Attention: Mr. Pravin Kumar - Executive',
          fontSize :"9",
          style: "sectionHeader",
        },
        {
          columns: [
            [
              {
                text: this.form.value.customerName,
                bold:true
              },
              // { text: this.invoice.address },
              // { text: this.invoice.email },
              // { text: this.invoice.contactNo }
            ],
            [
              
              
            ]
          ]
        },
        // {
        //   // text: 'Order Details',
        //   // style: 'sectionHeader'
        // },
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto', 'auto', 'auto', 'auto'],
            body: [
              ['Machine Details', 'Spare', 'Delivery', 'Quantity', 'Price', 'Amount'],
              ...this.form.value.goods.map((g: { model: any; spare: any; delivery: any; quantity: any; price: number; serialNumber: number; }) => ([g.model + "\n" + g.serialNumber, g.spare, g.delivery, g.quantity, g.price, (g.price*g.quantity).toFixed(2)])),
              [{text: 'Total Amount', colSpan: 5}, {}, {}, {}, {}, this.form.value.goods.reduce((sum: number, g: { quantity: number; price: number; })=> sum + (g.quantity * g.price), 0).toFixed(2)]
            ]
          }
        },
        {
          text :`HSN Code : ${this.form.value.hsn} applicable for above all machinery items`,
          fontSize : 10
        },
        {
          text:'Commercial Terms:',
          color: 'red',
          style:'sectionHeader',
        },

        
        {
          text : 'Payment                  :100% against Proforma Invoice',
          fontSize : 9
        },
        {
          text : 'Tax                           :CGST @ 9%',
          fontSize : 9
        },
        {
          text : `Validity Date ***    :${new Date().toLocaleString()}` ,
          fontSize :9
        },
        
        // {
        //     text: this.invoice.additionalDetails,
        //     margin: [0, 0 ,0, 15]          
        // },

        {
          text:'Technical Terms:',
          color: 'red',
          decoration: 'underline',
          style:'sectionHeader'
        },
        {
          text:'Any failure parts within 5 days of receipts can be returned, however this is not applicable for:',
          color:'red',
          fontSize :'10'
        },
        {
          text:'a) Physical or electrical damage to the spares supplied',
          color : 'red',
          fontSize :'10'
        },
        {
          text:'b) Electrical and Electronic spares',
          color : 'red',
          fontSize :'10'
        },
        {
          text: '           ',
         
        },
        {
          text:'Note:',
          decortation :'underline',
          bold : true
        },
        {
          text: '                                        '
        },
        {
          text : '1)This delivery days indicated are only tentative.',
          fontSize :'9'
        },
        {
          text:'The actual delivery days may vary at the time of order based on local stock available & stocks at our principle end.',
          fontSize : '9'
        },
        {
          text :'                                                                  ',
        
        },
        {
          text :'2)The above cost does not include insurance, freight and forwarding charges.',
          fontSize : '9'
        },
        {
          text:'The above cost is inclusive of packaging charges.',
          fontSize : '9'
        },
        {
          text:'  ',
         
        },
        {
          text :"3)The above item import cost is calculated based on today's exchange rate, any varitation more than 3% this quotation",
          fontSize : '9',
        },
        {
          text:'becomes invalid even within the validity period.',
          fontSize : '9'
        },

        {
          text:'      ',
        },
        {
          text: 'Quote Summary',
          color: 'red',
          decoration :'underline',
          bold : true,
        },
        
        {
          columns: [
            [{ text :'Table 1', fit: '45' ,italics :true},
            {table: {
              headerRows: 1,
              widths: ['*', 'auto', 'auto'],
              body: [
                ['Model', 'Serial No', 'Total Amount'],
                ...this.form.value.goods.map((g: { model: any; spare: any; price: number; quantity: number; }) => ([g.model, g.spare, (g.price*g.quantity).toFixed(2)])),
              ]
            }}],
            [{ text: 'Table 2', italics: true, padding :'10'},
            {table: {
              headerRows: 1,
              widths: ['*', 'auto'],
              body: [
                ['Tonnage', 'Total Amount'],
                ...this.form.value.goods.map((g: { model: any; price: number; quantity: number; }) => ([g.model, (g.price*g.quantity).toFixed(2)])),
              ]
            }}
          
          ],
          ]
          
        },
        {
          text:"                     "
        },
        {
          text:'Thank You & expecting your valuable order'
        },
        { 
          
            
             text: 'Signature', alignment: 'right', italics: true
        
        },
        {
          text :'          '
        },
        // {
        //   qr: `${this.form.value.customerName}`, fit: '50', alignment:'right'
        // },
        // {
        //   text: 'Terms and Conditions',
        //   style: 'sectionHeader'
        // },
        // {
        //     ul: [
        //       'Order can be return in max 10 days.',
        //       'Warrenty of the product will be subject to the manufacturer terms and conditions.',
        //       'This is system generated invoice.',
        //     ],
        // }
      ],
      styles: {
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [0, 15,0, 15]          
        }
      }
    };
  
  (new PDFGeneratorService).generatePDF(docDefinition)
  }
}

