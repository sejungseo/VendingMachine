class BookGenerator {
  constructor() {
    this.bookList = document.querySelector('.book-list');
  }

  // 책 객체 초기화
  async setup() {
    const response = await this.loadData();
    this.bookFactory(response);
  }

  // 책 관련 데이터 로드
  async loadData() {
    try {
      const response = await fetch('./books.json');

      if(!response.ok) {
        throw new Error('HTTP ERROR! :' + response.status);
      }
      return await response.json();
    } catch(error) {
      console.error('책 데이터를 로딩하는 중에 문제가 발생했습니다. :' + error);
    }
  }

  // 책 템플릿 코드
  bookFactory(data) {
    const docFrag = new DocumentFragment();
    data.forEach((el) => {
      const item = document.createElement('li');
      const formattedPrice = new Intl.NumberFormat().format(el.price);
      const itemTemplate = `
      <button type="button" class="btn-book" data-book="${el.title}" data-count="${el.count}" data-price="${el.price}" data-img="${el.img}">
        <img src="./img/${el.img}" alt="${el.title}">
        <span class="book-name">${el.title}</span>
        <span class="writer-name">${el.writer}</span>
        <strong class="book-price">${formattedPrice}원</strong>
      </button>
      `
      item.innerHTML = itemTemplate;
      docFrag.append(item);
    });

    this.bookList.append(docFrag);
  }
}

export default BookGenerator;