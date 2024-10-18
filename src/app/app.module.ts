import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { PagesComponent } from './layouts/pages/pages.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JobsComponent } from './pages/jobs/jobs.component';
import { JobsItemComponent } from './pages/jobs/jobs-item/jobs-item.component';
import { JobsDetailsComponent } from './pages/jobs/jobs-details/jobs-details.component';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzListComponent, NzListItemComponent, NzListItemMetaComponent } from 'ng-zorro-antd/list';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { JobsApplyComponent } from './pages/jobs/jobs-apply/jobs-apply.component';
import { HttpClientModule } from '@angular/common/http';
import { VacanciesService } from './core/services/vacancies.service';
import { NzResultComponent } from 'ng-zorro-antd/result';
import { NzModalComponent, NzModalContentDirective, NzModalFooterDirective, NzModalService } from 'ng-zorro-antd/modal';
import { TestService } from './core/services/test.service';
import { ApplicationsModalComponent } from './pages/applications-modal/applications-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzStepComponent, NzStepsComponent } from 'ng-zorro-antd/steps';
import { NzRadioComponent, NzRadioModule } from 'ng-zorro-antd/radio';
import { provideNgxMask } from 'ngx-mask';
import { PhoneMaskDirective } from './directive/phone-mask.directive';
import { NzUploadComponent, NzUploadModule } from 'ng-zorro-antd/upload';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    PagesComponent,
    SidebarComponent,
    JobsComponent,
    JobsItemComponent,
    JobsDetailsComponent,
    JobsApplyComponent,
    ApplicationsModalComponent,
    PhoneMaskDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NzLayoutModule,
    HttpClientModule,
    NzMenuModule,
    NzButtonModule,
    NzInputModule,
    NzUploadModule,
    NzUploadComponent,
    BrowserAnimationsModule,
    NzDividerModule,
    NzDescriptionsModule,
    ReactiveFormsModule,
    NzDrawerModule,
    FormsModule,
    NzRadioModule,
    NzTagModule,
    NzRadioComponent,
    NzListItemMetaComponent,
    NzStepComponent,
    NzStepsComponent,
    NzListItemComponent,
    NzListComponent,
    NzResultComponent,
    NzModalComponent,
    NzModalContentDirective,
    NzModalFooterDirective,
    // NgxMaskModule.forRoot()
  ],
  providers: [
    NzModalService,
    VacanciesService,
    TestService,
    provideNgxMask()
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
