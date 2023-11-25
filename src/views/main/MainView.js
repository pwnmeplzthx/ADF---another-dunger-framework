import { AbstractView } from "../../common/AbstractView.js"
import onChange from 'on-change'

export class MainView extends AbstractView {
    state = {
        list: [],
        isLoading: false,
        searchQuery: undefined,
        offSet: 0,
    };

    constructor(appState) {
        super();
        this.appState = appState;
        // бинд контекста this.useAppState.bind(this)
        this.appState = onChange(this.appState, this.useAppState.bind(this))
        this.setTitle('Поиск книг');
    }

    useAppState(path) {
        console.log(path);
        if (path === 'favorites') {
            this.render();
        }
    }

    render() {
        const main = document.createElement('div');
        main.innerHTML = `Число книг: ${this.appState.favorites.length}`;
        this.app.innerHTML = '';
        this.app.append(main);
    }
}