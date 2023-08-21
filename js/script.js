function catchLogs(data) {

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

      const currHPPer = Math.floor((maxHP/currHP) * 100 *100) / 100

      console.log (`${type} : ${name} (${npcNameID}) HP: ${currHP}/${maxHP} (${currHPPer}%)`)
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

      const currHPPer = Math.floor((maxHP/currHP) * 100 *100) / 100

      console.log (`${type} : ${name} (${npcNameID}) HP: ${currHP}/${maxHP} (${currHPPer}%)`)
    }
    break
    default: return
  }

}

addOverlayListener('LogLine', catchLogs); // 등록
startOverlayEvents()
