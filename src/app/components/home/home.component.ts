import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private service: SharedService, private fb: FormBuilder,
    private router : Router) { }

  registerForm!: FormGroup
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['',[Validators.required, Validators.pattern('[a-zA-Z ]*') ,Validators.maxLength(20)]],
      lastName: ['',[Validators.required, Validators.pattern('[a-zA-Z ]*'),Validators.maxLength(20)]],
      emailId: [''],
      mobileNumber: [''],
      age: [''],
      state: [''],
      country: [''],
      address1: [''],
      address2: [''],
      companyAddress1: [''],
      companyAddress2: [''],
      tags: [],
      subscribe: false,
      imageUrl:['']
    })
  }

  url = '../../../assets/profile.webp'

  tags: any;
  age:any;

  companyAddressShow: boolean = false;
  addressShow: boolean = false;

  allTags: any[] = [];

  rangeVar!: string;

  changeRange(value: any, ref: HTMLInputElement) {
    ref.value = value.value;
    this.age = value.value
  }

  addTags(value: any) {
    console.log(value)
    this.tags = {
      name: value
    }
  }

  removeTags(index: any) {
    this.allTags.splice(index, 1)
  }

  select(value: any, tagValue:any) {
    console.log(value.key)
    if (value.key == 'Enter') {
      this.allTags.push(this.tags)
      console.log(this.allTags)
      tagValue.value = ''
    }
  }

  selectAddress(value: any) {
    // console.log(value.value)
    if (value.value === 'home') {
      this.addressShow = true;
      this.companyAddressShow = false
    } else if (value.value === 'company') {
      this.companyAddressShow = true
      this.addressShow = false

    }
  }

  uplaodProfilebutton() {
    let ref = document.getElementById('file');
    ref?.click();
    // this.onSelectFile(event)
  }

  onSelectFile(event: any) {
    if (event.target.files) {
      // console.log(event.target.files[0].size)
      if (event.target.files[0].size < 200 * 200){
        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (fileType: any) => {
          this.url = fileType.target.result;
          console.log(this.url)
        }
      }else{
        alert("Image Size Is Very Large Only allow 310*325 px Image..")
      }
    }
  }

  get f() {
    return this.registerForm.controls;
  }

  postRegisterData(){
    debugger
    this.registerForm.value.imageUrl = this.url;
    this.registerForm.value.tags = this.allTags;
    this.registerForm.value.age = this.age;
    this.service.postRegisterData(this.registerForm.value).subscribe((res:any)=>{
      this.registerForm.reset();
    })
    let ref = document.getElementById('close');
    ref?.click();
    this.router.navigate(['/view-details'])
  }
}
