import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  endPoint = "http://localhost:8080/api/task";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/form-data'
    })
  };

  constructor(private httpClient: HttpClient) { }

  getTasks(){
    return this.httpClient.get(this.endPoint);
  }

  getTaskById(id:any){
    return this.httpClient.get(this.endPoint+"/"+id);
  }

  // DECOMMENT:
  createTask(task, blob){
    let formData = new FormData();
    formData.append("task_title", task.title);
    formData.append("task_content", task.content);
    formData.append("file", blob);

    return this.httpClient.post(this.endPoint, formData);
  }

  deleteTask(id: any){
    console.log("adiosssssssssssssssssssssssss")
    console.log(id)
    return this.httpClient.delete(this.endPoint + "/" + id);
  
  }

  updateTask(id:any,task,blob){
    let formData = new FormData();
    console.log(blob);
    formData.append("task_title", task.title);
    formData.append("task_content", task.content);
    formData.append("file", blob);
    console.log(task.title);
    console.log(task.content);
    console.log(blob);
    console.log("adiosssssssssssssssssssssssss")
    return this.httpClient.put(this.endPoint+"/"+id, formData);
  }
}
