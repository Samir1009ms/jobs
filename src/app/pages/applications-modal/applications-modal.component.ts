import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { TestService } from '../../core/services/test.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzUploadChangeParam, NzUploadFile, NzUploadXHRArgs } from 'ng-zorro-antd/upload';
import { Subscription } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-applications-modal',
  templateUrl: './applications-modal.component.html',
  styleUrls: ['./applications-modal.component.scss']
})
export class ApplicationsModalComponent implements OnInit {
  // isVisible = false;
  @Input() isVisible: boolean = false;
  @Input() id: any;
  @Input() category: any;
  @Output() onClose = new EventEmitter<boolean>();
  timer: number = 60;
  intervalId: any;
  currentStep = 0;
  data: any[] = [];
  fileList: NzUploadFile[] = [];

  previewVisible = false;
  questionNum = 0;
  selectedFile: any = null;
  userData: any = {
    fullName: '',
    email: '',
    phone: '',
    answers: {},
    correctAnswersCount: 0,
    incorrectAnswersCount: 0,
    timers: {},
  };
  questionBlocked: boolean = false;
  myForm: FormGroup
  examStarted: boolean = false;
  previewImage: any = '';

  constructor(
    private modalService: NzModalService,
    private apiService: TestService,
    private fb: FormBuilder,
    private message: NzMessageService
  ) {

    this.myForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\(\d{3}\) - \d{3}-\d{4}$/)]],
    });
  }
  handleUpload(item: NzUploadXHRArgs): Subscription {
    return new Subscription();
  }
  handleChange(file: NzUploadChangeParam): void {
    if (file.file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document means .docx' || file.file.type === 'application/msword' || file.file.type === 'application/pdf') {

      if (file.file.size && file.file.size < 5 * 1024 * 1024) {
        this.selectedFile = file.file.originFileObj;
      } else {
        console.log('file size is greater than 5mb');
      }
    } else {
      console.log('file type is not supported');
    }
  };
  startExam(): void {
    this.examStarted = true;
    this.questionNum = 0;
    this.startTimer();
  }
  ngOnInit(): void {

  }

  getTest() {
    this.apiService.getTest(this.category).subscribe(data => {
      this.data = data;
    });
  }

  showModal(): void {
    this.isVisible = true;
    this.resetForm();
  }

  nextStep(): void {
    this.getTest();
    if (
      this.myForm.valid
    ) {
      if (this.currentStep < 2) {
        this.currentStep++;
      }
    } else {
      this.myForm.markAllAsTouched();
    }
    if (this.currentStep === 2) {
      this.startTimer();
    }
  }

  prevStep(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  nextQuestion(): void {
    if (this.questionNum < this.data.length - 1) {
      this.userData.timers[this.questionNum] = this.timer;
      this.questionNum++;
      this.startTimer();
    } else {
      this.currentStep = 2;
      this.calculateResults();
    }
    this.isQuestionLocked()

  }

  prevQuestion(): void {
    if (this.questionNum > 0) {
      this.userData.timers[this.questionNum] = this.timer;
      this.questionNum--;
      this.timer = this.userData.timers[this.questionNum]

      if (this.userData.timers[this.questionNum] === 0) {
        this.questionBlocked = true;
      } else {
        if (!this.isQuestionLocked()) {
          this.startTimer();
        } else {
          this.stopTimer()
        }
      }
      this.isQuestionLocked()
    }
  }
  startTimer(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    console.log(this.userData.timers);
    console.log(this.userData.timers[this.questionNum]);
    this.timer = this.userData.timers[this.questionNum] || 60;
    this.intervalId = setInterval(() => {
      this.timer--;
      // this.userData.timers[this.questionNum] = this.timer;

      if (this.timer === 0) {
        this.nextQuestion();
      }
    }, 1000);
  }
  stopTimer(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  selectAnswer(index: number): void {
    if (!this.userData.answers[this.questionNum] || !(this.data[this.questionNum].options[index] == this.userData.answers[this.questionNum])) {
      this.userData.answers[this.questionNum] = this.data[this.questionNum].options[index];
    }
    console.log(this.userData);
  }

  isOptionSelected(index: number): boolean {
    return this.userData.answers[this.questionNum] === this.data[this.questionNum].options[index];
  }

  isQuestionLocked(): boolean {
    return this.questionBlocked = this.userData.answers[this.questionNum] !== undefined;
  }
  blockQuestion(): boolean {
    return this.questionBlocked
  }

  onFileSelected(event: any): void {
    console.log(event.target.files[0]);
    this.selectedFile = event.target.files[0];
  }

  calculateResults(): void {
    let correctCount = 0;
    let incorrectCount = 0;

    this.data.forEach((question, index) => {
      const userAnswer = this.userData.answers[index];
      if (userAnswer === question.correctAnswer) {
        correctCount++;
      } else {
        incorrectCount++;
      }
    });

    this.userData.correctAnswersCount = correctCount;
    this.userData.incorrectAnswersCount = incorrectCount;
  }

  submitApplication(): void {
    const formData = new FormData();
    formData.append('name', this.userData.fullName);
    formData.append('email', this.userData.email);
    formData.append('phone', this.userData.phone);
    formData.append('correctAnswersCount', this.userData.correctAnswersCount.toString());
    formData.append('id', this.id);
    formData.append('incorrectAnswersCount', this.userData.incorrectAnswersCount.toString());

    if (this.selectedFile) {
      formData.append('cv', this.selectedFile);
    }
    this.apiService.uploadTest(formData).subscribe(response => {
      console.log('Application submitted successfully:', response);
      this.message.success(response.message);
      setTimeout(() => {

        this.isVisible = false;
      }, 1000);
    }, error => {
      this.message.error(error.message);
      console.error('Error submitting application:', error);
    });
  }

  handleCancel(): void {
    this.isVisible = false;
    this.onClose.emit();
    this.resetForm();
  }

  resetForm(): void {
    this.currentStep = 0;
    this.questionNum = 0;
    this.userData = {
      fullName: '',
      email: '',
      phone: '',
      answers: {},
      correctAnswersCount: 0,
      incorrectAnswersCount: 0,
    };
    this.selectedFile = null;
  }
}
