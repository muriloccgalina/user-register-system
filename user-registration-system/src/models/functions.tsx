//import crypto from 'crypto';

//Check if is empty
export function EmptyCheck(data: any[], names: string[]): boolean {
    for (let i = 0; i < data.length; i++) {
      if (data[i].length === 0) {
        alert(names[i] + " is blank!");
        return true;
      }
    }
    return false;
  }

//Check if the E-mail is valid
export function EmailCheck(email: string): boolean {
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Invalid email!");
        return true;
    }
    return false;
}

//Encrypt the password
export async function EncryptPassword(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);

  const key = await window.crypto.subtle.generateKey(
    { name: 'AES-CBC', length: 256 },
    true,
    ['encrypt', 'decrypt']
  );

  const iv = window.crypto.getRandomValues(new Uint8Array(16));

  const encrypted = await window.crypto.subtle.encrypt(
    { name: 'AES-CBC', iv },
    key,
    data
  );

  const encodedKey = await window.crypto.subtle.exportKey('raw', key);
  const encodedIV = window.btoa(String.fromCharCode(...iv));

  const concatenatedString = `${window.btoa(String.fromCharCode(...new Uint8Array(encodedKey)))}.${encodedIV}.${window.btoa(
    String.fromCharCode(...new Uint8Array(encrypted))
  )}`;

  return concatenatedString;
}

//Decrypt password
export async function DecryptPassword(concatenatedString: string): Promise<string> {
  const [encodedKey, encodedIV, encryptedText] = concatenatedString.split('.');

  const key = await window.crypto.subtle.importKey(
    'raw',
    Uint8Array.from(window.atob(encodedKey), (c) => c.charCodeAt(0)),
    { name: 'AES-CBC', length: 256 },
    true,
    ['encrypt', 'decrypt']
  );

  const iv = Uint8Array.from(window.atob(encodedIV), (c) => c.charCodeAt(0));

  const decrypted = await window.crypto.subtle.decrypt(
    { name: 'AES-CBC', iv },
    key,
    Uint8Array.from(window.atob(encryptedText), (c) => c.charCodeAt(0))
  );

  const decoder = new TextDecoder();
  const decryptedText = decoder.decode(decrypted);

  return decryptedText;
}

//Check if the phone number is valid
export function ValidatePhoneNumber(phoneNumber: string): boolean {

  const numericPhoneNumber = phoneNumber.replace(/\D/g, '');

  if ((numericPhoneNumber.length !== 10 && numericPhoneNumber.length !== 11) || 
  (numericPhoneNumber.length === 11 && numericPhoneNumber.charAt(2) !== '9') || 
  (/^(\d)\1+$/.test(numericPhoneNumber))) {
    alert("Incorrect phone!")
    return false;
  }

  return true;
}



