import { Component, OnInit } from '@angular/core';
import { Profile } from '../lib/profile';
import { ProfileService } from '../services/profile.service';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';


@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})

export class ProfilesComponent implements OnInit {


  profiles: Profile[];
  profileForm: FormGroup;
  editprofForm: FormGroup;
  editProfile: Profile;

  createForm() {
    this.profileForm = this.formBuilder.group({
      _id: [''],
      user: [''],
      name: ['', Validators.required],
      username: ['', Validators.required],
      pin: ['', [Validators.required, Validators.minLength(6)]],
      pic: [''],
      years: ['', [Validators.required, Validators.max(17), Validators.pattern('[0-9]*')]],

    });
    this.editprofForm = this.formBuilder.group({
      _id: [''],
      user: [''],
      name: ['', Validators.required],
      username: ['', Validators.required],
      pin: ['', [Validators.required, Validators.minLength(6)]],
      pic: [''],
      years: ['', [Validators.required, Validators.max(17), Validators.pattern('[0-9]*')]],

    });
  }

  constructor(private profileService: ProfileService, private formBuilder: FormBuilder, private router: Router) {
    this.createForm();
  }

  ngOnInit() {
    this.getProfiles();
  
  }

  getProfiles(): void {
    // this.videos = this.videoService.getVideos();
    this.profileService.getProfiles()
      .subscribe(profileResponse => this.profiles = profileResponse);
  }


  postProfile(form: NgForm) {

    this.profileService.postProfiles(form.value)
      .subscribe(res => {
        let id = res['_id'];
        console.log(id);
        this.profileForm.reset();
        this.getProfiles();

      }, (err) => {
        console.log(err);
      });

  }


  updateProfile(): void {
    this.profileService.updateProfile(this.editprofForm.value)
      .subscribe(data => {
        this.getProfiles();
      });
    location.reload();
  }


  cargar(profile: Profile): void {

    this.editProfile = {
      _id: profile._id,
      name: profile.name,
      user: profile.user,
      username: profile.username,
      pin: profile.pin,
      years: profile.years,
      pic: profile.pic
    };

    this.editprofForm.setValue(this.editProfile);
  }


  deleteProfile(profile: Profile): void {
    this.profileService.deleteProfile(profile)
      .subscribe(res => {
        this.getProfiles();
      }, (err) => {
        console.log(err);
      }
      );
  }


}
