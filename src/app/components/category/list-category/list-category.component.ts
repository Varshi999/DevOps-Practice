import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss']
})
export class ListCategoryComponent implements OnInit {
  public closeResult: string;
  public categories = [];
  public id;

  public viewCategory = {
    category_id: '', parent_id: '', category_name: '', category_status: '', category_ranking: '',
    category_img: '', category_desc: '', category_created_by: '', category_updated_by: '', category_created_at: '',
    category_updated_at: ''
  };
  public brandFlag = false;

  categoryedit = this.fb.group({
    name: ['', Validators.required]
  });
  categoryadd = this.fb.group({
    name: ['', Validators.required]
  });
  constructor(private datePipe: DatePipe, private auth: AuthService, private modalService: NgbModal, private fb: FormBuilder) {
  }
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  public settings = {
    actions: {
      position: 'right',
      delete: false
    },
    columns: {
      category_id: {
        title: 'Category ID'
      },
      category_name: {
        title: 'Category Name'
      },
      img: {
        title: 'Image',
        type: 'html'
      },
      category_created_at: {
        title: 'Category Created At',
        valuePrepareFunction: (category_created_at) => {
          var raw = new Date(category_created_at);
          var formatted = new DatePipe('en-EN').transform(raw, 'dd MMM yyyy hh:mm');
          return formatted;
        }
      }
    },
    hideSubHeader: true,
    mode: 'external',
    setPaging: 10
  };
  ngOnInit(): void {
    this.onStart();
  }
  onStart() {
    this.auth.getCategory().subscribe(res => {
      console.log(res);
      this.categories = res;
    })
  }
  edit(element, content) {
    console.log(element);
    this.id = element.data.category_id;
    this.auth.getCategoryName(element.data.category_id).subscribe(res => {
      console.log(res);
      this.categoryedit.setValue({
        name: res.category_name
      })
    })
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  updateName() {
    this.auth.updateCategory(this.categoryedit.value.name, this.id).subscribe(
      (res) => {
        console.log(res.msg);
        this.modalService.dismissAll();
        this.onStart();
      }
    );
  }
  addCategory() {
    this.auth.addCategory(this.categoryadd.value.name).subscribe(
      (res) => {
        console.log(res.msg);
        this.modalService.dismissAll();
        this.onStart();
        Swal.fire({
          text: res.msg,
          icon: 'success'
        });
      }
    );
  }
  view(element, v) {
    console.log(element);
    this.auth.getCategoryDetails(element.data.category_id).subscribe(res => {
      this.viewCategory = res;
      console.log(res);
      this.brandFlag = true;
    })
    this.modalService.open(v, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
}
