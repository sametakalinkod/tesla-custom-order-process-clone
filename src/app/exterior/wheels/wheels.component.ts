import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Wheel } from '../../state/models/wheel';
import { wheelTypes } from '../../state/constants/model3-assets';
import { getWheelType } from '../../state/selectors/exterior.selectors';
import { toggleWheelType } from '../../state/actions/exterior.actions';
import { DriveTypes } from '../../state/enums/drive-types';

@Component({
  selector: 'ext-wheels',
  templateUrl: './wheels.component.html',
  styleUrls: ['./wheels.component.scss'],
})
export class WheelsComponent implements OnInit {
  wheelTypes: Wheel[] = wheelTypes;

  currentWheelType: Wheel;
  currentDriveType: DriveTypes;

  constructor(private store: Store<any>) {
    this.store.select(getWheelType).subscribe((state) => {
      this.currentWheelType = state.wheels;
      this.currentDriveType = state.drive;
    });
  }

  ngOnInit(): void {}

  changeWheelType(wheel: Wheel): void {
    this.store.dispatch(
      toggleWheelType({ wheelType: wheel, drive: this.currentDriveType })
    );
  }
}
