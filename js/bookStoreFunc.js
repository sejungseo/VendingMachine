class BookStoreFunc {
  constructor() {
    const section1 = document.querySelector('.section1');
    this.bookList = section1.querySelector('.book-list'); // 책 목록
    this.balance = section1.querySelector('.bg-box p'); // 잔액
    this.btnReturn = section1.querySelector('.bg-box+.btn'); // 거스름돈 반환 버튼
    this.inputMoneyEl = section1.querySelector('#input-money'); // 입금액 입력
    this.btnDeposit = section1.querySelector('#input-money+.btn'); // 입금 버튼
    this.stagedList = section1.querySelector('.get-list'); // 장바구니 목록
    this.btnGetBooks = section1.querySelector('.btn-get'); // 구매하기 버튼
    
    const section2 = document.querySelector('.section2');
    this.myMoney = section2.querySelector('.bg-box p'); // 소지금

    const section3 = document.querySelector('.section3');
    this.getList = section3.querySelector('.get-list'); // 구매 목록
    this.txtTotal = section3.querySelector('.total-price'); // 총 금액
  }

  // 클래스의 초기 설정 위한 메서드
  // 이벤트 리스너 바인딩
  // 코드의 구조화 및 가독성 향상
  // 유지보수 및 확장 용이성
  setup() {
    this.bindEvents();
  }

  // 장바구니에 아이템 추가
  stagedItemGenerator(target) {
    const stagedItem = document.createElement('li'); // 새로운 리스트 아이템 생성
    stagedItem.dataset.item = target.dataset.item; // 책 이름
    stagedItem.dataset.img = target.dataset.img; // 책 이미지
    stagedItem.dataset.price = target.dataset.price; // 책 가격
    stagedItem.innerHTML = 
      `
        <img src="./img/${target.dataset.img}" alt="${target.dataset.item}">
        <div class="title-count-wrapper">
          <p>${target.dataset.item}</p>
          <strong>
            1
            <span class="a11y-hidden">권</span>
          </strong>
        </div>
      `;
    this.stagedList.append(stagedItem); // 아이템 장바구니 목록에 추가
  }

  // 이벤트 바인딩을 위한 메서드
  bindEvents() {
    /**
    1. 입금 버튼 이벤트 리스너
     * 소지금 === 소지금 - 입금액
     * 잔액 === 기존의 잔액 + 입금액
     * 입금액 > 소지금 => alert("소지금이 부족합니다.")
    */
    this.btnDeposit.addEventListener('click', () => {
      const inputMoney = parseInt(this.inputMoneyEl.value); // 사용자 입력값
      const myMoneyVal = parseInt(this.myMoney.textContent.replaceAll(',', '')); // 현재 소지금을 정수로 변환
      const balanceVal = parseInt(this.balance.textContent.replaceAll(',', '')); // 현재 자판기 잔액을 정수로 변환

      // 입금액이 있고, 소지금보다 적거나 같을 경우
      if(inputMoney && inputMoney > 0 && inputMoney <= myMoneyVal) {
        this.myMoney.textContent = new Intl.NumberFormat().format(myMoneyVal - inputMoney) + ' 원'; 
        this.balance.textContent = new Intl.NumberFormat().format((balanceVal ? balanceVal : 0) + inputMoney) + ' 원';
      } else {
        alert('소지금이 부족합니다.');
      }
      this.inputMoneyEl.value = null; // 입력값 초기화
      });

    /**
     * 2. 거스름돈 반환
     * 반환 버튼 누르면 소지금 === 소지금 + 잔액
     * 잔액 초기화
     */

    this.btnReturn.addEventListener('click', () => {
      const myMoneyVal = parseInt(this.myMoney.textContent.replaceAll(',', ''));
      const balanceVal = parseInt(this.balance.textContent.replaceAll(',',''));

      if(balanceVal) {
        this.myMoney.textContent = new Intl.NumberFormat().format(myMoneyVal + balanceVal) + ' 원';
        this.balance.textContent = '0 원';
      } 
    });

    /**
     * 3. 자판기 메뉴 기능
     * 책을 누르면 잔액 === 잔액 - 책 가격
     * 잔액 < 책 가격 => alert('잔액이 부족합니다.')
     * 구매할 책이 장바구니에 추가
     * 책의 data-count 값을 -1
     * 만약 책의 data-count 값이 0이라면 button 요소에 disabled 속성이 추가되고, 책 템플릿에 strong 태그 추가
     */

    // 페이지네이션에 대해서도 동작하도록 이벤트 위임 사용
    this.bookList.addEventListener('click', (e) => {
      const bookBtn = e.target.closest('.btn-book');
      if(!bookBtn) return; // 책 버튼이 아니면 함수 종료

      // 현재 잔액
      const balanceVal = parseInt(this.balance.textContent.replaceAll(',', ''));
      // 클릭한 책의 가격
      const targetElPrice = parseInt(bookBtn.dataset.price);
      const stagedListItem = this.stagedList.querySelectorAll('li');
      let isStaged = false;

      // 잔액이 선택한 책 가격보다 많거나 같은 경우
      if(balanceVal >= targetElPrice) {
        this.balance.textContent = new Intl.NumberFormat().format(balanceVal - targetElPrice) + ' 원';

        for(const item of stagedListItem) {
          // 선택한 책이 이미 장바구니에 있는 경우
          if(item.dataset.item === bookBtn.dataset.item) {
            const itemTxt = item.querySelector('strong');
            // 장바구니 책의 카운트 1 증가
            itemTxt.firstChild.textContent = parseInt(itemTxt.firstChild.textContent) + 1;
            isStaged = true;
            break;
          }
        }

        // 처음 선택한 책이라면 책을 장바구니에 담기
        if(!isStaged) {
          this.stagedItemGenerator(bookBtn);
        }

        bookBtn.dataset.count--;

        // 책의 카운트가 0인 경우
        if(parseInt(bookBtn.dataset.count) === 0) {
          // disabled 속성 추가 + strong 품절 태그 추가
          bookBtn.disabled = true;
          bookBtn.insertAdjacentHTML('afterbegin', '<strong class="soldout">품절</strong>')
        }
      } else {
        alert('잔액이 부족합니다. 돈을 더 입금해주세요.')
      }
    });

    // 장바구니에 있는 책을 클릭할 때의 이벤트 리스너
    this.stagedList.addEventListener('click', (e) => {
      const target = e.target.closest('li');
      if(!target) return;

      const bookName = target.dataset.item;
      const bookPrice = parseInt(target.dataset.price);
      const bookCountEl = target.querySelector('strong');
      let bookCount = parseInt(bookCountEl.firstChild.textContent);

      // 잔액 업데이트
      const balanceVal = parseInt(this.balance.textContent.replaceAll(',', ''));
      this.balance.textContent = new Intl.NumberFormat().format(balanceVal + bookPrice) + ' 원';

      // 책 수량 감소 또는 제거
      if(bookCount > 1) {
        // 책 수량이 1보다 많으면 수량 감소
        bookCountEl.firstChild.textContent = bookCount - 1;
      } else {
        // 책 수량이 1이면 리스트에서 제거
        target.remove();
      }

      // 해당 책 버튼의 데이터 카운트 증가 및 품절 해제
      const bookBtn = this.bookList.querySelector(`button[data-item='${bookName}']`);
      if(bookBtn) {
        let currentCount = parseInt(bookBtn.dataset.count) || 0;
        bookBtn.dataset.count = currentCount + 1;

        if(currentCount + 1 > 0) {
          bookBtn.removeAttribute('disabled');
          const soldoutTag = bookBtn.querySelector('.soldout');
          if(soldoutTag) soldoutTag.remove();
        }
      }
    });

    /**
     * 4. 구매하기 버튼 기능
     * 구매하기 버튼을 누르면 선택한 책 목록이 구매한 책 목록으로 이동
     * 구매한 책의 금액을 모두 합하여 총 금액 업데이트
     */
    this.btnGetBooks.addEventListener('click', () => {
      const itemStagedList = this.stagedList.querySelectorAll('li');
      const itemGetList = this.getList.querySelectorAll('li');
      let totalPrice = 0;

      for(const itemStaged of itemStagedList) {
        let isStaged = false; // 아이템이 구매 목록에 이미 있는지 확인하기 위함

        for(const itemGet of itemGetList) {
          // 장바구니의 책이 이미 구매 목록에 있다면
          if(itemStaged.dataset.item === itemGet.dataset.item) {
            const itemTxt = itemGet.querySelector('strong'); // 구매 목록의 책 수량
            // 구매 목록의 책 카운트를 선택한 수만큼 증가
            itemTxt.firstChild.textContent = parseInt(itemTxt.firstChild.textContent) + parseInt(itemStaged.querySelector('strong').firstChild.textContent);

            isStaged = true; // 아이템이 이미 구매 목록에 있을 경우
            break; // 반복문 종료
          }
        }

        // 아이템이 구매 목록에 없는 경우
        if(!isStaged) {
          this.getList.append(itemStaged);
        }
      }

      // 장바구니 목록 비우기
      this.stagedList.innerHTML = null;

      // 구매한 책 리스트를 순환하면서 총 금액 계산
      this.getList.querySelectorAll('li').forEach((itemGet) => {
        totalPrice += parseInt(itemGet.dataset.price) * parseInt(itemGet.querySelector('strong').firstChild.textContent);
      });

      this.txtTotal.textContent = `총 금액 : ${new Intl.NumberFormat().format(totalPrice)} 원`
    })
  }
}

export default BookStoreFunc;