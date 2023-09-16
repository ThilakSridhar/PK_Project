import { HttpClient, HttpParams } from "@angular/common/http";
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { NzMessageService } from "ng-zorro-antd/message";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { environment } from "src/environments/environment";


@Component({
  selector: 'app-bankledger',
  templateUrl: './bankledger.component.html',
  styleUrls: ['./bankledger.component.scss']
})
export class BankledgerComponent {
  banktransactionForm: FormGroup; // Define a FormGroup for your bank form
  bankTransactions: any[] = [];
  bankId = -1;
  isLoading = false;
  total: number;
  pageSize = 10;
  pageIndex = 1;
  filter = [];

  _search = "";
  debounce: any;


  public get search(): string {
    return this._search;
  }

  public set search(v: string) {
    clearTimeout(this.debounce);
    this.debounce = setTimeout(() => {
      this._search = v;
      this.getBankTransactionForm();
    }, 300);
  }

  constructor(
    private http: HttpClient,
    private message: NzMessageService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
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
  }

  ngOnInit(): void {
    this.getBankTransactionForm();
  }

  getBankTransactionForm(p?: any) {
    this.isLoading = true;
    let params = new HttpParams()
      .append("page", `${this.pageIndex}`)
      .append("size", `${this.pageSize}`)
      .append("search", `${this.search}`);
    if (p) this.filter = p.filter;

    if (this.filter) {
      this.filter.forEach((filter: { value: any[]; key: string }) => {
        filter.value.forEach((value) => {
          params = params.append(filter.key, value);
        });
      });
    }
    this.http
      .get<{ data: any[]; totalItems: number }>(
        `${environment.apiUrl}/BankTransaction/page`,
        { params }
      )
      .subscribe({
        next: (res) => {
          console.log(res);
          this.bankTransactions = res.data;
          this.total = res.totalItems;
          this.isLoading = false;
        },
        error: (err) => {
          console.log(err);
          (this.isLoading = false)
        },
      });
  }

  deleteBank(id: number) {
    this.http
      .delete(`${environment.apiUrl}/BankTransaction/${id}`)
      .subscribe((data: any) => {
        this.message.success("Bank deleted successfully");
        this.getBankTransactionForm();
      });
  }

  getTransactionType(credit: boolean) {
    if(credit) return "Credit (+)"
    else return "Debit (-)"
  }
}
