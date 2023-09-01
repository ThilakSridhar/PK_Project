import { HttpClient, HttpParams } from "@angular/common/http";
import { NzMessageService } from "ng-zorro-antd/message";
import { environment } from "src/environments/environment";
import { Component, OnInit } from "@angular/core";
import { Item } from "src/app/models/item";

@Component({
  selector: "app-item-master",
  templateUrl: "./item-master.component.html",
  styleUrls: ["./item-master.component.scss"],
})
export class ItemMasterComponent implements OnInit {
  items: Item[] = [];
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
      this.getItems();
    }, 300);
  }

  constructor(private http: HttpClient, private message: NzMessageService) {}
  ngOnInit(): void {}

  getItems(p?: any) {
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
      .get<{ data: Item[]; totalItems: number }>(
        `${environment.apiUrl}/itemMaster/page`,
        { params }
      )
      .subscribe({
        next: (res) => {
          this.items = res.data;
          this.total = res.totalItems;
          this.isLoading = false;
        },
        error: (err) => (this.isLoading = false),
      });
  }
  deleteItem(id: number) {
    this.http
      .delete(`${environment.apiUrl}/itemMaster/${id}`)
      .subscribe((data: any) => {
        this.message.success("Item deleted successfully");
        this.getItems();
      });
  }
}
