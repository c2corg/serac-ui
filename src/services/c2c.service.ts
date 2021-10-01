import axios, { AxiosResponse } from 'axios';

export interface C2cHelp {
  title: string;
  description: string;
}

function extractHash(content: string, hash: string): C2cHelp {
  const el: HTMLDivElement = document.createElement('div');
  el.innerHTML = content;

  let title: string = '';
  let description: string = '';
  const html: string[] = [];
  let appending: boolean = false;
  let mainNodeTag: string = '';

  for (const node of el.children) {
    const isHeader = node.nodeName.match(/^[hH]\d$/);

    if (isHeader && !appending && node.id === hash) {
      appending = true;
      mainNodeTag = node.nodeName;
      title = node.innerHTML;
    } else if (isHeader && appending && node.nodeName <= mainNodeTag) {
      // stop at next higher order header
      break;
    } else if (appending) {
      html.push(node.outerHTML);
    }
  }
  description = html.length !== 0 ? html.join('\n') : el.innerHTML;

  return { title, description };
}

export default {
  help(id: string): Promise<C2cHelp> {
    let documentId: string = id;
    let hash: string = '';
    const match = id.match(/^(\d+)(?:#([a-z0-9-_]+))?$/);
    if (match) {
      documentId = match[1];
      hash = match[2];
    }
    return axios
      .get<
        void,
        AxiosResponse<{ cooked: { title: string; description: string } }>
      >(`https://api.camptocamp.org/articles/${documentId}`, {
        params: { cook: 'fr' },
      })
      .then(response => {
        if (!hash) {
          return {
            title: response.data.cooked.title,
            description: response.data.cooked.description,
          };
        }
        return extractHash(response.data.cooked.description, hash);
      });
  },
};
