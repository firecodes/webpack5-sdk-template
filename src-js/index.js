
import { example } from '@/js/example'
const heading = document.createElement('h1')
heading.textContent = example()
const imageBackground = document.createElement('div')
imageBackground.classList.add('image')
const app = document.querySelector('#root')
app.append(heading, imageBackground)

export function a(name) {
  const temp = `Hello, ${name}!`;
  return temp;
}
export function b(name) {
  const temp = `Later, ${name}!`;
  return temp;
}

export const addArray = arr => {
  const result = arr.reduce((a, b) => a + b, 0);
  return result;
};

console.log("ssssssssssssss")

import io from 'socket.io-client';
const socket = io('http://127.0.0.1:3001');
socket.on('message', data => {
  console.log(data)
});

socket.emit('send', 'hello everybody');
socket.emit('message', { id: '1', txt: 'hello' });
socket.on('send', data => {
  console.log(data);
});
//回调函数
/*** 服务端 **/
socket.on('sayit', (word, callback) => {
  callback('say ' + word);
});

/*** 客户端 **/
socket.emit('sayit', 'wow', data => {
  console.log(data); // say wow
});

import * as mediasoupClient from "mediasoup-client";
// import debug from 'debug';
// export default typescript;
export default mediasoupClient;
