import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decimalPoint'
})
export class DecimalPointPipe implements PipeTransform {
  transform(value: any): string {
    const insertIndex = value.length - 2; // Position to insert decimal point

    const formattedValue = value.slice(0, insertIndex) + '.' + value.slice(insertIndex);

    // Remove leading zeros before the first non-zero value digit
    const [integerPart, decimalPart] = formattedValue.split('.');
    const formattedIntegerPart = integerPart.replace(/^0+/, '');

    return formattedIntegerPart + (decimalPart ? '.' + decimalPart : '');
  }
}