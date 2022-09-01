import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import Modal from '../Modal/Modal'

const Formulario = () => {

	const [formValues, setFormValues] = useState(
		{
			name: '',
			email: '',
			password: '',
			textArea: ''
		}
	)

	function enableBtn(values) {
		let changeBtn;
		changeBtn = document.getElementById('btnSubmit')
		if (values.name !== '' && values.email !== '' && values.password !== '' && values.password.length > 4) {
			changeBtn.disabled = false
		}
		else {
			changeBtn.disabled = true
		}
	}

	return (
		<>
			<Formik
				initialValues={{
					name: '',
					email: '',
					password: '',
					textArea: ''
				}}
				validate={(values) => {
					let error = {};

					if (!values.name) {
						error.name = 'Please enter your Name'
					}
					else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.name)) {
						error.name = 'Enter a valid name. Your name cannot have numbers or symbols '
					}
					if (!values.email) {
						error.email = 'Please enter your Email'
					}
					else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(values.email)) {
						error.email = 'Email can only contain letters, numbers, dots and/or hyphens'
					}
					if (!values.password) {
						error.password = 'Please enter a Password'
					}
					else if (!/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{5,16}$/.test(values.password)) {
						error.password = 'Password: 5 to 16 characters - 1 Uppercase - 1 Lowercase - 1 digit - It may have other symbols'

					}
					return error
				}}

				onSubmit={async (values, { resetForm, disableBtn }) => {
					await new Promise((resolve) => setTimeout(resolve, 500));
					setFormValues(values)
					resetForm();
					let changeBtn;
					changeBtn = document.getElementById('btnSubmit')
					changeBtn.disabled = true

				}}
			>

				{({ values, errors }) => (
					<Form className="form" onChange={() => {
						enableBtn(values)
					}}>
						<div>
							<h2 className='fw-bolder'>Form</h2>
						</div>

						<div>
							<label htmlFor="name">Name</label>
							<Field
								type="text"
								name="name"
								placeholder="Woody Allen"
								id="name"
							/>
							<ErrorMessage name="name" component={() => (
								<p className='error'>{errors.name}</p>
							)} />
						</div>

						<div>
							<label htmlFor="email">Email</label>
							<Field
								type="email"
								name="email"
								placeholder="contoso@domain.com"
								id="email"
							/>
							<ErrorMessage name="email" component={() => (
								<p className='error'>{errors.email}</p>
							)} />
						</div>

						<div>
							<label htmlFor="password">Password</label>
							<Field
								type="password"
								name="password"
								placeholder="Provide a password"
								id="password"
							/>
							<ErrorMessage name="password" component={() => (
								<p className='error'>{errors.password}</p>
							)} />
						</div>

						<div>
							<label htmlFor="textArea">Text Area</label>
							<Field
								type="textarea"
								name="textArea"
								placeholder=""
								id="textArea"
							/>
						</div>

						<button id='btnSubmit' type="submit" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" disabled>
							Submit
						</button>
					</Form>
				)}
			</Formik>
			<Modal
				formValues={formValues}
			/>
		</>
	);
}

export default Formulario;

// onChange = funcion propia de formik que permite cambiar los estados de los inputs, de manera contraria se deberia hacer una funcion que reciba como parametro el evento, xej: cambiarInputNombre (event.target.value)
// onBlur = funcion propia de formik, cuando el usuario hace click fuera del form valida el campo.
// touched = funcion propia de formik, solo cuando el usuario salga del input que toco va a mostrar el error.
// Form = Etiqueta de formik, permite reemplazar el onSubmit={handleSubmit} que deberiamos utilizar si usásemos la etiqueta <form></form>
// Field = etiqueta de formik, permite manejar de una forma mas sencilla los valores, de fondo hace la logica. ej: value={values.name} / onChange={handleChange} / onBlur={handleBlur}
// ErrorMessage = Manejo de errores.