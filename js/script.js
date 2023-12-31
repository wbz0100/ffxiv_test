const terrInfo = document.getElementById("terrInfo")
const userData = document.getElementById("userData")
const worldInfo = document.getElementById("worldInfo")

const TerritoryDATA = JSON.parse(JSON.stringify(TerritoryData))
const huntDATA = JSON.parse(JSON.stringify(HuntData))

let currWorld = worldInfo.textContent
let currUser = '--'
let currUserID = '--'

function catchLogs (data) {
  const logLine = data.line

  switch (logLine[0]) {
    case '01': {
      const type = "지역 변경"
      const territoryID = parseInt(logLine[2], 16)
      const territoryName = logLine[3]

      const terrData = terrdataload (territoryID)
      
      if (terrData) {
      terrInfo.textContent = `${terrData[0]} (${territoryID} Offset(X:${terrData[2]} Y:${terrData[3]} Z:${terrData[4]}) Map:${terrData[5]} WeatherRate:${terrData[6]})`
      console.log (`${type} : ${terrData[0]} (${territoryID}) - json 파싱 오류 없음`)
      }
      else {
        terrInfo.textContent = `${territoryName} (${territoryID})`
        console.log (`${type} : ${territoryName} (${territoryID})`)
      }
    }
    break
    case '02': {
      const type = "플레이어 정보 갱신"
      const id = logLine[2  ]
      const name = logLine[3]

      userData.textContent = `${name} (${id})`

      console.log (`${type} : ${name} (${id})`)
      return currUser = name, currUserID = id
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
      const name = logLine[logLine.indexOf('Name') + 1]
      const bnpcNameID = logLine[logLine.indexOf('BnpcNameID') + 1]
      const worldName = serverNameIndex (currWorldID)

      if (status === 'Add' && name == currUser && id == currUserID) {
        userData.textContent = `${name} (${id})`
        worldInfo.textContent = `${worldName}`
      } else {return}
    }
    break
    default: return
  }

}

function serverNameIndex (worldID) {
  try {
    if (worldID === '2075') {
      serverName = '카벙클'
    }
    else if (worldID === '2076') {
      serverName = '초코보'
    }
    else if (worldID === '2077') {
      serverName = '모그리'
    }
    else if (worldID === '2078') {
      serverName = '톤베리'
    }
    else if (worldID === '2080') {
      serverName = '펜리르'
    }
    return serverName
  } catch (error) {
    serverName = 'Unknown'
    return serverName
  }
}

function terrdataload (terrid) {
  let terrNum = Number(terrid)
  let territoryData = null

  try {
    const terrName = TerritoryDATA[0][terrNum]["placeName"]["ko"]
    const terrSize = TerritoryDATA[0][terrNum]["sizeFactor"]
    const terrOffsetX = TerritoryDATA[0][terrNum]["offsetX"]
    const terrOffsetY = TerritoryDATA[0][terrNum]["offsetY"]
    const terrOffsetZ = TerritoryDATA[0][terrNum]["offsetZ"]
    const trrMap = TerritoryDATA[0][terrNum]["map"]
    const weaRate = TerritoryDATA[0][terrNum]["weatherRate"]
    territoryData = [terrName,terrSize,terrOffsetX,terrOffsetY,terrOffsetZ,trrMap,weaRate]
  } catch (error) {
    territoryData = null
  }

  return territoryData
}

addOverlayListener('LogLine', catchLogs); // 등록
startOverlayEvents()