import View from "./View.js";
import icons from "url:../../img/icons.svg";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn--inline");
      if (!btn) return;
      const goToPage = +btn.dataset.goto; //+ transforma a numero

      handler(goToPage);
    });
  }
  _generateMarkup() {
    const curPage = this._data.page;
    const numPAges = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    //First scenario, page 1 and there are more pages
    if (curPage === 1 && numPAges > 1) {
      return `
        <button data-goto="${
          curPage + 1
        }" class="btn--inline pagination__btn--next">
            <span>${curPage + 1}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
      `;
    }

    //second scenario, last page
    if (curPage === numPAges && numPAges > 1) {
      return `
      <button data-goto="${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
            <use href="${icons}}#icon-arrow-left"></use>
        </svg>
        <span>${curPage - 1}</span>
    </button>
      `;
    }
    //third...in between pages
    if (curPage < numPAges) {
      return `
        <button data-goto="${
          curPage - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="${icons}}#icon-arrow-left"></use>
            </svg>
            <span>${curPage - 1}</span>
        </button>
        <button data-goto="${
          curPage + 1
        }" class="btn--inline pagination__btn--next">
            <span>${curPage + 1}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
      `;
    }
    //last...page one a non more pages
    return;
  }
}

export default new PaginationView();
