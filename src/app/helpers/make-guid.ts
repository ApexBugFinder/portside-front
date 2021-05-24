import { Guid } from 'guid-typescript';

export class MakeGuid {
    public id: Guid;
    constructor() {
        this.id = Guid.create();
    }
}
