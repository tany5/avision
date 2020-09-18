import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-form-arr',
  templateUrl: './form-arr.component.html',
  styleUrls: ['./form-arr.component.scss']
})
export class FormArrComponent implements OnInit {

  angForm = new FormGroup({
    names: new FormArray([
      new FormControl('', Validators.required),
      new FormControl('', Validators.required)
    ]),
    checkBox: new FormArray([
      new FormControl(''),
      new FormControl('')
    ])
  });

  get names(): FormArray {
    return this.angForm.get('names') as FormArray;
}
get checkBox(): FormArray{
  return this.angForm.get('checkBox') as FormArray;
}
  public addresses: FormArray;
  public addressForm: FormGroup;
  selValue:any=0
  constructor(private fb: FormBuilder) {

    this.addressForm = this.fb.group({
      addresses: this.fb.array([ ])      
    });
   }
   get addressControls() {
    return this.addressForm.get('addresses')['controls'];
  }
  
  addAddress(): void {
    this.addresses = this.addressForm.get('addresses') as FormArray;
    //this.addresses.push(this.createAddress());
  }

  selectCity(index):void{
    this.selValue=1
    console.log(this.addresses.length);
    console.log(index)
    for(var i=0;i<this.addresses.length;i++){
      if(index !=i){
        this.addresses.value[i].city=0
      }
    }
    this.addresses.value[index].city=this.selValue
  }

  removeAddress(i: number) {
    this.addresses.removeAt(i);
  }
  logValue() {
    console.log(this.addresses.value);
  }
   createAddress(): FormGroup {
    return this.fb.group({
      address: '',
      street: '',
      city: '',
      country: ''
    });
  }
  ngOnInit(): void {
    this.addresses = this.addressForm.get('addresses') as FormArray;
    for(var i=0; i<=3;i++){
      this.addresses.push(this.createAddress());
    }
    
  }
  onFormSubmit(): void {
    console.log(this.names.value)
    for(let i = 0; i < this.names.length; i++) {
      console.log(this.names.at(i).value);
      console.log(this.checkBox.at(i).value);
    } 
  }
  clearAll(){
    //console.log( this.addressForm.get('addresses')['controls'][0]['controls']['address'].reset())
    this.addressForm.get('addresses')['controls'][3]['controls']['address'].reset()
    this.addressForm.get('addresses')['controls'][3]['controls']['street'].reset()
  }
}
