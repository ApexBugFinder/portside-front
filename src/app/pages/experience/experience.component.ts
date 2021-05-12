import { Component, OnInit } from '@angular/core';
import {
faPencilAlt
} from '@fortawesome/free-solid-svg-icons';
import { defaultExperience, Experience } from 'src/app/experience/Models/experience';
import { ExperienceService } from 'src/app/experience/experience.service';
import { Constants } from 'src/app/helpers/Constants';
import { Guid } from 'guid-typescript';
import { defaultRole, Role } from 'src/app/experience/Models/role';


@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {

  role1: Role;
  role2: Role;
  itemToSend: Experience;

  editIcon = faPencilAlt;
  pageClass= "Experience";
  constructor(private experienceService: ExperienceService) { 
    
  }


  ngOnInit(): void {
    this.itemToSend = JSON.parse(JSON.stringify(defaultExperience));
    this.itemToSend.id = '77339c8d-a1cc-4e1c-9ae1-424309852125';


    this.role1 = JSON.parse(JSON.stringify(defaultRole));
    this.role1.id = 'f7169a5d-8e0f-4301-9495-ad5ade7b5803';
    this.role1.experienceID = this.itemToSend.id;
    
    this.role2 = JSON.parse(JSON.stringify(defaultRole));
    this.role2.id = '76af3a13-33e0-4348-adfd-85a6f3b27290';
    this.role2.experienceID = this.itemToSend.id;

    this.itemToSend.roles?.push(this.role1, this.role2 );
    
    
  this.experienceService.createItem(this.itemToSend).subscribe(value => {
    console.log('create value returned: ', value);
  })
  }

  createExperience() {

  }
}
