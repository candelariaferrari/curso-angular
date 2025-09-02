import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-switches-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './switches-page.component.html',
})
export class SwitchesPageComponent {

  private fb = inject(FormBuilder);
  formUtils = FormUtils;

  myForm: FormGroup = this.fb.group({
    gender: ['M', Validators.required], //genero, valor por defecto m y tiene que ser requerido
    wantNotifications: [true], //notificaciones
    termAndConditions: [false, Validators.requiredTrue], //condicones y decimos que tiene que ser true
  });
  onSubmit() {
   console.log(this.myForm.value);
    this.myForm.markAllAsTouched();
    }

}
