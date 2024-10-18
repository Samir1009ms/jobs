import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-jobs-item',
  templateUrl: './jobs-item.component.html',
  styleUrl: './jobs-item.component.scss'
})
export class JobsItemComponent {
  visible: boolean = false
  visibleApply: boolean = false
  @Input() item: any
  @Output() onOpenApply = new EventEmitter<{ id: any; category: any }>()

  onOpen(item: any): void {
    this.visible = true
  }

  openApply(id: any, category: any): void {
    this.visibleApply = true
    this.onOpenApply.emit({ id, category })
  }

  onClose(): void {
    this.visible = false
  }

}
