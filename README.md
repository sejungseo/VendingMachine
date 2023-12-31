# 🔍VendingMachine_Book Bites

📖 배포 페이지: https://sejungseo.github.io/VendingMachine/

<img width="50%" alt="Group 11" src="https://github.com/sejungseo/VendingMachine/assets/125885922/a8a95aa9-cd34-42af-b014-f7febce76866">

## 개요
- 이 프로젝트는 책을 자판기로 구매할 수 있는 미니 프로젝트입니다.
- 사용자는 책을 탐색하고, 선택하여 구매할 수 있습니다.
- 멋쟁이사자처럼 프론트엔드 7기 수업의 벤딩머신 과제를 바탕으로, 책 구매라는 새로운 주제로 재구성되었습니다.

## 개발 툴
- 사용된 기술: HTML / CSS / JavaScript
- 디자인 툴: Figma

## 프로젝트 목표
- 기존의 벤딩머신 과제를 기반으로 새로운 주제에 맞게 변형하여 재구현했습니다.
- 데이터 처리 로직을 간결하고 모듈화된 함수로 작성해 복잡성을 최소화하고 유지보수 시간을 단축합니다.
- 웹페이지 내에서 책 선택, 장바구니 관리, 잔액 관리 및 구매 기능을 제공합니다.
- 모든 기기에서 일관된 사용자 경험을 제공하기 위해 PC와 모바일 화면 크기에 맞는 반응형 웹 디자인을 적용합니다.
- 자바스크립트의 기본기를 강화하기 위해 이 프로젝트를 진행했습니다.

## 주요 기능
- **비동기적 책 데이터 로딩**: 책 데이터를 비동기적으로 불러와 표시합니다.
- **페이지네이션**: 페이지네이션 기능을 통해 책 목록을 페이지별로 탐색할 수 있습니다.
- **장바구니 기능**: 책을 선택하여 장바구니에 추가하고, 필요에 따라 장바구니에서 제거할 수 있습니다
- **재고 관리**: 책의 재고가 없을 경우 품절이 표시되며, 선택할 수 없습니다.
- **금액 관리**: 입금 및 거스름돈 반환 기능을 통해 잔액 관리가 가능합니다.
- **구매 제한**: 잔액이 부족할 경우 추가 구매는 불가능합니다.
- **구매 프로세스**: 구매하기 버튼을 클릭 시, 장바구니에서 구매한 책 목록으로 이동합니다.

## 스크린샷

|페이지 이동 기능|선택 및 취소 기능|
|:---:|:---:|
| ![페이지이동](https://github.com/sejungseo/VendingMachine/assets/125885922/be79b9d3-5b39-4cba-a08b-bfe43b6f4df8)|![선택기능](https://github.com/sejungseo/VendingMachine/assets/125885922/64cbf61b-ffb2-43cf-a78c-797e6d37bb27)|

|계산 기능|구매 기능|
|:---:|:---:|
|![계산기능](https://github.com/sejungseo/VendingMachine/assets/125885922/82a0ad9f-8b83-4941-b5af-e77eea3f1b97)|![구매기능](https://github.com/sejungseo/VendingMachine/assets/125885922/077ac14f-4321-45e6-b0a4-ee1fd51ef485)|

|반응형|
|:---:|
|<img width="50%" src="https://github.com/sejungseo/VendingMachine/assets/125885922/95f0fed7-f237-4898-89a1-a81e0b8bc6ed"/>|

## 트러블 슈팅
#### 페이지 이동 버튼 클릭 후 책 선택 시 장바구니에 추가되지 않는 이슈 발생
- **원인**: 초기 페이지 로드 시에만 이벤트 리스너가 책 버튼들에 추가되고, 페이지네이션을 통해 새 페이지가 로드될 때 책 버튼들에는 클릭 이벤트 리스너가 없어서 클릭에 반응하지 않았습니다. 
- **해결**:
  - 'BookStoreFunc' 클래스 내 'bookList'요소에 이벤트 위임을 적용해 상위 요소에 이벤트 리스너를 한 번만 추가하도록 했습니다.
  - 이벤트가 발생했을 때 타겟이 책 버튼인지 확인 후 작동하도록 수정했습니다.
  - 새로운 책 목록이 로드될 때마다 개별 버튼에 이벤트 리스너를 추가할 필요가 없어졌습니다.

## 보완해야 할 점
- 베스트셀러 오픈 api를 활용해 책 목록 불러오기
- 책 정보 나타낼 수 있는 방법 고려해 적용하기

## 느낀점
- 처음에 코드 분리 등 명확한 설계가 있어야 헤메지 않는다는 것을 체감했습니다.
- 섹션을 정렬하고 배치할 때는 flex보다 grid가 더 효율적임을 경험했습니다.
- 클래스 문법을 통해 데이터와 메서드를 묶어 코드의 재사용성과 유지보수를 용이하게 만들 수 있는 장점을 알게 되었습니다.
- 코드의 구조화 및 가독성에 대한 중요성을 인식하고 관련 공부의 필요성을 느꼈습니다.
