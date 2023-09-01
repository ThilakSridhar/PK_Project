import { HttpClient } from "@angular/common/http";
import { Component, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd/message";
import { FadeInOut } from "src/app/animations";
import { Item } from "src/app/models";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-item-master-form",
  templateUrl: "./item-master-form.component.html",
  styleUrls: ["./item-master-form.component.scss"],
  animations: [FadeInOut],
})
export class ItemMasterFormComponent implements OnInit {
  form: FormGroup;
  _itemId = -1;

  get itemId() {
    return this._itemId;
  }

  @Input()
  set itemId(id: number) {
    this._itemId = id;
    if (id > 0)
      this.http
        .get<Item>(`${environment.apiUrl}/itemMaster/${id}`)
        .subscribe((data: any) => {
          this.form.patchValue(data);
        });
  }

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private message: NzMessageService,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      jobWork: ["", [Validators.required]],
      purpose: ["", [Validators.required]],
      category: ["", [Validators.required]],
      uom: ["", [Validators.required]],
      price: ["", [Validators.required]],
      unit: ["", [Validators.required]],
      reason: ["", [Validators.required]],
      hta: ["", [Validators.required]],
      quantity: ["", [Validators.required]],
      hsn: ["", [Validators.required]],
    });
    route.params.subscribe((params: any) => {
      if (params.id > 0) this.itemId = params.id;
    });
  }

  ngOnInit(): void {}

  resetForm() {
    this.form.reset();
  }

  submit() {
    if (this.form.valid) {
      console.log(this.form.value);
      if (this.itemId === -1)
        this.http
          .post(`${environment.apiUrl}/itemMaster`, this.form.value)
          .subscribe((data: any) => {
            this.message.success("Item added successfully");
            this.resetForm();
          });
      else
        this.http
          .put(`${environment.apiUrl}/itemMaster/${this.itemId}`, {
            id: this.itemId,
            ...this.form.value,
          })
          .subscribe((data: any) => {
            this.message.success("Item updated successfully");
            this.itemId = -1;
            this.resetForm();
          });
    } else {
      Object.values(this.form.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
