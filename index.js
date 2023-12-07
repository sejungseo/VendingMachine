import BookGenerator from './js/bookGenerator.js';
import BookStoreFunc from './js/bookStoreFunc.js';

const bookGenerator = new BookGenerator();
await bookGenerator.setup();

const bookStoreFunc = new BookStoreFunc();
bookStoreFunc.setup();