import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.page.html',
  styleUrls: ['./list-tasks.page.scss'],
})
export class ListTasksPage implements OnInit {

  tasks: any = [];

  constructor(private taskService: TaskService, private router: Router) { }

  ngOnInit() { }

  ionViewDidEnter(){
    this.getAllTasks();
  }

  getAllTasks() {
    this.taskService.getTasks().subscribe(notes => {
      console.log(notes);
      this.tasks = notes;
    })
  }

  // DECOMMENT:
  addTask(){
    this.router.navigateByUrl("/add-tasks");
  }

  deleteTask(id: any){
    console.log("bbbbbbbb");
    console.log(id);
    this.taskService.deleteTask(id).subscribe(() => {
      console.log("se borro");
    })
    location.reload();
  }

  goToUpdate(id:any){
    localStorage.setItem("id",id);
    localStorage.setItem("image",id);
    this.router.navigateByUrl("/update-task");
    // this.router.navigateByUrl("/add-tasks");
  }
}
