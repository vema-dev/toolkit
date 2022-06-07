import { f7 } from 'framework7-react';

export const copyToClipboard = (value) => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(value).then(() => {
      showToast('Value copied to clipboard successfully.');
    });
  } else if (window.clipboardData) {
    window.clipboardData.setData('Text', value);
    showToast('Value copied to clipboard successfully.');
  }
};

export const showToast = (text) => {
  f7.toast
    .create({
      text,
      closeTimeout: 2000,
      position: 'top',
      horizontalPosition: 'center',
    })
    .open();
};
