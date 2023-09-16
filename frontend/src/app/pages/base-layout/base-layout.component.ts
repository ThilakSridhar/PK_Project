import { Menu } from "../../models/menu";
import { navigationAnimation } from "../../animations";
import { Component, OnInit } from "@angular/core";
import { Router, RouterOutlet } from "@angular/router";

@Component({
  selector: "app-base-layout",
  templateUrl: "./base-layout.component.html",
  styleUrls: ["./base-layout.component.scss"],
  animations: [navigationAnimation],
})
export class BaseLayoutComponent implements OnInit {
  menu: any[] = [];
  user = JSON.parse(String(localStorage.getItem("user")));

  constructor(private router: Router) {}

  ngOnInit() {
    // localStorage.clear();
    if (this.user.role === "MENTOR")
      this.menu = [
        {
          title: "Home",
          icon: "home",
          link: "/home",
        },
        {
          title: "Transaction",
          icon: "appstore",
          link: "/transaction",
        },
        {
          title: "Attendance",
          icon: "clock-circle",
          link: "/attendance",
        },
        {
          title: "Ot",
          icon: "field-time",
          link: "/ot",
        },
      ];
    else
      this.menu = [
        {
          title: "Home",
          icon: "home",
          link: "/home",
        },
        {
          level: 1,
          title: "Attendance",
          icon: "clock-circle",
          children: [
            {
              level: 2,
              title: "Daily",
              link: "/attendance",
            },
            {
              level: 2,
              title: "Over Time",
              link: "/ot",
            },
          ],
        },
        {
          level: 1,
          title: "Inventory",
          icon: "warehouse",
          children: [
            {
              level: 2,
              title: "Inventory Items",
              link: "/inventory",
            },
            {
              level: 2,
              title: "Transaction",
              link: "/transaction",
            },
            {
              level: 2,
              title: "Transport Bill",
              link: "/transport-bill",
            },
          ],
        },
        {
          level: 1,
          title: "Customer",
          icon: "user",
          children: [
            {
              level: 2,
              title: "Customer List",
              link: "/customer",
            },
            {
              level: 2,
              title: "Vendor List",
              link: "/vendor",
            },
            {
              level: 2,
              title: "Invoice",
              children: [
                {
                  level: 3,
                  title: "Proforma Invoice",
                  link: "/proforma-invoice-edit",
                },
                {
                  level: 3,
                  title: "Quotation Invoice",
                  link: "/quotation-invoice-edit",
                },
                {
                  level: 3,
                  title: "Invoice Master",
                  link: "/invoiceMain",
                },
              ],
            },
            {
              level: 2,
              title: "Special Instruction",
              link: "/special-instruction",
            },
          ],
        },
        {
          level: 1,
          title: "Bank",
          icon: "bank",
          children: [
              {
                  level: 2,
                  title: "Add New Bank",
                  link: "/add-bank/-1",
              },
              {
                  level: 2,
                  title: "Manage Bank",
                  link: "/manage-bank",
              },
              {
                  level: 2,
                  title: "Bank Transaction",
                  link: "/transaction-bank/-1",
              },
              {
                  level: 2,
                  title: "Bank Ledger",
                  link: "/ledger-bank",
              },
          ],
        },
        {
          title: "Expense",
          icon: "file-done",
          children: [
            {
                level: 2,
                title: "Add Expense Item",
                link: "/add-expense-item/-1",
            },
            {
                level: 2,
                title: "Manage Expense Item",
                link: "/manage-expense-item",
            },
            {
                level: 2,
                title: "Add Expense",
                link: "/add-expense/-1",
            },
            {
                level: 2,
                title: "Manage Expense",
                link: "/manage-expense",
            },
            {
              level: 2,
              title: "Expense Statement",
              link: "/expense-statement",
          },
        ],
        },






        {
          title: "Item Master",
          icon: "database",
          link: "/item-master",
        },
        {
          title: "GRN",
          icon: "file-done",
          link: "/grn",
        },
        {
          level: 1,
          title: "Master",
          icon: "database",
          children: [
            {
              level: 2,
              title: "Employee",
              link: "/employees",
            },
            {
              level: 2,
              title: "Mentor",
              link: "/mentor",
            },
            {
              level: 2,
              title: "Department",
              link: "/department",
            },
          ],
        },
      ];
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData["animationState"];
  }

  logOut() {
    localStorage.clear();
    this.router.navigateByUrl("/login");
  }
}
