import { Component, OnInit } from '@angular/core';
import { UserPagesService } from '../user-pages.service';
import { UserModel } from 'src/app/models/user.model';
import { CommonService } from 'src/app/shared/sharedservices/commons/common.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {
  userlist: Array<UserModel> = [];


  constructor(private service: UserPagesService, private commonservice: CommonService) { }

  ngOnInit() {
    this.userList();
  }


/** Display the list of all users of the system */
userList() {
  this.service.get_allusers()
  .subscribe((userlist) => {
    this.userlist = userlist;
    //console.log(`id juire >>>${this.userlist[0]['_id']}`);
});
}

parseDate(dateString: string): Date {
  return this.commonservice.parseDate(dateString);
}

}
