function catchLogs(data) {
  console.log (data.line)

  try {
    switch (data.line[0]) {
      case '01': {
        const type = "지역 변경"
        const terrID = data.line[3]
        const terrName = data.line[4]

        console.log (`${type} : ${terrName} (${terrID})`)
      }
      break
      case '02': {
        const type = "플레이어 정보 갱신"
        const id = data.line[2]
        const name = data.line[3]

        console.log (`${type} : ${name} (${id})`)
      }
      default:
        return
    }
  }catch (error)
  console.log (error)
  throw error
}

addOverlayListener('LogLine', catchLogs); // 등록
startOverlayEvents()
