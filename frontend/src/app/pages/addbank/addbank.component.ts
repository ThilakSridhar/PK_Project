import { HttpClient } from "@angular/common/http";
import { Component, Input, OnInit } from "@angular/core";
import { NzMessageService } from "ng-zorro-antd/message";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { environment } from "src/environments/environment";
import { ActivatedRoute } from "@angular/router";

@Component({
	selector: "app-addbank",
	templateUrl: "./addbank.component.html",
	styleUrls: ["./addbank.component.scss"],
})
export class AddbankComponent implements OnInit {
	addbankForm: FormGroup; // Define a FormGroup for your bank form
	isLoading = false;
	_bankDetailId = -1;

	get bankDetailId() {
		return this._bankDetailId;
	}

	@Input()
	set bankDetailId(id: number) {
		this._bankDetailId = id;
		if (id > 0)
			this.http
				.get<any>(`${environment.apiUrl}/BankDetails/${id}`)
				.subscribe((data) => {
					this.addbankForm.patchValue({
            ...data,
            account_no: parseInt(data.account_no)
          });
				});
	}

	constructor(
		private http: HttpClient,
		private message: NzMessageService,
		private fb: FormBuilder, // Inject FormBuilder
		private route: ActivatedRoute
	) {
		this.addbankForm = this.fb.group({
			bank_name: ["", [Validators.required]],
			account_name: ["", [Validators.required]],
			account_type: ["", [Validators.required]],
			account_no: ["", [Validators.required]],
			branch: ["", [Validators.required]],
		});

		route.params.subscribe((params: any) => {
			if (params.id > 0) this.bankDetailId = params.id;
		});
	}

	ngOnInit(): void {}

	// Function to handle bank submission
	submitBank() {
		if (this.addbankForm.invalid) {
			return;
		}

		this.isLoading = true;

		const bankData = this.addbankForm.value;
		

		if (this._bankDetailId > 0) {
			this.http
				.put(
					`${environment.apiUrl}/BankDetails/${this._bankDetailId}`,
					{ ...bankData, id: this.bankDetailId }
				)
				.subscribe({
					next: (res) => {
						this.message.success("Bank updated successfully");
						this.isLoading = false;
						this.addbankForm.reset();
					},
					error: (err) => {
						this.isLoading = false;
						this.message.error("An error occurred while adding the bank");
					},
				});
		} else {
			this.http.post(`${environment.apiUrl}/BankDetails`, bankData).subscribe({
				next: (res) => {
					this.message.success("Bank added successfully");
					this.isLoading = false;
					this.addbankForm.reset();
				},
				error: (err) => {
					this.isLoading = false;
					this.message.error("An error occurred while adding the bank");
				},
			});
		}
	}
}