import { AbstractView } from "../../common/AbstractView.js"

export class MainView extends AbstractView {
    constructor() {
        super();
        this.setTitle('Поиск книг');
    }

    render() {
        const main = document.createElement('div');
        main.innerHTML = 'test';
        this.app.innerHTML = '';
        this.app.append(main);
    }
}