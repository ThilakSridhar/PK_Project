import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { NzMessageService } from "ng-zorro-antd/message";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { environment } from "src/environments/environment";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-addexpense",
  templateUrl: "./addexpense.component.html",
  styleUrls: ["./addexpense.component.scss"],
})
export class AddExpenseComponent implements OnInit {
  addExpenseForm: FormGroup; // Define a FormGroup for your expense form
  isLoading = false;
  _expenseDetailId = -1;

  get expenseDetailId() {
    return this._expenseDetailId;
  }

  constructor(
    private http: HttpClient,
    private message: NzMessageService,
    private fb: FormBuilder, // Inject FormBuilder
    private route: ActivatedRoute
  ) {
    this.addExpenseForm = this.fb.group({
      date: ["", [Validators.required]],
      expense_type: ["", [Validators.required]],
      payment_type: ["", [Validators.required]],
      amount: ["", [Validators.required]],
    });

    route.params.subscribe((params: any) => {
      if (params.id > 0) this._expenseDetailId = params.id;
    });
  }

  ngOnInit(): void {}

  // Function to handle expense submission
  submitExpense() {
    if (this.addExpenseForm.invalid) {
      return;
    }

    this.isLoading = true;

    const expenseData = this.addExpenseForm.value;

    if (this._expenseDetailId && this._expenseDetailId > 0)
      this.http
        .put(`${environment.apiUrl}/ExpenseDetails/${this._expenseDetailId}`, expenseData)
        .subscribe({
          next: (res) => {
            this.message.success("Expense updated successfully");
            this.isLoading = false;
            this.addExpenseForm.reset();
          },
          error: (err) => {
            this.isLoading = false;
            this.message.error("An error occurred while adding the expense");
          },
        });
    else
      this.http
        .post(`${environment.apiUrl}/ExpenseDetails`, expenseData)
        .subscribe({
          next: (res) => {
            this.message.success("Expense added successfully");
            this.isLoading = false;
            this.addExpenseForm.reset();
          },
          error: (err) => {
            this.isLoading = false;
            this.message.error("An error occurred while adding the expense");
          },
        });
  }
}
