import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BikeService } from 'src/app/service/bike.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bike',
  templateUrl: './bike.component.html',
  styleUrls: ['./bike.component.css']
})
export class BikeComponent {
  form: FormGroup;//Reactive Form
  constructor(private formBuilder: FormBuilder , private bikeService:BikeService, private router: Router) {
    if (this.bikeService.selectedBike) {
      this.form = formBuilder.group({
        id: [this.bikeService.selectedBike.id],
        mark: [this.bikeService.selectedBike.mark, [Validators.required, Validators.minLength(3)]],
        price: [this.bikeService.selectedBike.price, [Validators.min(1)]],
        ageOfCreation: [this.bikeService.selectedBike.ageOfCreation],
        disponibility: [this.bikeService.selectedBike.disponibility, []],
      });
    } else {
      this.form = formBuilder.group({
        id: [0],
        mark: ['', [Validators.required, Validators.minLength(3)]],
        price: [0, [Validators.min(1)]],
        ageOfCreation: [new Date()],
        disponibility: [false, []],
      });
    }
  }


  onSubmit() {
    if (this.form.valid) {
      this.addBike();
      this.router.navigate(['/bikelist']);
    } else {
      alert('Formulario No Valido');
    }
  }

  addBike() {
    this.bikeService.addBike(this.form.value)
    console.log(this.bikeService.bike);
  }


  updateBike() {
    this.bikeService.updateBike(this.idField.value, this.form.value);
    console.log(this.bikeService.bike);
    this.router.navigate(['/bikelist']);
  }

  get idField() {
    return this.form.controls['id'];
  }

}
