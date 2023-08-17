let log = "03|2023-08-17T04:03:11.2780000+09:00|10135A95|백측|16|52|0000|81C|KrChocobo|0|0|34708|34708|10000|10000|||766.91|-28.69|22.60|-1.57|99a7dbaee76c427a"

addOverlayListener('CombatData', (data) => {
  console.log(`Encounter: ${data.title} | ${data.duration} | Total DPS: ${data.ENCDPS}`);
})

function reportLogs () {
  let splitLog = log.split ('|')
  let date = Utilities.formatDate(new Date(splitLog[1]), "GMT+9" , "YYYY-MM-dd HH:mm:ss.SSS")


  switch(splitLog[0]) {
    case "01" :
      let type = splitLog[0]
    break
    case "02" : {
      let type = splitLog[0]
      let charId = splitLog[2]
      let name = splitLog[3]
    }
    break
    case "03" : {
      let type = splitLog[0]
      let name = splitLog[3]
      let bnpcId = splitLog[9]
      let currHp = splitLog[11]
      let maxHp = splitLog[12]
      let logX = splitLog[17]
      let logY = splitLog[18]
      let logZ = splitLog[19]
      let radius = splitLog[20] 

     posCalc(logX, logY, logZ)
     currHPPer = maxHP/currHp * 100

     Consle.log(`[${date}] Add: <${name}> (${bnpcId}) ${currHp}/${maxHp} (${currHPPer}%) (X:${posX}, Y:${posY}. Z:${posZ}) `)
    }
    break
    case "04" : {
      let type = splitLog[0]
      let name = splitLog[3]
      let bnpcId = splitLog[9]
      let currHp = splitLog[11]
      let maxHp = splitLog[12]
      let logX = splitLog[17]
      let logY = splitLog[18]
      let logZ = splitLog[19]
      let radius = splitLog[20]

     posCalc(logX, logY, logZ)
     currHPPer = maxHP/currHp * 100

     Consle.log(`[${date}] Remove: <${name}> (${bnpcId}) ${currHp}/${maxHp} (${currHPPer}%) (X:${posX}, Y:${posY}. Z:${posZ}) `)
    }

    break
    case "25" : {
      let type = splitLog[0]
    }
    break
    case "258" : {
      let type = splitLog[0]
      let category = splitLog[2]
      let fateId = splitLog[5]
    }
    break
    case "261" : {
      let type = splitLog[0]
      let charId = splitLog[3]
      let currWorldId = krWorldName(splitLog[9])
      let name = splitLog[23]
      let logX = splitLog[27]
      let logY = splitLog[29]
      let logZ = splitLog[31]
      let heading = splitLog[33]
      let myWorldId = krWorldName(splitLog[37])

      posCalc(logX, logY, logZ)

      Consle.log(`[${date}] 현재 서버:${currWorldId} 닉네임@서버: ${name}@${myWorldId} (ID: ${charId}) (X:${posX}, Y:${posY}. Z:${posZ})`)
    }
    break
    default : "Error"
    break
  }
}

function posCalc(logX, logY, logZ) {
  
  let sizeFactor = 100
  let offsetX = 0
  let offsetY = 0

  let size = (4096 / sizeFactor) + 1
  let offset = (size / 2) + 0.5

  return (
    posX = Math.floor(((logX + offsetX) / 50 + offset) * 100) / 100,
    posY = Math.floor(((logY + offsetY) / 50 + offset) * 100) / 100,
    posZ = Math.floor(((logZ / 2 + 0.5) / 50) * 100) / 100
  )
}

function krWorldName(ids) {
  switch(ids) {
    case "2075" : 
      return "카벙클"
    break
    case "2076" :
      return "초코보"
    break
    case "2077" :
      return "모그리"
    break
    case "2078" :
      return "톤베리"
    break
    case "2080" :
      return "펜리르"
    break
  }
}

function eoWheather(Date , ) {

  var unixSeconds = parseInt(Date.getTime() / 1000)
  var bell = unixSeconds / 175

  var increment = (bell + 8 - (bell % 8)) % 24

  var totalDays = unixSeconds / 4200
  totalDays = (totalDays << 32) >>> 0

  var calcBase = totalDays * 100 + increment

  var step1 = (calcBase << 11) ^ calcBase
  var step2 = (step1 >>> 8) ^ step1

  return step2 % 100
}