import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-salemodal',
  templateUrl: './salemodal.component.html',
  styleUrls: ['./salemodal.component.scss']
})
export class SalemodalComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }


  openModal( exampleModalContent ) {
    this.modalService.open( exampleModalContent, { size : 'lg' } );
  }

  openMediumModal( mediumModalContent ) {
    this.modalService.open( mediumModalContent );
  }

  openSmallModal( smallModalContent ) {
    this.modalService.open( smallModalContent, { size : 'sm' } );
  }
}
