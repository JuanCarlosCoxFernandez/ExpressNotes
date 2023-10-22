import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { PhotoService } from '../services/photo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.page.html',
  styleUrls: ['./update-task.page.scss'],
})


export class UpdateTaskPage implements OnInit {

  task_title!: String;
  task_content!: String;
  updateTaskForm: FormGroup;
  isSubmitted: boolean = false;
  capturedPhoto: string = "";

  constructor(public formBuilder: FormBuilder,
    private taskService: TaskService,
    private photoService: PhotoService,
    private router: Router
  ) {

  }

  ionViewWillEnter() {
    this.updateTaskForm.reset();
    this.isSubmitted = false;
    this.capturedPhoto = "";
  }

  ngOnInit() {
    this.updateTaskForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]]
    })
  }

  getTaskById(){
    this.taskService.getTaskById(localStorage.getItem("id")).subscribe((response: any)=> {
      this.task_title = response.task_title;
      this.task_content = response.task_content;
      this.capturedPhoto = "http:/localhost:8080/images/"+response.filename;
    });
  }

  get errorControl() {
    return this.updateTaskForm.controls;
  }

  takePhoto() {
    // DECOMMENT:
    this.photoService.takePhoto().then(data => {
      this.capturedPhoto = data.webPath;
    });
  }

  pickImage() {
    // DECOMMENT:
    this.photoService.pickImage().then(data => {
      this.capturedPhoto = data.webPath;
    });
  }

  discardImage() {
    // DECOMMENT:
    this.capturedPhoto = null;
  }

  async submitFormUpdate() {
    let blob = null;
    if (this.capturedPhoto != "") {
      const response = await fetch(this.capturedPhoto);
      console.log(response);
      blob = await response.blob();
    }

    console.log(blob);
    console.log(localStorage.getItem("id"));
    this.taskService.updateTask(localStorage.getItem("id"), this.updateTaskForm.value, blob).subscribe(response => {
      console.log("aaaaaaa");
      this.gotoTask();
    })
  }

  gotoTask(){
    this.router.navigateByUrl("/list-tasks");
  }
}
