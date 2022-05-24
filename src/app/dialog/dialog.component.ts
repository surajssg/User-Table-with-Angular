import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { LocalStorageService } from '../services/local-storage.service';
import { HttpClient } from '@angular/common/http';
import { FirebaseService  } from '../services/firebase.service';


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
  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editUser: any,
    private dialogRef: MatDialogRef<DialogComponent>,
    private snackBar: MatSnackBar,
    // private localStorageService: LocalStorageService,
    private http:HttpClient,
    private fbService:FirebaseService
  ) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      userName: ['', Validators.required],
      age: ['', Validators.required],
      mobile: ['', Validators.required],
      id: [''],
    });

    if (this.editUser) {
      this.actionBtn = 'Update';
      this.userForm.controls['userName'].setValue(this.editUser.userName);
      this.userForm.controls['age'].setValue(this.editUser.age);
      this.userForm.controls['mobile'].setValue(this.editUser.mobile);
      this.userForm.controls['id'].setValue(this.editUser.id);
    }
  }

  addUser(operation: any) {
      if (operation == 'save') {
      if (!this.editUser) {
        console.log(this.editUser);
        if (this.userForm.valid) {
          // this.localStorageService.addDataLocalStorage(this.userForm.value);
          const postData = this.userForm.value
          console.log(postData)
          this.fbService.postUser(postData)
          console.log(this.userForm.value);
          this.dialogRef.close('save');
          this.snackBar.open(this.text5.toString(),'',{

            duration:3000,
            verticalPosition:'top'
          })
        } else {
          console.error('error');
        }
      }
    } else {
      if (this.editUser) {
        if (this.userForm.valid) {
          // this.localStorageService.updateLocalStorage(
          //   this.userForm.value.id,
          //   this.userForm.value
          // )
     
          this.fbService.putUser(
            this.userForm.value,
            this.userForm.value.id
          ).subscribe(res=>{
            console.log(res)

            //window. location. reload();

          });
          this.dialogRef.close('update');
          this.snackBar.open(this.text1.toString(),'',{
            duration:3000,
            verticalPosition:'top'
          })

        } else {
          console.error('error');
        }
      }
    }
  }

  updateUser() {}
}
