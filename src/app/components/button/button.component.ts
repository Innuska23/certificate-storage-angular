import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-button',
    template: `<a [routerLink]="to"><ng-content></ng-content></a>`,
    styles: ['a { cursor: pointer; }']
})
export class ButtonComponent {
    @Input() to: string;
}
