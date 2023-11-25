import { DivComponent } from '../../common/DivComponent';
import { Card } from '../card/card';
import './card-list.css';

export class CardList extends DivComponent {
	constructor(appState, parentState) {
		super();
		this.appState = appState;
		this.parentState = parentState;
	}

	render() {
		if (this.parentState.isLoading) {
			this.el.innerHTML = `<div class="card-list__loader">Загрузка...</div>`;
			return this.el;
		}
		const cardGrid = document.createElement('div');
		cardGrid.classList.add('card-grid');
		this.el.append(cardGrid);
		for (const card of this.parentState.list) {
			cardGrid.append(new Card(this.appState, card).render());
		}
		return this.el;
	}
}