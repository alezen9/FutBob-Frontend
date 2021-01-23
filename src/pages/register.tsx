import React, { useCallback, useEffect, useRef } from 'react'
import { Button, Typography, Grid, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { FormikHelpers, useFormik } from 'formik'
import FormikInput from '@_components/FormikInput'
import { apiInstance } from 'src/SDK'
import { FutBobLogo } from '@_icons'
import { useRouter } from 'next/router'
import ThemeSwitch from '@_components/ThemeModeSwitch'
import { ServerMessage } from '@_utils/serverMessages'
import { useConfigStore } from '@_zustand/configStore'
import { ConfigStore } from '@_zustand/helpers'
import { useIsMounted } from '@_utils/customHooks'
import { getOptionsByEnum } from '@_utils/helpers'
import { Sex } from '@_SDK_User/types'

const Copyright = () => {
	return (
		<Grid container item xs={12} justify='center'>
			<Typography variant='caption' align='center'>
				{`Copyright © FutBob ${new Date().getFullYear()}`}
			</Typography>
		</Grid>
	)
}

const useStyles = makeStyles((theme: Theme) => ({
	main: {
		position: 'fixed',
		width: '100vw',
		minHeight: '100vh',
		overflow: 'hidden',
		padding: `${theme.spacing(5)}px 0`,
	},
	form: {
		width: '100%',
		maxWidth: 300,
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
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
			fontSize: '45em',
		},
	},
	themeToggleClass: {
		position: 'absolute',
		top: '1.5em',
		right: '1.5em',
	},
}))

const stateSelector = (state: ConfigStore) => ({
	isLogged: state.isLogged,
	openSnackbar: state.openSnackbar,
	setIsLogged: state.setIsLogged,
	setIsLoading: state.setIsLoading,
	themeType: state.themeType,
})

const SignIn = () => {
	const classes = useStyles()
	const {
		openSnackbar,
		setIsLogged,
		setIsLoading,
		isLogged,
		themeType,
	} = useConfigStore(stateSelector)
	const router = useRouter()
	const isMounted = useIsMounted()

	const goToLogin = useCallback(() => {
		router.push('/login')
	}, [])

	const onSubmit = useCallback(
		async (values, { setSubmitting }: FormikHelpers<any>) => {
			setIsLoading(true)
			setSubmitting(true)
			let _token
			try {
				const token = await apiInstance.auth.login(values, '{ token }')
				if (token) _token = token
			} catch (error) {
				openSnackbar({
					variant: 'error',
					message: ServerMessage[error] || 'Username o password errati',
				})
			}
			setSubmitting(false)
			setIsLoading(false)
			if (_token) {
				setIsLogged(true)
				await router.push('/')
			}
		},
		[openSnackbar, setIsLoading, setIsLogged]
	)

	const formik = useFormik({
		initialValues: {},
		onSubmit,
	})

	// shouldn't happen
	if (isLogged) return null

	return (
		<Grid
			container
			justify='space-between'
			alignItems='center'
			direction='column'
			className={classes.main}
		>
			<div className={classes.themeToggleClass}>
				<ThemeSwitch />
			</div>
			<FutBobLogo className={classes.logo} />
			<Grid
				container
				direction='column'
				alignItems='center'
				item
				xs={12}
				sm={6}
				style={{ marginTop: '10vh' }}
			>
				<FutBobLogo style={{ fontSize: '4em' }} />
				<form className={classes.form} onSubmit={formik.handleSubmit}>
					<FormikInput name='name' label='Name' required {...formik} />
					<FormikInput name='surname' label='Surname' required {...formik} />
					<FormikInput
						name='dateOfBirth'
						label='Date of birth'
						type='date'
						required
						{...formik}
					/>
					<FormikInput
						name='sex'
						label='Sex'
						type='select'
						options={getOptionsByEnum(Sex)}
						required
						{...formik}
					/>
					<FormikInput name='name' label='Name' required {...formik} />
					<FormikInput name='surname' label='Surname' required {...formik} />
					<Button
						type='submit'
						fullWidth
						variant={themeType === 'light' ? 'contained' : 'outlined'}
						color='primary'
						disabled={formik.isSubmitting}
						className={classes.submit}
					>
						Register
					</Button>
					<Button
						onClick={goToLogin}
						fullWidth
						color='primary'
						disabled={formik.isSubmitting}
						className={classes.submit}
					>
						Login
					</Button>
				</form>
			</Grid>
			<Copyright />
		</Grid>
	)
}

export default SignIn
