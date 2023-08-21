function catchLogs(data) {

  try {
      switch (data.line[0]) {
        '01': {
          const type = data.line[0]
          const time = data.line[1]
          const terrID = data.line[2]
          const terrName = data.line[3]
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
  console.log (`지역 변경 : ${terrName} (${terrID})`)
}

addOverlayListener('LogLine', catchLogs); // 등록
startOverlayEvents()
