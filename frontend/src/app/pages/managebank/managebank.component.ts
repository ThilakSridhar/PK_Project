import { HttpClient, HttpParams } from "@angular/common/http";
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { NzMessageService } from "ng-zorro-antd/message";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-managebank",
  templateUrl: "./managebank.component.html",
  styleUrls: ["./managebank.component.scss"],
})
export class ManagebankComponent implements OnInit {
  bankForm: FormGroup; // Define a FormGroup for your bank form
  banks: any[] = [];
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
      this.getBanks();
    }, 300);
  }

  constructor(
    private http: HttpClient,
    private message: NzMessageService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.bankForm = this.fb.group({
      bank_name: ["", [Validators.required]],
      account_name: ["", [Validators.required]],
      account_type: ["", [Validators.required]],
      account_no: ["", [Validators.required]],
      branch: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getBanks();
  }

  getAccountNoDisplay = (accountNo: any) => parseInt(accountNo);

  getBanks(p?: any) {
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
        `${environment.apiUrl}/BankDetails/page`,
        { params }
      )
      .subscribe({
        next: (res) => {
          this.banks = res.data;
          this.total = res.totalItems;
          this.isLoading = false;
        },
        error: (err) => (this.isLoading = false),
      });
  }

  deleteBank(id: number) {
    this.http
      .delete(`${environment.apiUrl}/BankDetails/${id}`)
      .subscribe((data: any) => {
        this.message.success("Bank deleted successfully");
        this.getBanks();
      });
  }

  // Function to handle bank submission
  // submitBank() {
  //   if (this.bankForm.invalid) {
  //     return;
  //   }

  //   this.isLoading = true;

  //   const bankData = this.bankForm.value;

  //   this.http
  //     .post(`${environment.apiUrl}/BankDetails`, bankData)
  //     .subscribe({
  //       next: (res) => {
  //         this.message.success("Bank added successfully");
  //         this.isLoading = false;
  //         this.bankForm.reset();
  //         this.getBanks();
  //       },
  //       error: (err) => {
  //         this.isLoading = false;
  //         this.message.error("An error occurred while adding the bank");
  //       },
  //     });
  // }
}
