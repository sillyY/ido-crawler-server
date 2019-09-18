/// <reference path="../typings/ajax.d.ts" />

import axios, { AxiosInstance } from 'axios'

import * as qs from 'qs'

import { optionSort } from './index'

class Request {
  private baseURL = ''
  private _axios: AxiosInstance
  constructor(baseURL: string) {
    this._axios = axios.create({
      baseURL,
      timeout: 60000,
      headers: {
        'content-type': 'application/json',
      },
    })
  }
  fetch(
    url = '',
    data = {},
    type = 'get',
    origin = false,
    sort = true
  ) {
    let options: any = null
    data = sort ? optionSort(data) : data
    type = type.toLowerCase()
    if (type === 'get') {
      options = {
        params: data
      }
    } else if (type === 'post') {
      options = qs.stringify(data, { arrayFormat: 'repeat' })
    }
  
    return new Promise(async (resolve, reject) => {
      try {
        let res: Ajax.AxiosResponse = await (this._axios as any)[type](url, options)
        resolve(res.data)
      } catch (err) {
        reject(err)
      }
    })
  }
  get(url: string, data: any, sort = true) {
    data = sort ?  optionSort(data) : data
    let options = {
      data
    }
    return new Promise(async (resolve, reject) => {
      try {
        let res = await this._axios.get(url, options)
      } catch (e) {
        reject(e)
      }
    })
  }
  post(url: string, data: any, sort = true) {
    data = sort ?  optionSort(data) : data
    let options = qs.stringify(data, { arrayFormat: 'repeat' })
    return new Promise(async (resolve, reject) => {
      try {
        let res = await this._axios.post(url, options)
      } catch (e) {
        reject(e)
      }
    })
  }
}

export default Request
