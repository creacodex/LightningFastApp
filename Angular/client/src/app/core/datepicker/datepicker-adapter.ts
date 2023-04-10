import { Injectable } from '@angular/core';
import { NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

/**
 * This Service handles how the date is represented in scripts i.e. ngModel.
 */
@Injectable()
export class NgbCustomDateAdapter extends NgbDateAdapter<string> {

    readonly DELIMITER = '-';

    fromModel(value: string | null): NgbDateStruct | null {
        // console.log('fromModel: ' + value);
        if (value) {
            let date = new Date(value);
            // console.log('fromModel date: ' + date);
            return {
                day: date.getDate(),
                month: date.getMonth() + 1,
                year: date.getFullYear()
            };
        }
        return null;
    }

    toModel(date: NgbDateStruct | null): string | null {
        // console.log('toModel date: ');
        // console.log(date);
        return date ? new Date(date.year, date.month - 1, date.day).toISOString() : null;
    }
}

/**
 * This Service handles how the date is rendered and parsed from keyboard i.e. in the bound input field.
 */
@Injectable()
export class NgbCustomDateParserFormatter extends NgbDateParserFormatter {

    readonly DELIMITER = '/';

    parse(value: string): NgbDateStruct | null {
        if (value) {
        // console.log('parse: ' + value);
        let date = value.split(this.DELIMITER);
            return {
                day: parseInt(date[0], 10),
                month: parseInt(date[1], 10),
                year: parseInt(date[2], 10)
            };
        }
        return null;
    }

    format(date: NgbDateStruct | null): string {
        // console.log('format: ');
        // console.log(date);
        return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : '';
    }
}