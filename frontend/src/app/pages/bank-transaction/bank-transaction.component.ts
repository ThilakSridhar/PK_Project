// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-bank-transaction',
//   templateUrl: './bank-transaction.component.html',
//   styleUrls: ['./bank-transaction.component.scss']
// })
// export class BankTransactionComponent {
//   selectedValue: string = ''; 
//   inputValue: string = '';   

//   options: string[] = [
//     'Debit(+)',
//     'Credit(-)',
//   ];

//   onInputChanged(value: string) {

//     this.inputValue = value;
//   }

// }

import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { NzMessageService } from "ng-zorro-antd/message";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { environment } from "src/environments/environment";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-bank-transaction",
  templateUrl: "./bank-transaction.component.html",
  styleUrls: ["./bank-transaction.component.scss"],
})
export class BankTransactionComponent implements OnInit {
  banktransactionForm: FormGroup; // Define a FormGroup for your bank transaction form
  isLoading = false;
  _transactionId = -1;
selectedValue: string = ''; 
inputValue: string = '';   

options: string[] = [
  'Debit(-)',
  'Credit(+)',
];

onInputChanged(value: string) {

  this.inputValue = value;
  }

  get transactionId() {
    return this._transactionId;
  }

  constructor(
    private http: HttpClient,
    private message: NzMessageService,
    private fb: FormBuilder, // Inject FormBuilder
    private route: ActivatedRoute
  ) {
    this.banktransactionForm = this.fb.group({
      id: ["", [Validators.required]],
      date: ["", [Validators.required]],
      bank_id: ["", [Validators.required]],
      withdraw_id: ["", [Validators.required]],
      transaction_type: ["", Validators.required],
      bank_account_number: ["", Validators.required],
      amount: ["", [Validators.required]],
      description: ["", [Validators.required]],
    });

    route.params.subscribe((params: any) => {
      this._transactionId = params.id;
    });
  }

  ngOnInit(): void {}

  // Function to handle bank transaction submission
  submitBankTransaction() {
    if (this.banktransactionForm.invalid) {
      // return;
    }

    this.isLoading = true;

    const transactionData = this.banktransactionForm.value;

    if (this._transactionId && this._transactionId > 0)
      this.http
        .put(
          `${environment.apiUrl}/BankTransaction/${this._transactionId}`,
          transactionData
        )
        .subscribe({
          next: (res) => {
            this.message.success("Bank transaction updated successfully");
            this.isLoading = false;
            this.banktransactionForm.reset();
          },
          error: (err) => {
            this.isLoading = false;
            this.message.error(
              "An error occurred while updating the bank transaction"
            );
          },
        });
    else
      this.http
        .post(`${environment.apiUrl}/BankTransaction`, transactionData)
        .subscribe({
          next: (res) => {
            this.message.success("Bank transaction added successfully");
            this.isLoading = false;
            this.banktransactionForm.reset();
          },
          error: (err) => {
            this.isLoading = false;
            this.message.error(
              "An error occurred while adding the bank transaction"
            );
          },
        });
  }
}

