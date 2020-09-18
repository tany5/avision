import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, FormBuilder, FormGroup} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { ProfileService } from './profile.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { MatSnackBar } from '@angular/material/snack-bar';
/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @ViewChild('focus', {static: false}) input: ElementRef;
  selected = "English"
  userFile: string
  name: string
  dob: string
  category: string
  pin: string
  language: string
  phone: string
  closeResult = '';
  controlNames: any
  email: any
  imageUrl: any = 'https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg';
  selectedFile: File = null;
  form: FormGroup
  message: any
  examDetails: any

  show: boolean = false
  registerForm: FormGroup;
  submitted = false;
  showPhone = false
  updatePasswordForm: FormGroup
  prev_password: any
  new_password: any
  confirm_password: any
  hide = true;
  showExamContainer: boolean =false
  labelPosition: 'before' | 'after' = 'before'
  courseDetails: any
  courseDetailsLoader: boolean = false
  subCategoryLoader: boolean = false
  courseName: any
  subCategoryName: any
  checkBoxArray: any =[]
  userDetails: any
  userAllDetails: any
  user_id = localStorage.getItem('currentUserId')
  files: FileList
  course_id: any
  userImage: any
  constructor(private profileService: ProfileService, private formBuilder: FormBuilder, private modalService: NgbModal,  private cd: ChangeDetectorRef,private snackbar: MatSnackBar) {
    this.profileService.getUserInfo(this.user_id).subscribe(
      (res)=> {

        this.userDetails = res['user_information']

        this.dob = this.userDetails[0]['dob']
        this.category = this.userDetails[0]['category']
        this.language = this.userDetails[0]['language']
        this.pin = this.userDetails[0]['location']


      },
      (error)=> {
        console.log(error)
      })

      this.profileService.getUserData(this.user_id).subscribe(
        (res)=> {
          this.userAllDetails = res['user_information']
          console.log(this.userAllDetails)
          this.name = this.userAllDetails[0]['user_name']
          this.email = this.userAllDetails[0]['user_email']
          this.phone = this.userAllDetails[0]['user_phone']
          this.userImage = this.userAllDetails[0]['user_img']


        },
        (error)=> {

        })

        this.profileService.getExamCategory(this.user_id).subscribe(
          (res)=> {
            console.log(res)

            this.examDetails = res
          },
          (error)=> {
            console.log(error)
          }
        )



  }

  ngOnInit(){
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      dob: ['', Validators.required],
      category: ['', Validators.required],
      pin: ['', Validators.required],
      language: ['',Validators.required]

    });

    this.form = this.formBuilder.group({
      image: ['']
    });


    this.updatePasswordForm = this.formBuilder.group({
      prev_password: ['', Validators.required],
      new_password: ['', Validators.required],
      confirm_password: ['', Validators.required]
    }, {
      validator: this.MustMatch('new_password', 'confirm_password')
  });

  }

  get f() { return this.updatePasswordForm.controls; }
  toggleShow() {
    this.show = !this.show

    setTimeout(()=>{
    this.input.nativeElement.focus();
    },0);

  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  nameFormControl = new FormControl('', [
    Validators.required,
  ]);



  matcher = new MyErrorStateMatcher();

  updateDetails() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
    const name = this.name
    const dob = this.convert(this.dob)
    const category = this.category
    const location = this.pin
    const language = this.language
    const user_id = localStorage.getItem('currentUserId')
    this.profileService.updateDetails(name,dob,category,location,language, user_id).subscribe(
      (res)=> {

        this.submitted = false
        this.registerForm.reset()
        this.show = !this.show
      },
      (error) => {
        console.log(error)
      }
    )}

    changePhone() {
      this.showPhone = !this.showPhone
    }

    updatePhone(phone) {
      const user_phone = phone
      this.showPhone = !this.showPhone
      this.profileService.UpdateUserPhone(this.user_id, user_phone).subscribe(
        (res)=> {
          console.log(res)
        },
        (error)=> {
          console.log(error)
        })
    }

    open(content) {
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'sm'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }

    open2(content2) {
      this.modalService.open(content2, {ariaLabelledBy: 'modal-basic-title', size: 'sm'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });

      this.profileService.getCourseDetails().subscribe(
        (res)=> {

          this.courseDetailsLoader = true
          this.courseDetails = res

        },
        (error)=> {
          console.log(error)
        }
      )


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

    updatePassword() {
      const prev_password = this.updatePasswordForm.value.prev_password
      const new_password = this.updatePasswordForm.value.new_password
      this.profileService.updateUserPassword(prev_password, new_password, this.user_id).subscribe(
        (res)=> {
          console.log(res)
          this.modalService.dismissAll()
          this.message = res['message']

          this.snackbar.open(this.message, 'ok')


        },
        (error)=> {
          console.log(error)

        })
    }

     MustMatch(controlName: string, matchingControlName: string) {
      return (formGroup: FormGroup) => {
          const control = formGroup.controls[controlName];
          const matchingControl = formGroup.controls[matchingControlName];

          if (matchingControl.errors && !matchingControl.errors.mustMatch) {
              // return if another validator has already found an error on the matchingControl
              return;
          }

          // set error on matchingControl if validation fails
          if (control.value !== matchingControl.value) {
              matchingControl.setErrors({ mustMatch: true });
          } else {
              matchingControl.setErrors(null);
          }
      }
  }

  showExamDetails(id) {
    this.showExamContainer = !this.showExamContainer
    this.subCategoryLoader = false
      this.profileService.getSubCategoryName(id, this.user_id).subscribe(
        (res)=> {

          this.subCategoryLoader = true
          this.subCategoryName = res['sub_category']
          console.log(this.subCategoryName)
          this.courseName = this.subCategoryName[0]['courses_name']
          this.course_id = this.subCategoryName[0]['courses_id']


        },
        (error)=> {
          console.log(error)
      })

  }

  hideExamDetails() {
    this.showExamContainer = !this.showExamContainer
  }

  checkCheckBoxvalue(courses_id, sub_category_id){
    this.checkBoxArray.push(sub_category_id)
  }

  updateExamDetails() {
    this.profileService.updateExamDetails(this.course_id, this.checkBoxArray, this.user_id).subscribe(
      (res)=> {
        console.log(res)
        this.modalService.dismissAll()
        this.message = res['message']
        this.snackbar.open(this.message, 'ok')

        this.profileService.getExamCategory(this.user_id).subscribe(
          (res)=> {
            this.examDetails = res
            location.reload()
          },
          (error)=> {
            console.log(error)
          })
      },
      (error)=> {
        console.log(error)
      }
    )
  }

  deleteExamDetails(id) {
    if(confirm("Are you sure to delete ")) {
    this.profileService.deleteExamDetails(id).subscribe(
      (res)=> {
        this.message = res['message']
        this.snackbar.open(this.message, 'ok')
        this.profileService.getExamCategory(this.user_id).subscribe(
          (res)=> {
            this.examDetails = res
          },
          (error)=> {
            console.log(error)
          })
      })
    }
  }


  convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }





  uploadFile(event) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    this.files  = event.target.files
    this.selectedFile = this.files.item(0)
    this.form.get('image').setValue(file);
    const data = this.form.get('image').value
    const formData = new FormData()
    formData.append('image', this.form.get('image').value)

    this.profileService.UpdateProfileImage(data, this.user_id).subscribe(
      (res)=> {
        console.log(res)
        this.modalService.dismissAll()
        this.message = res['message']
        this.snackbar.open('image uploaded', 'ok')
        this.userImage = this.imageUrl;
      }
    )

    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.imageUrl = reader.result;

      }

    }

  }
}
