function loadData(data) {
  console.log(data.line);
}

addOverlayListener('LogLine', loadData); // 등록
startOverlayEvents()
