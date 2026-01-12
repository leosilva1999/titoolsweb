import QRCode from 'qrcode';

export const generateQrCode = async (url) => {
  return await QRCode.toDataURL(url, {
    width: 100,
    margin: 1,
  });
};
