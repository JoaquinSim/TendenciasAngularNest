import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BikeService {
  bike: any[] = [];
  selectedBike: any = null;

  constructor() {
    this.loadBike();
  }

  private loadBike() {
    this.bike = [];
    this.bike.push(
      {id: 1, mark: 'Sony?', price: 20, ageOfCreation: '1990-01-01', disponibility: true},
      {id: 2, mark: 'MountainKiller', price: 25, ageOfCreation: '1998-02-11', disponibility: true}
    );
  }

  addBike(payload: any) {
    this.bike.push(payload);
  }

  updateBike(id: number, payload: any) {
    const index = this.bike.findIndex(person => person.id === id);
    this.bike[index] = payload;
  }

  deleteBike(id: number) {
    const index = this.bike.findIndex(person => person.id === id);
    if (index > -1) {
      this.bike.splice(index, 1);
    }
  }
}

