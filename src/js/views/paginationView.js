import View from './views';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  curPage;

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }
  _generatemarkup() {
    this.curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultPerPage
    );

    if (this.curPage === 1 && numPages > 1) return this._generateNxtBtn();

    if (this.curPage < numPages) return this._generateBtn();

    if (this.curPage === numPages && numPages > 1)
      return this._generatePrevBtn();

    return '';
  }

  _generatePrevBtn() {
    return `
    <button data-goto="${
      this.curPage - 1
    }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
    <span>Page ${this.curPage - 1}</span>
    </button>
    `;
  }

  _generateNxtBtn() {
    return `
    <button data-goto="${
      this.curPage + 1
    }" class="btn--inline pagination__btn--next">
      <span>Page ${this.curPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>
    `;
  }

  _generateBtn() {
    return `
    <button data-goto="${
      this.curPage - 1
    }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
    <span>Page ${this.curPage - 1}</span>
    </button>
    <button data-goto="${
      this.curPage + 1
    }" class="btn--inline pagination__btn--next">
      <span>Page ${this.curPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>
    `;
  }
}

export default new PaginationView();
