import { Component } from '@angular/core';
import { VacanciesService } from '../../core/services/vacancies.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.scss'
})
export class JobsComponent {
  data: any = []
  visible: boolean = false
  visibleApply: boolean = false
  id: any
  category: any
  constructor(private apiServive: VacanciesService) { }

  onCloseApply(id: any): void {
    this.visibleApply = false
  }
  onOpenApply(data: { id: any; category: any }): void {
    console.log(data.id, data.category);
    this.category = data.category
    this.id = data.id
    this.visibleApply = true
  }
  ngOnInit(): void {
    this.getVacancies()
  }

  handleClick(): void {
  }

  getVacancies() {
    this.apiServive.getVacancies().subscribe(data => {
      this.data = data
    })
  }
}
