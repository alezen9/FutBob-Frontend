import { ConfigStore } from '@_zustand/config/helpers'
import { Draft } from 'immer'

export enum SwrKey {
	ME = 'ME',
	PLAYERS = 'PLAYERS',
	PLAYER = 'PLAYER',
	FIELDS = 'FIELDS',
	FIELD = 'FIELD',
	FREE_AGENTS = 'FREE_AGENTS',
	FREE_AGENT = 'FREE_AGENT'
}

export const stateSelector = (state: ConfigStore) => ({
	setIsLoading: state.setIsLoading,
	openSnackbar: state.openSnackbar
})

export type DirectMutationImmer<T> = (draft: Draft<T>) => void

export interface MoreOptions {
	fromCache?: boolean
	initialData?: any
	revalidateOnFocus?: boolean
	revalidateOnMount?: boolean
	shouldRetryOnError?: boolean
}

export interface ListOf<T> {
	totalCount: number
	result: T[]
}
