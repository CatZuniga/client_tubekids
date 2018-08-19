import { Component, OnInit } from '@angular/core';
import { Video } from '../lib/video';
import { VideoService } from '../services/video.service';
import { ProfileService } from '../services/profile.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Profile } from '../lib/profile';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']

})
export class VideosComponent implements OnInit {

  videos: Video[];
  profiles: Profile[];
  videoForm :FormGroup;
  editVideo : Video;
selectedValue = null;

//myOptions: Array<NgSelectModule> = this.profiles;


  constructor(
    private videoService: VideoService,
    private profileService: ProfileService,
    private formBuilder: FormBuilder
  ) {
  }

  createForm() {
    this.videoForm = this.formBuilder.group({
      _id :[''],
      user :[''],
      name: ['', Validators.required],
      url: ['', Validators.required],
      category :['', Validators.required]
    });
  }

  ngOnInit() {
    this.getVideos();
    this.createForm();
    this.getProfiles();
   
  }

  getVideos(): void {
    this.videoService.getVideos()
      .subscribe(videoResponse => this.videos = videoResponse);
  }


  getProfiles(): void {
    this.profileService.getProfiles()
      .subscribe(profileResponse => this.profiles = profileResponse);
  }

  postVideo(form: NgForm) {
    this.videoService.postVideo(form.value)
      .subscribe(res => {
        let id = res['_id'];
        console.log(id);
        this.videoForm.reset();
        this.getVideos();

      }, (err) => {
        console.log(err);
      });
  }

  cargar(video: Video): void {
    this.editVideo ={
    _id: video._id,
    user: video.user,
    name: video.name,
    url: video.url,
    category: null
    };
   
  this.videoForm.setValue(this.editVideo);
  }

  updateVideo(): void {
    console.log(this.editVideo);
    this.videoService.updateVideo(this.videoForm.value)
      .subscribe(data => {
        this.videoForm.reset();
        this.getVideos();
      });
    //location.reload();
  }


  deleteVideo(video: Video): void {
    this.videoService.deleteVideo(video)
      .subscribe(res => {
     this.getVideos();
      }, (err) => {
        console.log(err);
      }
      );
  }
}
