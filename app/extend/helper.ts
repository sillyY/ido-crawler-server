// app/extend/helper.js
export async function errorCaptured(asyncFunc, params) {
  try {
    const res = await asyncFunc(params)
    return [res, null]
  } catch (e) {
    return [null, e]
  }
}
