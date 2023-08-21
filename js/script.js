function catchLogs(data) {
  console.log (data.line)
}

addOverlayListener('LogLine', catchLogs); // 등록
startOverlayEvents()
