import { ZenServer } from '..'
import axios, { AxiosInstance } from 'axios'
import { get } from 'lodash'


class ZenAxios {
	create(server: ZenServer): AxiosInstance {
		const _self: AxiosInstance = axios.create({
			baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
			timeout: 100000,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				common: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					...(server.authHeader && { Authorization: `Bearer ${server.authHeader}` })
				}
			}
		})
		this.setRequestInterceptor(_self, server._LSToken)
		this.setResponseInterceptor(_self)
		return _self
	}

	private setRequestInterceptor(_self: AxiosInstance, tokenName): void {
		_self.interceptors.request.use(
			config => {
				if (typeof window && !config.headers.get("Authorization") && window.localStorage.getItem(tokenName)) {
					const _token = window.localStorage.getItem(tokenName)
					const authorization = `Bearer ${_token}`
               config.headers.set("Authorization", authorization)
					_self.defaults.headers.common['Authorization'] = authorization
				}
				return config
			},
			err => Promise.reject(err)
		)
	}

	private setResponseInterceptor(_self: AxiosInstance): void {
		_self.interceptors.response.use(
			response => response.data || null,
			error => {
				throw get(error, 'response.data.errors[0].message', error)
			}
		)
	}
}

export const zenAxiosInstance = new ZenAxios()
