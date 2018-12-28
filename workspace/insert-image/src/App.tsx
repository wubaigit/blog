import * as canvg from 'canvg-browser';
import * as React from 'react';
import './App.css';
import { xmlData } from './xml';

import logo from './logo.svg';

interface IState {
  previewUrl: string;
  data: string;
  buffer?: Buffer;
}

/**
 * 大小变化，插入的字符串的字节数的 4/3；
 * 微信传输，数据不会丢失 - WechatIMG104.png；
 * 经过 李晶 的那套压缩之后，数据会丢失 - rJFPtJMb4.png；
 * 经过 素材库上传到 七牛 之后，数据会丢失 - BybkaqyMW4.png；
 */

class App extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: '',
      previewUrl:'',
    }
  }
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        {
          this.state.previewUrl.length === 0 ?
            ''
            : (<img src={this.state.previewUrl} />)
        }
        {
          this.state.buffer ?
            <p>显示：{this.state.buffer}</p>
            : ''
        }
        {
          this.state.data === '' ?
            ''
            : <p>显示新的结果：{this.state.data}</p>
        }
        <button type="button" onClick={this.generateImage}>生成</button>
        <button type="button" onClick={this.clearImage}>取消</button>
        <button type="button" onClick={this.insertInfo}>插入数据</button>
        <form>
          <input type="file" onChange={this.uploadImage}/>
        </form>
      </div>
    );
  }
  private clearImage = () => {    
    this.setState({
      previewUrl: '',
    });
  }
  private generateImage = async() => {
    const canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    const completeRenderCanvas = await this.getCanvasWhenRenderCompletely(canvas);
    const canvasBase64 = completeRenderCanvas.toDataURL('image/png');
    // const canvasBase64Len = canvasBase64.length;
    // const matchEqual = canvasBase64.slice(canvasBase64Len - 2).match(/=/g);
    document.body.removeChild(canvas);
    this.setState({
      previewUrl: canvasBase64,
    });
    return;
  }
  private getCanvasWhenRenderCompletely = async (
    canvas: HTMLCanvasElement,
  ) => {
    return new Promise((resolve: (res: HTMLCanvasElement) => void) => {
      canvg(canvas, xmlData, {
        renderCallback: () => {
          resolve(canvas);
        }
      });
    });
  }
  private insertInfo = () => {
    // const head = `data:image/png;base64,`;
    // const base64Url = this.state.previewUrl.slice(head.length);
    // const resBuffer = new Buffer(base64Url, 'base64');
    // const resStr = new Buffer(xmlData);
    // IEDN crc
    // const res = head + Buffer.concat([resBuffer, resStr]).toString('base64'); // Uint8Array
    const res = this.generatePNGWithInfo(this.state.previewUrl, xmlData);
    this.setState({
      previewUrl: res,
    }, () => {
      alert('success');
    });
  }
  private base64ToUint8Array = (base64:string) => {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }
  private stringToUint8Array = (str:string) => {
    const bufView = new Uint8Array(str.length);
    for (let i = 0; i < str.length; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return bufView;
  }
  private concatUint8Array = (buffer1:Uint8Array, buffer2:Uint8Array) => {
    const tmp = new Uint8Array(buffer1.length + buffer2.length);
    tmp.set(buffer1, 0);
    tmp.set(buffer2, buffer1.length);
    return tmp;
  }
  private Uint8ArrayToBase64 = (buffer:Uint8Array) => {
    let binary = '';
    const len = buffer.length;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(buffer[i]);
    }
    return window.btoa(binary);
  }
  private generatePNGWithInfo = (canvasDataURLBase64:string, info:string) => {
    const head = `data:image/png;base64,`;
    const fileBase64Code = canvasDataURLBase64.slice(head.length);
    const fileBase64CodeBuffer = this.base64ToUint8Array(fileBase64Code);
    const insertInfo = encodeURI(info);
    const insertInfoBuffer = this.stringToUint8Array(insertInfo);
    const newBuffer = this.concatUint8Array(fileBase64CodeBuffer, insertInfoBuffer);
    const res = head + this.Uint8ArrayToBase64(newBuffer);
    return res;
  }
  private uploadImage = async(e:any) => {
    const file = e.target.files[0];
    const info = await this.readInfoFromPNG(file);
    this.setState({
      data: info,
    });
  }
  private readInfoFromPNG = async (file:File) => {
    return new Promise((resolve:(res:string) => void) => {
      const reader = new FileReader();
      reader.addEventListener('load', (event:any) => {
        const result = event.target.result;
        const resDataView = new DataView(result);
        const info = this.read(resDataView)
        resolve(info);
      });
      reader.readAsArrayBuffer(file);
    });
  }
  // private readNameAndLength = (chunk:Uint8Array) => {
  //   const length = chunk.slice(0, 4);
  //   let name = '';
  //   for (let i = 4; i < 8; i++) {
  //     name += String.fromCharCode(chunk[i]);
  //   }
  //   return {
  //     name,
  //     length,
  //   };
  // }
  // private getUint32 = (dv:DataView, pos:number) => {
  //   const data = dv.getUint32(pos);
  //   let name = '';
  //   pos += 4;
  //   for (let i = 0; i < 4; i++) {
  //     name += String.fromCharCode(dv.getUint8(pos));
  //     pos += 1;
  //   }
  //   return data;
  // }
  private read = (dv:DataView) => {
    /**
     * 前面8个字节是署名域，用来识别该文件是不是 PNG 文件
     * 随后是数据块，每个数据块包含
     *  1. Length（长度）4字节
     *  2. Chunk Type Code（数据块类型码）4字节
     *  3. Chunk Data（数据块实际内容）可变
     *  4. CRC（循环冗余检测）4字节
     */
    let pos = 8;
    const readNameAndLengthOfChunk = () => {
      const length = dv.getUint32(pos);
      let name = '';
      pos += 4;
      for (let i = 0; i < 4; i++) {
        name += String.fromCharCode(dv.getUint8(pos));
        pos += 1;
      }
      return {
        name, length,
      };
    };
    while (true) {
      const {name, length} = readNameAndLengthOfChunk();
      const crcLength = 4;
      pos = pos + length + crcLength;
      if (name === 'IEND') {
        break;
      }
    }
    const dvLen = dv.byteLength;
    let info = '';
    for (let i = pos; i < dvLen; i+=1) {
      info += String.fromCharCode(dv.getUint8(i));
    } 
    return decodeURI(info);  
  }
}

export default App;
