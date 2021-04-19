import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/helpers/Constants';
import { Project } from 'src/app/project/project';
import { ProjectService } from 'src/app/project/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  myProjects: Project[]=[];
  constructor(private projectService: ProjectService) {
    this.getProjects();
  }

  ngOnInit(): void {}

  getProjects() {
    this.projectService.readAll(Constants.userID).subscribe((value) => {
      this.myProjects = value;
      console.log(JSON.stringify(this.myProjects));
    });
  }
}
