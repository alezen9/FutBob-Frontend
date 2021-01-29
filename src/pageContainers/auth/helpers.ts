import { makeStyles, Theme } from '@material-ui/core'
import { ConfigStore } from '@_zustand/config/helpers'

export const useSharedStyles = makeStyles((theme: Theme) => ({
	main: {
		position: 'fixed',
		width: '100vw',
		minHeight: '100vh',
		overflow: 'hidden',
		padding: `${theme.spacing(5)}px 0`
	},
	form: {
		width: '100%',
		maxWidth: 300,
		marginTop: theme.spacing(1)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	},
	logo: {
		position: 'absolute',
		bottom: '-40vh',
		left: '-10vw',
		fontSize: '50em',
		transform: 'rotateZ(-30deg)',
		opacity: '.05',
		color: '#005959',
		[theme.breakpoints.down('xs')]: {
			bottom: '-50vh',
			fontSize: '45em'
		}
	},
	themeToggleClass: {
		position: 'absolute',
		top: '1.5em',
		right: '1.5em'
	}
}))

export const stateSelector = (state: ConfigStore) => ({
	isLogged: state.isLogged,
	openSnackbar: state.openSnackbar,
	setIsLogged: state.setIsLogged,
	setIsLoading: state.setIsLoading,
	themeType: state.themeType
})
