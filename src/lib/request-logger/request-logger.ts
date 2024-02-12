import { IncomingMessage } from 'http';
import { ColorNameType, printColorMessage } from '@/lib/colors';

const logRequest = (request: IncomingMessage) => {
  const { url, method } = request;

  if (!url) return;
  if (!method) return;

  let color: ColorNameType = 'white';

  switch (method.toUpperCase()) {
    case 'GET':
      color = 'yellow';
      break;
    case 'POST':
      color = 'cyan';
      break;
    case 'PUT':
      color = 'magenta';
      break;
    case 'DELETE':
      color = 'red';
      break;
  }

  printColorMessage(
    { color: 'gray', message: '[' },
    { color, message: method || '' },
    { color: 'gray', message: '] ' },
    { color: 'blue', message: url }
  );
};

export default logRequest;
