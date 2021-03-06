import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { OneRouteResponse } from 'src/app/interfaces/one-route-response';
import { PoiService } from 'src/app/services/poi.service';
import { RouteService } from 'src/app/services/route.service';

import { DialogDeleteRouteComponent } from './../../dialogs/dialog-delete-route/dialog-delete-route.component';
import { DialogRouteComponent } from './../../dialogs/dialog-route/dialog-route.component';

@Component({
  selector: 'app-route-details',
  templateUrl: './route-details.component.html',
  styleUrls: ['./route-details.component.scss']
})
export class RouteDetailsComponent implements OnInit {
  route: OneRouteResponse;

  constructor(private poiService: PoiService, private routeService: RouteService,
    public router: Router, public dialog: MatDialog, public snackBar: MatSnackBar, private titleService: Title) { }

  ngOnInit() {
    if (this.routeService.selectedRoute == null) {
      this.router.navigate(['home/routes']);
    } else {
      this.getData();
    }
    this.titleService.setTitle('Details - Routes');
  }

  getData() {
    this.routeService.getOne(this.routeService.selectedRoute.id).subscribe(r => {
      this.route = r;
    });
  }

  openDialogEditRoute() {
    const dialogEditRoute = this.dialog.open(DialogRouteComponent, { data: { route: this.route }, width: '500px' });
    dialogEditRoute.afterClosed().subscribe(res => res === 'confirm' ? this.router.navigate['/home/routes'] : null,
      err => this.snackBar.open('There was an error when we were updating this Route.', 'Close', { duration: 3000 }));
  }

  openDialogDeleteRoute() {
    const dialogDeleteRoute = this.dialog.open(DialogDeleteRouteComponent,
      { panelClass: 'delete-dialog', data: { routeId: this.route.id, routeName: this.route.name } });
    dialogDeleteRoute.afterClosed().subscribe(res => res === 'confirm' ? this.router.navigate['/home/routes'] : null,
      err => this.snackBar.open('There was an error when we were deleting this Route.', 'Close', { duration: 3000 }));
  }

  calcTotalDistanceInKm() {
    // TODO: Search how to calculate total distance between coordinates in Google Maps.
    return 0;
  }

  calcWidth() {
    const maxImgWidthPcntg = 100;
    return maxImgWidthPcntg / this.route.pois.length;
  }

  goPoiDetails(p) {
    this.poiService.selectedPoi = p;
    this.router.navigate(['home/details']);
  }

}
