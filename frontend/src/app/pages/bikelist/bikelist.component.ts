import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'
import { BikeService } from 'src/app/service/bike.service';

@Component({
  selector: 'app-bikelist',
  templateUrl: './bikelist.component.html',
  styleUrls: ['./bikelist.component.css']
})
export class BikelistComponent {
  bike: any[] = [];
  selectedBike: any;
  data: any;

  constructor(private bikeService: BikeService, private router: Router, private http: HttpClient) {
    this.bike = this.bikeService.bike;
    this.http.get<string>('http://localhost:3000/api/v1/students').subscribe((response) => {
      this.data = response;
      console.log(this.data);

    });
  }

  createBike() {
    this.bikeService.selectedBike = null;
    this.router.navigate(['']);
  }

  editBike(person: any) {
    this.bikeService.selectedBike = person;
    this.router.navigate(['']);
  }

  deleteBike(id: number) {
    this.bikeService.deleteBike(id);
    console.log(this.bikeService.bike);
  }
}
