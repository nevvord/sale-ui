import { MyStoreService } from './../../services/my-store.service';
import { NotifierService } from 'angular-notifier';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-new-store',
  templateUrl: './add-new-store.component.html',
  styleUrls: ['./add-new-store.component.scss']
})
export class AddNewStoreComponent implements OnInit {

  private readonly _notifier:  NotifierService
  private form: FormGroup
  public StoreCreated: boolean
  public Stores: Array<object>

  constructor(public notifierService: NotifierService, private FormBuilder: FormBuilder, private _myStore: MyStoreService, private _router: Router) {
    this._notifier = notifierService
  }

  ngOnInit() {
    this.form = this.FormBuilder.group({
      login: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      storeName: new FormControl('', [Validators.required]),
      fullName: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      rules: new FormControl(false, [Validators.pattern('true')]),
    })
    this._myStore.checkStore()
        .subscribe(
          res => {
            console.log(res);
            
            this.StoreCreated = true
            this.Stores = res.stores     
            // this._notifier.show({ type: 'success', massage: res.msg })
          },
          err => this.StoreCreated = false
        )
  }

  addStore(){
    this._myStore.createStore(this.form.value)
        .subscribe(
          res => {
            this._notifier.show({
              type: 'success',
              message: res.msg
            })
            this._router.navigate(['/'])
          },
          err => console.log(err)
        )
    console.log(this.form.value);
    
  }

}
