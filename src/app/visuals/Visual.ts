import { VisualStrategy } from './VisualStrategy';

export class Visual {

    public name: string;
    public visualStrategy: VisualStrategy;

    constructor(name: string, visualStrategy: VisualStrategy) {
        this.name = name;
        this.visualStrategy = visualStrategy;
    }

}