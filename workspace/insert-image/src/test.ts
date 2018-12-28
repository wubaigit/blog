const readInfoFromPNG = async (file: File) => {
  return new Promise((resolve: (res: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      const result = event.target.result;
      const resDataView = new DataView(result);
      const info = read(resDataView)
      resolve(info);
    });
    reader.readAsArrayBuffer(file);
  });
}

const read = (dv: DataView) => {
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
    const { name, length } = readNameAndLengthOfChunk();
    const crcLength = 4;
    pos = pos + length + crcLength;
    if (name === 'IEND') {
      break;
    }
  }
  const dvLen = dv.byteLength;
  let info = '';
  for (let i = pos; i < dvLen; i += 1) {
    info += String.fromCharCode(dv.getUint8(i));
  }
  return decodeURI(info);
}