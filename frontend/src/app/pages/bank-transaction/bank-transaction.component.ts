import { Component } from '@angular/core';

@Component({
  selector: 'app-bank-transaction',
  templateUrl: './bank-transaction.component.html',
  styleUrls: ['./bank-transaction.component.scss']
})
export class BankTransactionComponent {
  selectedValue: string = ''; 
  inputValue: string = '';   

  options: string[] = [
    'Debit(+)',
    'Credit(-)',
  ];

  onInputChanged(value: string) {

    this.inputValue = value;
  }

}
