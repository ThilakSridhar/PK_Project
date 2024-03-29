import { HttpClientModule } from "@angular/common/http";
import { ComponentsModule } from "../components/components.module";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NgZorroModule } from "../NgZorro.module";
import { BaseLayoutComponent } from "./base-layout/base-layout.component";
import { AttendanceComponent } from "./attendance/attendance.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EmployeesComponent } from "./employees/employees.component";
import { MentorComponent } from "./mentor/mentor.component";
import { InventoryComponent } from "./inventory/inventory.component";
import { DepartmentComponent } from "./department/department.component";
import { TransactionComponent } from "./transaction/transaction.component";
import { OtComponent } from "./ot/ot.component";
import { TransportBillComponent } from "./transport-bill/transport-bill.component";
import { TransportBillEditComponent } from "./transport-bill-edit/transport-bill-edit.component";
import { SpecialInstructionsComponent } from "./special-instructions/special-instructions.component";
import { CustomersComponent } from "./customers/customers.component";

import { VendorsComponent } from "./vendors/vendors.component";

import { GstComponent } from "./gst/gst.component";
import { ItemMasterComponent } from './item-master/item-master.component';
import { GrnComponent } from './grn/grn.component';
import { AddbankComponent } from './addbank/addbank.component';
import { ManagebankComponent } from './managebank/managebank.component';
import { BankTransactionComponent } from './bank-transaction/bank-transaction.component';
import { BankledgerComponent } from './bankledger/bankledger.component';
import { ManageexpenseComponent } from './manageexpense/manageexpense.component';
import { AddExpenseItemComponent } from './add-expense-item/add-expense-item.component';
import { ManageExpenseItemComponent } from './manage-expense-item/manage-expense-item.component';
import { ExpensestatementComponent } from './expensestatement/expensestatement.component';

@NgModule({
  declarations: [
    BaseLayoutComponent,
    AttendanceComponent,
    DashboardComponent,
    EmployeesComponent,
    MentorComponent,
    InventoryComponent,
    DepartmentComponent,
    TransactionComponent,
    OtComponent,
    TransportBillComponent,
    TransportBillEditComponent,
    SpecialInstructionsComponent,
    CustomersComponent,
    VendorsComponent,
    GstComponent,
    ItemMasterComponent,
    GrnComponent,
    AddbankComponent,
    ManagebankComponent,
    BankTransactionComponent,
    BankledgerComponent,
    ManageexpenseComponent,
    AddExpenseItemComponent,
    ManageExpenseItemComponent,
    ExpensestatementComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    NgZorroModule,
  ],
})
export class PagesModule {}
