let tempElement = $('#temps')
let deviceElements = {};

var socket = io('http://192.168.0.99:3000');
socket.on('connect', function(){
  socket.emit('subscribe', 'liveTemp');
});

socket.on('log', (data) => console.log(data))

socket.on('liveTemp', processLiveTemp);
socket.on('disconnect', function(){
  console.log('Disconnected from brew device registry')
});

function processLiveTemp(tempData) {
  let device = deviceElements['device-' + tempData.deviceId];
  if (device == undefined) {
    device = createNewDeviceElement(tempData.deviceId);
  }

  device.find('.temp').text(tempData.temp)

  console.log(tempData);
}

function createNewDeviceElement(deviceId) {
  let el = $(`
    <div id="${deviceId}" class="card text-center" style="width: 15rem;">
      <div class="card-header">
        Device: ${deviceId}
      </div>
      <div class="card-body">
        <div class="temp"></div>
      </div>
    </div>`);
  deviceElements['device-' + deviceId] = el;
  tempElement.append(el);
  return el;
}