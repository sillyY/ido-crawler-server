declare module C1Module {
    export interface Book {
      title?: String
      major?: String
      bookImg?: String
      author?: String
      link?: String
      bookIntro?: String
      update?: String
      latestChapter?: String
    }
  
    export interface Chapter {
      title: String
      href: String
    }
  }
  