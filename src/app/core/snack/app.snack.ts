import {MatSnackBarConfig} from '@angular/material/snack-bar';

export const appSnackWarm: MatSnackBarConfig = {
    horizontalPosition: 'right',
    verticalPosition: 'top',
    panelClass: ['bg-warn'],
    duration: 5000
};

export const appSnackPrimary: MatSnackBarConfig = {
    horizontalPosition: 'right',
    verticalPosition: 'top',
    panelClass: ['bg-primary'],
    duration: 5000
};

