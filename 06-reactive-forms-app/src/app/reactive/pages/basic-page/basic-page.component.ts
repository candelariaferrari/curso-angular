import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
//import { FormUtils } from '../../../utils/form-utils';


@Component({
  selector: 'app-basic-page',
  imports: [
    JsonPipe,
    ReactiveFormsModule
  ],
  templateUrl: './basic-page.component.html',
})
export class BasicPageComponent {

//la aparecia, validaciones de mi form
 myForm = new FormGroup({
    name: new FormControl('', [], []),
    price: new FormControl(0),
    inStorage: new FormControl(0),
  });


}
