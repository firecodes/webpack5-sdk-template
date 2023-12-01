// Test import of a JavaScript module
import { example } from '@/js/example'
// Test import of styles
import '@/assets/styles/index.scss'
const heading = document.createElement('h1')
heading.textContent = example()
// Test a background image url in CSS
const imageBackground = document.createElement('div')
imageBackground.classList.add('image')

const app = document.querySelector('#root')
app && app.append(heading, imageBackground)

import io from 'socket.io-client';
import * as MediasoupClient from "mediasoup-client";
export default MediasoupClient;
export { io };
window.IO = io
window.MediasoupClientWindow = MediasoupClient
console.log("window:", window)