class BookGenerator {
  constructor() {
    this.bookList = document.querySelector('.book-list');
    this.currentPage = 1; // 현재 페이지 번호
    this.booksPerPage = 6; // 페이지당 표시할 책의 수
  }

  // 클래스 초기화
  async setup() {
    // 책 데이터 로드
    const response = await this.loadData();
    // 책 목록 생성 및 페이지네이션 설정
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
      this.totalBooks = data.length; // 총 책의 수 저장 => 페이지네이션 계산에 사용
      return data;
    } catch(error) {
      console.error('책 데이터를 로딩하는 중에 문제가 발생했습니다. :' + error);
    }
  }

  
  // 페이지네이션을 위한 메서드
  paginateBooks(data) {
    const startIdx = (this.currentPage - 1) * this.booksPerPage; // 현재 페이지의 시작 인덱스
    const endIdx = startIdx + this.booksPerPage; // 현재 페이지의 종료 인덱스
    return data.slice(startIdx, endIdx);
  }

  // 책 목록 업데이트 메서드
  async updateBookList() {
    const data = await this.loadData(); // 책 데이터 다시 로드
    const paginatedData = this.paginateBooks(data); // 현재 페이지에 맞는 데이터로 책 목록 생성
    this.bookFactory(paginatedData);
  }

  // 책 템플릿 코드
  bookFactory(data) {
    this.bookList.innerHTML = '';
    // 새로운 책 목록을 담을 DocumentFragment 생성
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