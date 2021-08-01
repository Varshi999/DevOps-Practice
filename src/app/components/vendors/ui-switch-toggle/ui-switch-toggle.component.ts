import { Component, OnInit, Input } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  selector: 'app-ui-switch-toggle',
  templateUrl: './ui-switch-toggle.component.html',
  styleUrls: ['./ui-switch-toggle.component.scss']
})
export class UiSwitchToggleComponent implements ViewCell, OnInit {

  @Input() value: number;
  @Input() rowData: any;
  checked: boolean;

  constructor() { }

  ngOnInit(): void {
    if (this.value) {
      this.checked = true;
    }
    else {
      this.checked = false;
    }
  }

}
