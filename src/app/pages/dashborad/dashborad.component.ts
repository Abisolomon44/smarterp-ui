import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Transaction {
  id: string;
  customer: string;
  initials: string;
  avatarClass: string;
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
  date: string;
  amount: string;
}

@Component({
  selector: 'app-dashborad',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashborad.component.html',
  styleUrls: ['./dashborad.component.scss']
})
export class DashboradComponent {

  showMaintenance = true;

  transactions: Transaction[] = [
    {
      id: '#TRX-8291',
      customer: 'Jason D. Corp',
      initials: 'JD',
      avatarClass: 'blue',
      status: 'COMPLETED',
      date: 'Oct 24, 2024',
      amount: '$12,400.00'
    },
    {
      id: '#TRX-8290',
      customer: 'Morgan Logistics',
      initials: 'ML',
      avatarClass: 'orange',
      status: 'PENDING',
      date: 'Oct 24, 2024',
      amount: '$8,210.50'
    },
    {
      id: '#TRX-8289',
      customer: 'Smith Associates',
      initials: 'SA',
      avatarClass: 'green',
      status: 'COMPLETED',
      date: 'Oct 23, 2024',
      amount: '$450.00'
    }
  ];
}