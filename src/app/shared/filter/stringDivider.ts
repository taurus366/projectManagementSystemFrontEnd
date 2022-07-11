import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'divideString'
})

export class StringDivider implements PipeTransform {

  transform(text: any | undefined, separator: string): String[] {

    if (!text || !separator) {
      // @ts-ignore
      return text;
    }

    let resultStringArray: string[] = text;

    for (let i = 0; i < resultStringArray.length; i++) {
      resultStringArray[i] = resultStringArray[i].replace(separator,' ')
    }

    return resultStringArray;
  }

}
