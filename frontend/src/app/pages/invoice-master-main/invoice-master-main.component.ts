import { HttpClient, HttpParams } from "@angular/common/http";
import { Component } from "@angular/core";
import { NzMessageService } from "ng-zorro-antd/message";
import { FadeInOut } from "src/app/animations";
import { InoviceMasterComponent } from "src/app/components/inovice-master/inovice-master.component";
import { environment } from "src/environments/environment";
import { NzButtonComponent } from "ng-zorro-antd/button";
@Component({
  selector: "app-transport-bill",
  templateUrl: "./invoice-master-main.component.html",
  styleUrls: ["./invoice-master-main.component.scss"],
  animations: [FadeInOut],
})
export class InvoiceMasterMainComponent {
  // transportBill: TransportBill[];

  isLoading = false;

  total: number;
  pageSize = 10;
  pageIndex = 1;
  filter = [];

  billId = -1;

  _search = "";
  debounce: any;

  public get search(): string {
    return this._search;
  }

  public set search(v: string) {
    clearTimeout(this.debounce);
    this.debounce = setTimeout(() => {
      this._search = v;
      this.getTransportBill();
    }, 300);
  }

  constructor(private http: HttpClient, private message: NzMessageService) {}

  ngOnInit(): void {}

  getTransportBill(p?: any) {
    let params = new HttpParams()
      .append("page", `${this.pageIndex}`)
      .append("size", `${this.pageSize}`);
    // .append("search", `${this.search}`);
    if (p) this.filter = p.filter;

    if (this.filter) {
      this.filter.forEach((filter: { value: any[]; key: string }) => {
        filter.value.forEach((value) => {
          params = params.append(filter.key, value);
        });
      });
    }
    this.isLoading = !this.isLoading;
    this.http
      // .get<{ data: TransportBill[]; totalItems: number }>(
      //   `${environment.apiUrl}/transport-bill/page`,
      // //   { params }
      // // )
      // // .subscribe(
      // //   (res: { data: TransportBill[]; totalItems: number }) => {
      // //     this.isLoading = !this.isLoading;
      // //     this.transportBill = res.data;
      // //     this.total = res.totalItems;
      // //   },
      //   (err) => (this.isLoading = !this.isLoading)
      // );
  }

  deleteTransportBill(id: number) {
    this.http
      .delete(`${environment.apiUrl}/invoice-edit/${id}`)
      .subscribe((data: any) => {
        this.message.success("Transaction deleted successfully");
        this.getTransportBill();
      });
  }
}
