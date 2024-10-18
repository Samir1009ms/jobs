import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-jobs-details',
  templateUrl: './jobs-details.component.html',
  styleUrl: './jobs-details.component.scss'
})
export class JobsDetailsComponent {
  @Input() visible: boolean = false;
  @Input() item: any;
  @Output() onClose = new EventEmitter<boolean>();
  visibleApply: boolean = false
  id: any
  category: any
  close(): void {
    this.visible = false;
    this.onClose.emit();
  }


  onCloseApply(id: any): void {
    this.visibleApply = false
  }
  onOpenApply(id?: any, category?: any): void {
    console.log('open apply', id);
    this.category = category
    this.id = id
    this.visibleApply = true
  }
}
