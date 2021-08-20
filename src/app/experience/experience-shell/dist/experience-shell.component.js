"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ExperienceShellComponent = exports.dataArray = void 0;
var core_1 = require("@angular/core");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
// NGRX
var store_1 = require("@ngrx/store");
var edit_modal_shell_component_1 = require("../editModal/edit-modal-shell/edit-modal-shell.component");
var fromExperienceShell = require("./state/");
exports.dataArray = {
    id: 'D8D32EA4-5F9D-4BE9-9535-AB69C3F0A112',
    username: 'SeedUser',
    projects: [
        {
            id: 'E8885DC5-998B-48DF-86B7-536EDEA56BD5',
            projectName: 'SeedProject',
            projectCreatorID: 'D8D32EA4-5F9D-4BE9-9535-AB69C3F0A112',
            description: 'Nice Seed if I do say so myself',
            started: '0001-01-01T00:00:00',
            completed: '0001-01-01T00:00:00',
            banner: '../../../assets/images/pngs/techDoc_banner_large.png',
            smallBanner: '../../../assets/images/pngs/banner_techDoc.png',
            published: false,
            projectRequirements: [
                {
                    id: '8406BB4C-FD6C-4222-BDF5-E5C33E133CC4',
                    projectID: 'E8885DC5-998B-48DF-86B7-536EDEA56BD5',
                    editState: 'ok',
                    requirement: 'Seed Requirement'
                },
            ],
            projectLinks: [
                {
                    id: '7533CE16-DAC6-4C2A-9CE2-14E5DFD7334C',
                    link: 'seed.com',
                    projectID: 'E8885DC5-998B-48DF-86B7-536EDEA56BD5',
                    service: 'SeedService'
                },
            ],
            projectHistory: []
        },
    ],
    experiences: [
        {
            id: '621C8318-DCFE-4050-A7F5-8D96EDF2BB54',
            projectCreatorID: 'D8D32EA4-5F9D-4BE9-9535-AB69C3F0A112',
            company: 'Seed Company Inc.',
            title: 'Lead Seed',
            logoUrl: 'www.seed.com/seedLogo.svg',
            started: '2021-04-13T00:00:00',
            completed: '2021-04-14T00:00:00',
            city: 'Seed City',
            state: 'Little Seed',
            roles: [
                {
                    id: '3E8D96C2-0A34-4A60-A0FD-F4AECD75D823',
                    experienceID: '621C8318-DCFE-4050-A7F5-8D96EDF2BB54',
                    myTitle: 'Seed 1',
                    myRole: 'Did a lot of Seeding',
                    editState: 'ok'
                },
                {
                    id: '6341988b-2227-41da-a368-d86d9d87782c',
                    experienceID: '621C8318-DCFE-4050-A7F5-8D96EDF2BB54',
                    myTitle: 'Seed 2',
                    myRole: 'Did a lot of Seeding',
                    editState: 'ok'
                },
                {
                    id: '68938fd5-e11a-40c3-928d-fcb1ac1958af',
                    experienceID: '621C8318-DCFE-4050-A7F5-8D96EDF2BB54',
                    myTitle: 'Seed 3',
                    myRole: 'Did a lot of Seeding',
                    editState: 'ok'
                },
            ]
        },
    ],
    degrees: [
        {
            id: '027FFB78-CEA4-4AA3-8DDC-F9A280FEEE2C',
            degreeType: 'MS',
            projectCreatorID: 'D8D32EA4-5F9D-4BE9-9535-AB69C3F0A112',
            degreeName: 'Seed Science',
            minors: 'Seed Culture',
            institution: 'Seed University',
            city: 'Seed City',
            state: 'Seedy',
            graduated: true,
            graduationYear: '0001-01-01T00:00:00.0000287'
        },
    ],
    certifications: [
        {
            id: '2F72FA2B-C7DE-4DF3-ABAA-5BE1BC1DA233',
            projectCreatorID: 'D8D32EA4-5F9D-4BE9-9535-AB69C3F0A112',
            certName: 'Seed Certification',
            isActive: true,
            certID: '3A6B2A7A-DA8A-4ECE-B84B-ADC36825A55C',
            issuingBody_Name: 'Seed Associates',
            issuingBody_Logo: 'www.seed.com/seed_logo.svg'
        },
    ],
    userPicUrl: 'https://firebasestorage.googleapis.com/v0/b/portfolio-a7105.appspot.com/o/users%2FD8D32EA4-5F9D-4BE9-9535-AB69C3F0A112%2FUser%2FD8D32EA4-5F9D-4BE9-9535-AB69C3F0A112%2FProfile%20Image?alt=media&token=2735080c-a9c6-4bfb-b559-cd8e950cd4c9'
};
var ExperienceShellComponent = /** @class */ (function () {
    function ExperienceShellComponent(experienceShellStore, renderer, experienceDataStore, dialog) {
        this.experienceShellStore = experienceShellStore;
        this.renderer = renderer;
        this.experienceDataStore = experienceDataStore;
        this.dialog = dialog;
        this.editIcon = free_solid_svg_icons_1.faPencilAlt;
        this.currentExperience$ = this.experienceShellStore.pipe(store_1.select(fromExperienceShell.getCurrentExperience));
        this.currentExperience = exports.dataArray.experiences.
        ;
    }
    ExperienceShellComponent.prototype.ngOnInit = function () {
    };
    ExperienceShellComponent.prototype.editExperience = function () {
        var dialogRef = this.dialog.open(edit_modal_shell_component_1.EditModalShellComponent, {
            width: '980px',
            panelClass: 'custom-modalbox'
        });
    };
    ExperienceShellComponent = __decorate([
        core_1.Component({
            selector: 'app-experience-shell',
            templateUrl: './experience-shell.component.html',
            styleUrls: ['./experience-shell.component.scss']
        })
    ], ExperienceShellComponent);
    return ExperienceShellComponent;
}());
exports.ExperienceShellComponent = ExperienceShellComponent;
