import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[appPhoneMask]'
})
export class PhoneMaskDirective {
    private previousValue: string = '';

    constructor(private el: ElementRef) { }

    @HostListener('input', ['$event'])
    onInput(event: Event): void {
        const input = this.el.nativeElement;
        let value = input.value.replace(/\D/g, '');

        if (value.length > 10) {
            value = value.slice(0, 10);
        }

        if (value.length > 6) {
            value = `(${value.slice(0, 3)}) - ${value.slice(3, 6)}-${value.slice(6)}`;
        } else if (value.length > 3) {
            value = `(${value.slice(0, 3)}) - ${value.slice(3)}`;
        } else if (value.length > 0) {
            value = `(${value}`;
        }

        if (input.value !== value) {
            this.previousValue = input.value;
            input.value = value;
        }
    }

    @HostListener('blur', ['$event'])
    onBlur(event: FocusEvent): void {
        const input = this.el.nativeElement;
        if (input.value === '( ) -  - ') {
            input.value = '';
        }
    }
}
