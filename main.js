let user1 = new RTCPeerConnection(), user2 = new RTCPeerConnection()
let error = msg => console.log(msg)
/*
// get room name
let queryString = window.location.search
let urlParams = new URLSearchParams(queryString)
let roomId = urlParams.get('room')
if(!roomId){
  window.location = 'lobby.html'
}
*/
navigator.mediaDevices.getUserMedia({ video: true, audio: true })
  .then(stream => user1.addStream(video1.srcObject = stream))
  .catch(error)

let add = (user, candidate) => candidate && user.addIceCandidate(candidate).catch(error)
user1.onicecandidate = e => add(user2, e.candidate)
user2.onicecandidate = e => add(user1, e.candidate)

user2.onaddstream = e => video2.srcObject = e.stream;
user1.onnegotiationneeded = e =>
user1.createOffer().then(d => user1.setLocalDescription(d))
  .then(() => user2.setRemoteDescription(user1.localDescription))
  .then(() => user2.createAnswer()).then(d => user2.setLocalDescription(d))
  .then(() => user1.setRemoteDescription(user2.localDescription))
  .catch(error)

  let pause = () => video1.srcObject.getTracks().forEach(track => track.enabled = !track.enabled)
  let endCall = () => {user1.close(); user2.close(); }// window.location='lobby.html'}