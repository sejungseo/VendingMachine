class BookGenerator {
  constructor() {
    this.bookList = document.querySelector('.book-list');
    this.currentPage = 1;
    this.booksPerPage = 6;
  }

  // 책 객체 초기화
  async setup() {
    const response = await this.loadData();
    this.bookFactory(this.paginateBooks(response));
    this.setupPagination();
  }

  // 책 관련 데이터 로드
  async loadData() {
    try {
      const response = await fetch('./books.json');

      if(!response.ok) {
        throw new Error('HTTP ERROR! :' + response.status);
      }
      const data = await response.json();
      this.totalBooks = data.length; 
      return data;
    } catch(error) {
      console.error('책 데이터를 로딩하는 중에 문제가 발생했습니다. :' + error);
    }
  }

  
  // 페이지네이션을 위한 메서드
  paginateBooks(data) {
    const startIdx = (this.currentPage - 1) * this.booksPerPage;
    const endIdx = startIdx + this.booksPerPage;
    return data.slice(startIdx, endIdx);
  }

  // 책 목록 업데이트 메서드
  async updateBookList() {
    const data = await this.loadData();
    const paginatedData = this.paginateBooks(data);
    this.bookFactory(paginatedData);
  }

  // 책 템플릿 코드
  bookFactory(data) {
    this.bookList.innerHTML = '';
    const docFrag = new DocumentFragment();
    data.forEach((el) => {
      const item = document.createElement('li');
      const formattedPrice = new Intl.NumberFormat().format(el.price);
      const itemTemplate = `
      <button type="button" class="btn-book" data-item="${el.title}" data-count="${el.count}" data-price="${el.price}" data-img="${el.img}">
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


  // 좌우 화살표 버튼의 이벤트 핸들러
  setupPagination() {
    document.querySelector('.left-arrow').addEventListener('click', () => {
      if(this.currentPage > 1) {
        this.currentPage--;
        this.updateBookList();
      }
    });

    document.querySelector('.right-arrow').addEventListener('click', () => {
      const totalPage = Math.ceil(this.totalBooks / this.booksPerPage);
      if(this.currentPage < totalPage) {
        this.currentPage++;
        this.updateBookList();
      }
    });
  }
}

export default BookGenerator;