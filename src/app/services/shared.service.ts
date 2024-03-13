import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from '../models/register';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor( private http : HttpClient ) { }

  getRegisterData(){
    return this.http.get('http://localhost:3000/posts')
  }

  postRegisterData(data:Register){
    return this.http.post('http://localhost:3000/posts',data)
  }

  updateRegisterDetails(id:any, data:any){
    return this.http.put('http://localhost:3000/posts/'+id,data)
  }
}
