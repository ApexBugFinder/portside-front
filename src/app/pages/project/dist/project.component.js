"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProjectComponent = void 0;
var core_1 = require("@angular/core");
var project_1 = require("src/app/project/models/project");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var edit_shell_component_1 = require("../../project/edit/edit-shell.component");
var fromProject = require("../../project/state");
var store_1 = require("@ngrx/store");
var ProjectComponent = /** @class */ (function () {
    function ProjectComponent(projectService, editProjectStore, projectStore, dialog) {
        this.projectService = projectService;
        this.editProjectStore = editProjectStore;
        this.projectStore = projectStore;
        this.dialog = dialog;
        this.faPlusCircle = free_solid_svg_icons_1.faPlusCircle;
        this.myProjects = [];
        this.pageClass = 'Project';
        console.log(this.myProjects);
        this.userProjects$ = this.projectStore.pipe(store_1.select(fromProject.selectAllProjects));
    }
    ProjectComponent.prototype.ngOnInit = function () {
        // this.projectService.readAll(Constants.userID).subscribe({
        //   next: (value) => {
        //     this.myProjects = (value);
        //     if (!value) {
        //       this.myProjects.push(defaultProject);
        //     }
        var _this = this;
        //     console.log('my projects in observable on project component', value);
        //    return value;
        //    },
        //   error: err => console.log('OOps sorry, error occured getting the user\'s projects from store in project component: ', err),
        //   complete: () => console.log('Completed getting user\'s projects from ngrx store in project component')
        // });
        this.userProjects$.subscribe({
            next: function (value) {
                _this.myProjects = value;
                console.log('my projects in observable on project component', value);
                return value;
            },
            error: function (err) {
                return console.log("OOps sorry, error occured getting the user's projects from store in project component: ", err);
            },
            complete: function () {
                return console.log("Completed getting user's projects from ngrx store in project component");
            }
        });
    };
    ProjectComponent.prototype.createProject = function () {
        console.log('project to create: ', project_1.defaultProject);
        var dialogRef = this.dialog.open(edit_shell_component_1.EditShellComponent, {
            width: '980px',
            data: { project: project_1.defaultProject },
            panelClass: 'custom-modalbox'
        });
    };
    ProjectComponent = __decorate([
        core_1.Component({
            selector: 'app-project',
            templateUrl: './project.component.html',
            styleUrls: ['./project.component.scss']
        })
    ], ProjectComponent);
    return ProjectComponent;
}());
exports.ProjectComponent = ProjectComponent;
