const terrInfo = document.getElementById("terrInfo")
const userData = document.getElementById("userData")
const worldInfo = document.getElementById("worldInfo")

function catchLogs(data) {

  switch (data.line[0]) {
    case '01': {
      const type = "지역 변경"
      const terrID = data.line[2]
      const terrName = data.line[3]

      terrInfo.innerHTML = `${terrName} (${terrID})`

      console.log (`${type} : ${terrName} (${terrID})`)
    }
    break
    case '02': {
      const type = "플레이어 정보 갱신"
      const id = data.line[2]
      const name = data.line[3]

      userData.innerHTML = `${name} (${id})`

      console.log (`${type} : ${name} (${id})`)
    }
    case '03': {
      const type = "새 객체 정보"
      const id = data.line[2] 
      const name = data.line[3]
      const npcNameID = data.line[9]
      const currHP = data.line[11]
      const maxHP = data.line[12]
      const logX = data.line[17]
      const logY = data.line[18]
      const logZ = data.line[19]
      const radius = data.line[20]
    }
    break
    case '04': {
      const type = "객체 정보 삭제"
      const id = data.line[2]
      const name = data.line[3]
      const npcNameID = data.line[9]
      const currHP = data.line[11]
      const maxHP = data.line[12]
      const logX = data.line[17]
      const logY = data.line[18]
      const logZ = data.line[19]
      const radius = data.line[20]
    }
    break
    case '261': {
      const type = "메모리 객체 값"
      const status = data.line[2]
      const id = data.line[3]
      const currWorldID = data[data.indexOf('CurrentWorldID') + 1]
      const name = data[data.indexOf('Name') + 1]
      const bnpcNameID = data[data.indexOf('BnpcNameID') + 1]

      if (status === 'Add' && name === '백측' && id === '10135A95') {
        userData.innerHTML = `${name} (${id})`
        worldInfo.innerHTML = `[${currWorldID}]`
      }
    }
    break
    default: return
  }

}

addOverlayListener('LogLine', catchLogs); // 등록
startOverlayEvents()