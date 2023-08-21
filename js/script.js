const terrInfo = document.getElementById("terrInfo")
const userData = document.getElementById("userData")
const worldInfo = document.getElementById("worldInfo")

function catchLogs(data) {
  const logLine = data.line

  switch (logLine[0]) {
    case '01': {
      const type = "지역 변경"
      const terrID = logLine[2]
      const terrName = logLine[3]

      terrInfo.innerHTML = `${terrName} (${terrID})`

      console.log (`${type} : ${terrName} (${terrID})`)
    }
    break
    case '02': {
      const type = "플레이어 정보 갱신"
      const id = logLine[2]
      const name = logLine[3]

      userData.innerHTML = `${name} (${id})`

      console.log (`${type} : ${name} (${id})`)
    }
    case '03': {
      const type = "새 객체 정보"
      const id = logLine[2] 
      const name = logLine[3]
      const npcNameID = logLine[9]
      const currHP = logLine[11]
      const maxHP = logLine[12]
      const logX = logLine[17]
      const logY = logLine[18]
      const logZ = logLine[19]
      const radius = logLine[20]
      return
    }
    break
    case '04': {
      const type = "객체 정보 삭제"
      const id = logLine[2]
      const name = logLine[3]
      const npcNameID = logLine[9]
      const currHP = logLine[11]
      const maxHP = logLine[12]
      const logX = logLine[17]
      const logY = logLine[18]
      const logZ = logLine[19]
      const radius = logLine[20]
      return
    }
    break
    case '261': {
      const type = "메모리 객체 값"
      const status = logLine[2]
      const id = logLine[3]
      const currWorldID = logLine[logLine.indexOf('CurrentWorldID') + 1]
      const name = logLine[logLineindexOf('Name') + 1]
      const bnpcNameID = logLine[logLine.indexOf('BnpcNameID') + 1]

      if (status === 'Add' && name === '백측' && id === '10135A95') {
        userData.innerHTML = `${name} (${id})`
        worldInfo.innerHTML = `[${currWorldID}]`
      } else {return}
    }
    break
    default: return
  }

}

addOverlayListener('LogLine', catchLogs); // 등록
startOverlayEvents()
