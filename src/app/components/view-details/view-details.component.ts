import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.css']
})
export class ViewDetailsComponent implements OnInit {

  constructor(private service: SharedService, private router: Router, private fb: FormBuilder) { }

  allRegisterData: any;

  registerForm!: FormGroup;

  ngOnInit(): void {
    this.getAllregisterData();

    this.registerForm = this.fb.group({
      firstName: [''],
      lastName: [''],
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
      imageUrl: ['']
    })
  }

  url = '../../../assets/profile.webp'
  profileUrl: any

  tags: any;
  age: any;

  companyAddressShow: boolean = false;
  addressShow: boolean = false;

  allTags: any[] = [];

  rangeVar!: string;
  Userid: any;

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

  select(value: any, tagValue: any) {
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
      if (event.target.files[0].size < 200 * 200) {
        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (fileType: any) => {
          this.url = fileType.target.result;
          this.profileUrl = this.url
          console.log(this.profileUrl)
        }
      } else {
        alert("Image Size Is Very Large Only allow 310*325 px Image..")
      }
    }
  }

  profileImageUpdate(data: any) {
    let ref = document.getElementById('profile');
    ref?.click();
    // debugger
  }

  onSelectprofileImage(event: any, data: any) {
    if (event.target.files) {
      // console.log(event.target.files[0].size)
      if (event.target.files[0].size < 200 * 200) {
        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (fileType: any) => {
          this.url = fileType.target.result;
          this.profileUrl = this.url
          console.log(this.profileUrl)
          debugger
          this.registerForm.setValue({
            firstName: data.firstName,
            lastName: data.lastName,
            emailId: data.emailId,
            mobileNumber: data.mobileNumber,
            age: data.age,
            state: data.state,
            country: data.country,
            address1: data.address1,
            address2: data.address2,
            companyAddress1: data.companyAddress1,
            companyAddress2: data.companyAddress2,
            tags: '',
            subscribe: data.subscribe,
            imageUrl: ''
          })
          this.registerForm.value.tags = this.allTags;
          this.registerForm.value.imageUrl = this.profileUrl;
          this.service.updateRegisterDetails(data.id, this.registerForm.value).subscribe((res: any) => {
            this.getAllregisterData()
          })
        }
      } else {
        alert("Image Size Is Very Large Only allow 310*325 px Image..")
      }
    }
  }

  getAllregisterData() {
    this.service.getRegisterData().subscribe((res: any) => {
      this.allRegisterData = res
      // console.log(this.allRegisterData)
    })
  }

  iagree() {
    this.router.navigate([''])
  }
  imageUrl: any
  openEditModal(value: any) {
    let ref = document.getElementById('modalOpen');
    ref?.click();
    this.imageUrl = value.imageUrl;
    this.allTags = value.tags;
    if (value.address1 !== '' || value.address2 !== '') {
      this.addressShow = true;
      this.companyAddressShow = false;
    } else if (value.companyAddress1 !== '' || value.companyAddress2 !== '') {
      this.companyAddressShow = true;
      this.addressShow = false;
    }
    this.Userid = value.id
    this.registerForm.setValue({
      // id:value.id,
      firstName: value.firstName,
      lastName: value.lastName,
      emailId: value.emailId,
      mobileNumber: value.mobileNumber,
      age: value.age,
      state: value.state,
      country: value.country,
      address1: value.address1,
      address2: value.address2,
      companyAddress1: value.companyAddress1,
      companyAddress2: value.companyAddress2,
      tags: '',
      subscribe: value.subscribe,
      imageUrl: ''
    })
  }

  updatedata() {
    if (this.url == '') {
      this.registerForm.value.imageUrl = this.imageUrl;
    }
    this.registerForm.value.imageUrl = this.url;
    this.registerForm.value.tags = this.allTags;
    this.service.updateRegisterDetails(this.Userid, this.registerForm.value).subscribe((res: any) => {
      let ref = document.getElementById('close');
      ref?.click();
      this.getAllregisterData()
    })
  }
}
