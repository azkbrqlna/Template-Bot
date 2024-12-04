async function handlerCall(sock, call) {
  try {
    await sock.rejectCall(call[0].id, call[0].from);
  } catch (err) {
    console.log(err);
  }
}

module.exports = handlerCall;
