// 传参空值过滤
export function optionSort(opt: any) {
  let obj: any = {}
  if (typeof opt === 'object') {
    for (let k in opt) {
      if (opt[k] !== null && opt[k] !== '') {
        obj[k] = opt[k]
      }
    }
  } else {
    obj = opt
  }
  return obj
}

export async function errorCapture(asyncFunc: Function, ...args: any[]): Promise<any[]> {
  try {
    let res = await asyncFunc(...args)
    return [res, null]
  } catch (e) {
    return [null, e]
  }
}