import { NgZorroModule } from "./../NgZorro.module";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { SiderComponent } from "./sider/sider.component";
import { CalendarComponent } from "./calendar/calendar.component";
// import { ChartComponent } from "./chart/chart.component";
import { EmployeeFormComponent } from "./employee-form/employee-form.component";
import { MentorFormComponent } from "./mentor-form/mentor-form.component";
import { AttendanceFormComponent } from "./attendance-form/attendance-form.component";
import { InventoryFormComponent } from "./inventory-form/inventory-form.component";
import { DepartmentFormComponent } from "./department-form/department-form.component";
import { TransactionFormComponent } from "./transaction-form/transaction-form.component";
import { InvoiceComponent } from "./invoice/invoice.component";
import { OtFormComponent } from "./ot-form/ot-form.component";
import { TransportBillFormComponent } from "./transport-bill-form/transport-bill-form.component";
import { CustomerFormComponent } from "./customer-form/customer-form.component";
import { GstFormComponent } from "./gst-form/gst-form.component";
import { VendorFormComponent } from "./vendor-form/vendor-form.component";
import { SpecialInstructionsComponent } from "./special-instructions/special-instructions.component";
import { GrnFormComponent } from "./grn-form/grn-form.component";
import { ItemMasterFormComponent } from "./item-master-form/item-master-form.component";
import { ProformaInvoiceComponent } from './proforma-invoice/proforma-invoice.component';
import { QuotationInvoiceComponent } from './quotation-invoice/quotation-invoice.component';
import { InoviceMasterComponent } from "./inovice-master/inovice-master.component";


@NgModule({
  declarations: [
    SiderComponent,
    CalendarComponent,
    // ChartComponent,
    EmployeeFormComponent,
    MentorFormComponent,
    AttendanceFormComponent,
    InventoryFormComponent,
    DepartmentFormComponent,
    TransactionFormComponent,
    InvoiceComponent,
    OtFormComponent,
    TransportBillFormComponent,
    CustomerFormComponent,
    GstFormComponent,
    VendorFormComponent,
    SpecialInstructionsComponent,
    GrnFormComponent,
    ItemMasterFormComponent,
    ProformaInvoiceComponent,
    QuotationInvoiceComponent,
    InoviceMasterComponent
  ],
  exports: [
    SiderComponent,
    CalendarComponent,
    // ChartComponent,
    EmployeeFormComponent,
    MentorFormComponent,
    AttendanceFormComponent,
    InventoryFormComponent,
    DepartmentFormComponent,
    TransactionFormComponent,
    InvoiceComponent,
    OtFormComponent,
    InventoryFormComponent,
    TransportBillFormComponent,
    ItemMasterFormComponent,
    CustomerFormComponent,
    GstFormComponent,
    VendorFormComponent,
    SpecialInstructionsComponent,
    ProformaInvoiceComponent,
    QuotationInvoiceComponent,
    InoviceMasterComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgZorroModule,
  ],
})
export class ComponentsModule {}
