import { Component, OnInit } from '@angular/core';
import { CityService } from '../../services/city.service';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.css']
})
export class CityListComponent implements OnInit {
  cityList = [];
  private oldElement;
  start_date;
  end_date;
  constructor(private cityService: CityService) { }

  ngOnInit() {
    this.getUserDetails();
  }


  getUserDetails() {
    this.cityService.getCityList().subscribe(cities => {
      this.cityList = cities.result;
    });
  }

  SortColumnValues(element, columnValue: string) {
    let sortObj: any, SortOrder: string;
    const sortInAscendingOrder = (element.currentTarget.className === 'fa fa-sort' ||
      element.currentTarget.className === 'fa fa-sort-asc') ? false : true;
    if (this.oldElement && this.oldElement.target) {
      this.oldElement.target.className = 'fa fa-sort';
    }
    if (sortInAscendingOrder) {
      element.currentTarget.className = 'fa fa-sort-asc';
      SortOrder = 'DESC';
    } else {
      SortOrder = 'ASC';
      element.currentTarget.className = 'fa fa-sort-desc';
    }

    this.oldElement = element;
    sortObj = {
      elem: element,
      columnName: columnValue,
      SortOrder: SortOrder
    };
    this.sort(sortObj);
  }

  sort(sortObj) {
    if (sortObj.SortOrder === 'ASC') {
      this.cityList.sort((a, b) => {
        if (a[sortObj.columnName] < b[sortObj.columnName]) return -1;
        else if (a[sortObj.columnName] > b[sortObj.columnName]) return 1;
        else return 0;
      });
    } else {
      this.cityList.sort((a, b) => {
        if (a[sortObj.columnName] < b[sortObj.columnName]) return 1;
        else if (a[sortObj.columnName] > b[sortObj.columnName]) return -1;
        else return 0;
      });
    }
  }

  filterCityByDate() {
    const reqParams = {
      start_date: this.start_date ? new Date(this.start_date) : '',
      end_date: this.end_date ? new Date(this.end_date) : ''
    };
    this.cityService.filterCityByDate(reqParams).subscribe(cities => {
      this.cityList = cities.result;
    });
  }

}
