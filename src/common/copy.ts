import Clipboard from 'clipboard';

export function copy(text: string, container?: Element | null) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text);
  } else {
    try {
      Clipboard.copy(text, { container: container || document.body });
    } catch (err) {
      console.error(err);
    }
  }
}
