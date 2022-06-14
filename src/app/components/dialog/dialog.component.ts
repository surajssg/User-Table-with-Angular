import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  userForm!: FormGroup;
  actionBtn: string = 'save';
  text1: string = 'User Updated Successfully';
  text5: string = 'User added successfully';
  currentDate = new Date();
  form: any;
  todaysDate : any;
  
  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editUser: any,
    private dialogRef: MatDialogRef<DialogComponent>,
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private fbService: FirebaseService,
    private router:Router,
  ) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      userName: ['', Validators.required],
      createdDate:[this.currentDate],
      date :[''],
      age: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      id: [''],
    });

    if (this.editUser) {
      this.actionBtn = 'Update';
      this.userForm.controls['userName'].setValue(this.editUser.userName);
      this.userForm.controls['date'].setValue(this.currentDate);
       this.userForm.controls['createdDate'].setValue(this.currentDate);
      this.userForm.controls['age'].setValue(this.editUser.age);
      this.userForm.controls['mobile'].setValue(this.editUser.mobile);
      this.userForm.controls['id'].setValue(this.editUser.id);
    }
  }
  public async addUser(operation: any) {
    if (operation == 'save') {
      const postData = this.userForm.value;
      console.log(postData);
      this.todaysDate = postData.createdDate;
      console.log(this.todaysDate);
      const data = await new Promise<any>((response) => {
        console.log(response);
        this.fbService.postUser(postData).subscribe(response);
        this.router.navigate(['app'])
      });
      console.log(data);
      this.snackBar.open(this.text5.toString(), '', {
        duration: 3000,
        verticalPosition: 'top',
      });
      this.dialogRef.close('save');
    } else {
      console.log(this.userForm.value);
      const data = await new Promise<any>((response) => {
        console.log(response);
        this.fbService
          .putUser(this.userForm.value, this.userForm.value.id)
          .subscribe(response);
      });
      this.dialogRef.close('update');
      this.snackBar.open(this.text1.toString(), '', {
        duration: 3000,
        verticalPosition: 'top',
      });
    }
  }
}
