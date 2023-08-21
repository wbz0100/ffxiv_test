function catchLogs(data) {
  console.log (data.line)

  try {
    switch (data.line[0]) {
      case "01": {
        const type = "지역 변경"
        const terrID = data.line[3]
        const terrName = data.line[4]
      }
      console.log (`${type} : ${terrName} (${terrID})`)
      break
      default:
      break
    }
  }catch (error)
  console.log (error)
  throw error
}

addOverlayListener('LogLine', catchLogs); // 등록
startOverlayEvents()
