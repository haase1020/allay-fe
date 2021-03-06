import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactGA from 'react-ga'; // for google analytics
// actions
import login from '../../state/actions/index';
// styles
import CustomSpinner from '../CustomSpinner.js';
import SignupLoginInput from '../Reusable/InputFields/SignupLoginInput.js';
import {
	Button,
	FormControl,
	FormLabel,
	FormErrorMessage,
	Flex,
	Text,
	InputGroup,
	InputRightElement,
	Stack
} from '@chakra-ui/core';

const Login = ({ login, isLoading, history }) => {
	const { handleSubmit, errors, register, formState } = useForm();
	const [show, setShow] = React.useState(false);
	const handleClick = () => setShow(!show);

	function validateUsername(value) {
		let error;
		if (!value) {
			error = 'Username is required';
		} else if (value.length < 5) {
			error = 'Username must be at least 5 characters';
		}
		return error || true;
	}

	function validatePassword(value) {
		let error;
		if (!value) {
			error = 'Password is required';
		} else if (value.length < 8) {
			error = 'Password must be at least 8 characters';
		}
		return error || true;
	}

	const submitForm = creds => {
		// action function here
		login(creds).then(() => history.push('/dashboard'));
		ReactGA.event({
			category: 'User',
			action: `Button Login`
		});
	};

	const gaSignup = () => {
		ReactGA.event({
			category: 'User',
			action: `Link Don't have an account`
		});
	};

	if (isLoading) {
		return (
			<Flex justify='center' align='center' w='100%' h='100vh'>
				<Flex>
					<CustomSpinner />
				</Flex>
			</Flex>
		);
	}

	return (
		<Flex className='LoginSplash' w='100%' minH='100vh' justify='center'>
			<Flex maxW='1440px' w='100%'>
				<Stack
					wrap='wrap'
					w='60%'
					ml='6.5%'
					mb='15%'
					justify='center'
					align='center'
				>
					<Text
						as='h1'
						w='100%'
						fontFamily='Poppins'
						fontSize='80px'
						fontWeight='bold'
					>
						Allay
					</Text>
					<Text w='100%' fontFamily='Poppins' fontSize='52px' fontWeight='bold'>
						Testing We're stronger together.
					</Text>
				</Stack>
				<Flex
					w='40%'
					mb='10%'
					mr='8%'
					justify='center'
					align='center'
					flexDir='column'
				>
					<form onSubmit={handleSubmit(submitForm)}>
						<Flex
							w='473px'
							h='480px'
							flexDir='column'
							background='#FDFDFF'
							justify='center'
						>
							<Flex
								as='h2'
								fontSize='32px'
								fontFamily='Poppins'
								justify='center'
								mx='1'
								my='2%'
							>
								Welcome back!
							</Flex>

							<Flex wrap='wrap' w='411px%' justify='center'>
								<FormControl isInvalid={errors.username}>
									<FormLabel>Username</FormLabel>
									<SignupLoginInput
										mb='30px'
										type='text'
										name='username'
										label='username'
										placeholder='lambda1'
										autoCapitalize='none'
										ref={register({ validate: validateUsername })}
									/>
									<FormErrorMessage>
										{errors.username && errors.username.message}
									</FormErrorMessage>
								</FormControl>
								<FormControl isInvalid={errors.password}>
									<Flex flexDir='column'>
										<FormLabel>Password</FormLabel>
										<InputGroup>
											<SignupLoginInput
												mb='30px'
												type={show ? 'text' : 'password'}
												name='password'
												label='Password'
												placeholder='********'
												autoCapitalize='none'
												ref={register({ validate: validatePassword })}
											/>
											<InputRightElement width='4.5rem' py='32px'>
												<Button
													// position='fixed'
													h='1.75rem'
													color='rgba(72, 72, 72, 0.1)'
													border='none'
													size='sm'
													backgroundColor='#FDFDFF'
													onClick={handleClick}
												>
													{show ? 'Hide' : 'Show'}
												</Button>
											</InputRightElement>
										</InputGroup>
										<FormErrorMessage>
											{errors.password && errors.password.message}
										</FormErrorMessage>
									</Flex>
								</FormControl>
								<Flex w='100%' justify='center'>
									<Button
										mb='30px'
										border='none'
										h='58px'
										w='404px'
										my='2%'
										size='lg'
										color='white'
										backgroundColor='#344CD0'
										isLoading={formState.isSubmitting}
										type='submit'
										data-cy='loginSubmit'
									>
										Login
									</Button>
								</Flex>
							</Flex>
							<Flex m='15px' justify='center' fontWeight='light'>
								<Text>
									Don't have an account?{' '}
									<Link
										to='/signup'
										color='black'
										onClick={gaSignup}
										fontWeight='bold'
										underline='none'
										data-cy='signupLink'
									>
										Sign up here!
									</Link>
								</Text>
							</Flex>
						</Flex>
					</form>
				</Flex>
			</Flex>
		</Flex>
	);
};

const mapStateToProps = state => {
	return {
		isLoading: state.auth.isLoading
	};
};

export default connect(mapStateToProps, login)(Login);
