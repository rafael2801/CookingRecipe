import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safePipe',
  standalone: true
})
export class SafePipePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }
  
  transform(url: any): unknown {
    const replaced = String(url).replace('watch?v=', 'embed/');
    return this.sanitizer.bypassSecurityTrustResourceUrl(replaced);
  }

}
