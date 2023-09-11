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

export const setIdentity = (iss:string, acr:string, sub:string) => {
  window.lpTag.identities.push(identityFn)

  function identityFn(callback:any) {
    callback({
      iss: iss,
      acr: acr,
      sub: sub
    })

  }

}

