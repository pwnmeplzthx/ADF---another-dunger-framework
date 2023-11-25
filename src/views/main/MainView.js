import { AbstractView } from "../../common/AbstractView.js"
import onChange from 'on-change'
import { Header } from "../../components/header/header.js";
import { Search } from "../../components/search/search.js";
import { CardList } from "../../components/card-list/card-list.js";

export class MainView extends AbstractView {
    state = {
        list: [],
		numFound: 0,
        isLoading: false,
        searchQuery: undefined,
        offSet: 0,
    };

    constructor(appState) {
        super();
        this.appState = appState;
        // бинд контекста this.useAppState.bind(this)
        this.appState = onChange(this.appState, this.useAppState.bind(this))
        this.state = onChange(this.state, this.useState.bind(this))
        this.setTitle('Поиск книг');
    }

    destroy() {
        onChange.unsubscribe(this.appState);
        onChange.unsubscribe(this.state);
    }

    useAppState(path) {
        if (path === 'favorites') {
            this.render();
        }
    }

    async useState(path) {
        if (path === 'searchQuery') {
            this.state.isLoading = true;
            const data = await this.loadList(this.state.searchQuery, this.state.offSet);
            this.state.numFound = data.numFound;
            this.state.list = data.docs;
            this.state.isLoading = false;
        }

        if (path === 'list' || path === 'isLoading') {
			this.render();
		}
    }

    async loadList(q, offset) {
		const res = await fetch(`https://openlibrary.org/search.json?q=${q}&offset=${offset}`);
		return res.json();
	}

    render() {
        const main = document.createElement('div');
        main.innerHTML = `
			<h1>Найдено книг – ${this.state.numFound}</h1>
		`
        main.append(new Search(this.state).render())
        main.append(new CardList(this.appState, this.state).render());
        this.app.innerHTML = '';
        this.app.append(main);
        this.renderHeader();
    }

    renderHeader() {
        const header = new Header(this.appState).render();
        this.app.prepend(header);
    }
}