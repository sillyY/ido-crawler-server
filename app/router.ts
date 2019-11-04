import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/search', controller.book.search)
    .get('/chapter', controller.book.getChapter)
    .get('/content', controller.book.getContent)
};
