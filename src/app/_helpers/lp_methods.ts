declare global {
  interface Window {
    lpTag:any;
  }
}

export const setSection = (sectionArray:string[]) => {
  window.lpTag.newPage(document.URL, {
    section: sectionArray
  })
}
