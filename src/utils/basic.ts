export function isNull(...params: any[]): boolean {
  for (const param of params) {
    if (param === null || param === undefined) {
      continue;
    } else {
      return false;
    }
  }
  return true;
}

export function isNotNull(...params: any[]): boolean {
  for (const param of params) {
    if (param === null || param === undefined) {
      return false;
    } else {
      continue;
    }
  }
  return true;
}

export function isEmpty(...params: any[]): boolean {
  for (const param of params) {
    if (
      param === null ||
      param === undefined ||
      param === '' ||
      param === 0 ||
      param === false ||
      // nullはobject型なので空オブジェクトの比較はnull比較の後に実行する
      (typeof param === 'object' ? Object.keys(param).length === 0 : false)
    ) {
      continue;
    } else {
      return false;
    }
  }
  return true;
}

export function isNotEmpty(...params: any[]): boolean {
  for (const param of params) {
    if (
      param === null ||
      param === undefined ||
      param === '' ||
      param === 0 ||
      param === false ||
      // nullはobject型なので空オブジェクトの比較はnull比較の後に実行する
      (typeof param === 'object' ? Object.keys(param).length === 0 : false)
    ) {
      return false;
    } else {
      continue;
    }
  }
  return true;
}
