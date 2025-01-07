import React, { useEffect, useRef, useState } from "react";
import Peer from "peerjs";
import { useSocket } from "../../";

const VideoCallComponent = ({ callerId, isCalling, onEndCall }) => {
  const myVideo = useRef();
  const userVideo = useRef();
  const [peer, setPeer] = useState(null);
  const socket = useSocket();

  useEffect(() => {
    const newPeer = new Peer();
    setPeer(newPeer);

    newPeer.on("open", (id) => {
      socket.emit("callUser", { callerId, peerId: id });
    });

    newPeer.on("call", (call) => {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          myVideo.current.srcObject = stream;
          call.answer(stream);
          call.on("stream", (userStream) => {
            userVideo.current.srcObject = userStream;
          });
        });
    });
  }, []);

  const endCall = () => {
    peer.disconnect();
    onEndCall();
  };

  return (
    <div>
      <h2>Video Call</h2>
      <button onClick={endCall}>End Call</button>
      <video ref={myVideo} autoPlay></video>
      <video ref={userVideo} autoPlay></video>
    </div>
  );
};

export default VideoCallComponent;
