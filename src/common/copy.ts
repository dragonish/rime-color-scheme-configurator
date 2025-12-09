import Clipboard from 'clipboard';

export function copy(text: string) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text);
  } else {
    try {
      Clipboard.copy(text);
    } catch (err) {
      console.error(err);
    }
  }
}
