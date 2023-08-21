function catchLogs(data) {
  try {
      switch (data.line[0]) {
        01: {
          const type = data.line[0]
          const time = data.line[1]
          const terrID = data.line[2]
        }
      break
      default : {
        return  
      }
      break
    }
  } catch (error) {
    console.log (error)
    throw error
  }
}

function storageAvailable(type) {
  var storage;
  try {
      storage = window[type];
      var x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
  }
  catch(e) {
      return e instanceof DOMException && (
          // everything except Firefox
          e.code === 22 ||
          // Firefox
          e.code === 1014 ||
          // test name field too, because code might not be present
          // everything except Firefox
          e.name === 'QuotaExceededError' ||
          // Firefox
          e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
          // acknowledge QuotaExceededError only if there's something already stored
          (storage && storage.length !== 0);
  }
}

addOverlayListener('LogLine', catchLogs); // 등록
startOverlayEvents()