import { Component } from '@angular/core';

@Component({
  selector: 'app-bank-transaction',
  templateUrl: './bank-transaction.component.html',
  styleUrls: ['./bank-transaction.component.scss']
})
export class BankTransactionComponent {
  selectedValue: string = ''; 
  inputValue: string = '';   

  options: string[] = [
    'Debit(+)',
    'Credit(-)',
  ];

  onInputChanged(value: string) {

    this.inputValue = value;
  }

}

// import { HttpClient } from "@angular/common/http";
// import { Component, OnInit } from "@angular/core";
// import { NzMessageService } from "ng-zorro-antd/message";
// import { FormBuilder, FormGroup, Validators } from "@angular/forms";
// import { environment } from "src/environments/environment";
// import { ActivatedRoute } from "@angular/router";

// @Component({
//   selector: "app-bank-transaction",
//   templateUrl: "./bank-transaction.component.html",
//   styleUrls: ["./bank-transaction.component.scss"],
// })
// export class BankTransactionComponent implements OnInit {
//   bankTransactionForm: FormGroup; // Define a FormGroup for your bank transaction form
//   isLoading = false;
//   transactionId = -1;

//   get transactionDetailId() {
//     return this.transactionId;
//   }

//   constructor(
//     private http: HttpClient,
//     private message: NzMessageService,
//     private fb: FormBuilder, // Inject FormBuilder
//     private route: ActivatedRoute
//   ) {
//     this.bankTransactionForm = this.fb.group({
//       id: ["", [Validators.required]],
//       date: ["", [Validators.required]],
//       bank_id: ["", [Validators.required]],
//       withdraw_id: ["", [Validators.required]],
//       amount: ["", [Validators.required]],
//       description: ["", [Validators.required]],
//     });

//     route.params.subscribe((params: any) => {
//       if (params.id > 0) this.transactionId = params.id;
//     });
//   }

//   ngOnInit(): void {}

//   // Function to handle bank transaction submission
//   submitBankTransaction() {
//     if (this.bankTransactionForm.invalid) {
//       return;
//     }

//     this.isLoading = true;

//     const transactionData = this.bankTransactionForm.value;

//     if (this.transactionId && this.transactionId > 0)
//       this.http
//         .put(
//           `${environment.apiUrl}/BankTransactions/${this.transactionId}`,
//           transactionData
//         )
//         .subscribe({
//           next: (res) => {
//             this.message.success("Bank transaction updated successfully");
//             this.isLoading = false;
//             this.bankTransactionForm.reset();
//           },
//           error: (err) => {
//             this.isLoading = false;
//             this.message.error(
//               "An error occurred while updating the bank transaction"
//             );
//           },
//         });
//     else
//       this.http
//         .post(`${environment.apiUrl}/BankTransactions`, transactionData)
//         .subscribe({
//           next: (res) => {
//             this.message.success("Bank transaction added successfully");
//             this.isLoading = false;
//             this.bankTransactionForm.reset();
//           },
//           error: (err) => {
//             this.isLoading = false;
//             this.message.error(
//               "An error occurred while adding the bank transaction"
//             );
//           },
//         });
//   }
// }

