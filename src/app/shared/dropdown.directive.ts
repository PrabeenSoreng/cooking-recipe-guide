import { Directive, HostListener, HostBinding, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.show') isShow = false;

  constructor(
    private elRef: ElementRef,
    private renderer: Renderer2
  ) { }

  @HostListener('click') toggleShow() {
    const dropdownMenu = this.elRef.nativeElement.querySelector('.dropdown-menu');
    this.isShow = !this.isShow;

    if(this.isShow)
    this.renderer.addClass(dropdownMenu, 'show');
    else
    this.renderer.removeClass(dropdownMenu, 'show');
  }
}
