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
  private generateImage = () => {
    setTimeout(async() => {
      const canvas = document.createElement('canvas');
      document.body.appendChild(canvas);
      const completeRenderCanvas = await this.getCanvasWhenRenderCompletely(canvas);
      const canvasBase64 = completeRenderCanvas.toDataURL('image/png');
      // const canvasBase64Len = canvasBase64.length;
      // const matchEqual = canvasBase64.slice(canvasBase64Len - 2).match(/=/g);
      document.body.removeChild(canvas);
      this.setState({
        previewUrl: canvasBase64,
      })
    }, 100)
    
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
    const head = `data:image/png;base64,`;
    const base64Url = this.state.previewUrl.slice(head.length);
    const resBuffer = new Buffer(base64Url, 'base64');
    const resStr = new Buffer(xmlData);
    // IEDN crc
    const res = head + Buffer.concat([resBuffer, resStr]).toString('base64'); // Uint8Array
    this.setState({
      previewUrl: res,
    }, () => {
      alert('success');
    });
  }
  private uploadImage = (e:any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event:any) => {
      const result = event.target.result;
      const base64Code = Buffer.from(result).toString('base64');
      const resBuffer = Buffer.from(base64Code, 'base64');
      const resData = resBuffer.slice(-xmlData.length).toString();
      this.setState({
        data: resData,
      });
    });
    reader.readAsArrayBuffer(file);
  }
}

export default App;
// data:image/png;base64,
