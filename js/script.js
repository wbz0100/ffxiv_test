function catchLogs(data) {
  try {
      switch (data.line[0]) {
        '01': {
          const type = data.line[0]
          const time = data.line[1]
          const terrID = data.line[2]
        }
      break
      default:
        return
      break
    }
  } catch (error) {
    console.log (error)
    throw error
  }
}

addOverlayListener('LogLine', catchLogs); // 등록
startOverlayEvents()
