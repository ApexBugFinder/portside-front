import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { ProjectLink, linkview } from '../../models/projectLink';


@Component({
  selector: 'app-site-link',
  templateUrl: './site-link.component.html',
  styleUrls: ['./site-link.component.scss']
})
export class SiteLinkComponent implements OnInit {

  @Input() siteLink: ProjectLink;
  @Output() newSiteToSave: EventEmitter<ProjectLink> = new EventEmitter<ProjectLink>();
  @Output() closeSiteEditor: EventEmitter<string> = new EventEmitter<string>();
  newSite: ProjectLink;
  siteForm: FormGroup;
  siteAbstractControl: AbstractControl | null;

  
  constructor(private fb: FormBuilder) {
    this.siteForm = this.fb.group({
      site: ['']
    })
   }

  ngOnInit(): void {
    console.log('my initial siteLink value: ', this.siteLink);
    this.initControls();
    this.setControls();
    this.newSite = JSON.parse(JSON.stringify(this.siteLink));
  }


  initControls() {
    this.siteAbstractControl = this.siteForm.get('site');

  }

  setControls() {
    this.siteAbstractControl?.setValue(this.siteLink.link);
  }

  // EMIT NEW SITE LINK VALUE and Close SITE LINK EDITOR
  onSave() {
    this.newSite.link = this.siteAbstractControl?.value;
    this.newSiteToSave.emit(this.newSite);
    this.closeSiteEditor.emit(linkview.NONE);
  }
}
