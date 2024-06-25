import Input from "./Input";
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from "./Validate";
import { useForm } from './FormHook';
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import ErrorModal from "./ErrorModel";
import { useHttpClient } from "./HttpHook";
import ImageUploader from "./ImageUploader";

export default function Authentication() {
    const auth = useContext(AuthContext);
    const [isLoginMode , setIsLoginMode] = useState(true);
    const { isLoading , error , sendRequest , clearError} = useHttpClient();
    const [formState , inputHandler , setFormData ] = useForm({
        email: {
            value : '' ,
            isValid : false
        },
        password : {
            value : '' ,
            isValid : false
        }
    } , false);


    function switchModeHandler() {
        if (!isLoginMode) {
            setFormData(
                {
                    ...formState.inputs ,
                    username : undefined,
                    image : undefined
                },
                formState.inputs.email.isValid && formState.inputs.password.isValid
            );
        } else {
            setFormData(
                {
                    ...formState.inputs,
                    username : {
                        value : '',
                        isValid : false
                    },
                    image : {
                        value : null,
                        isValid : false
                    }
                }, false
            );
        }
        setIsLoginMode( prevMode => !prevMode);
    };

    async function loginSubmitHandler(ev) {
        ev.preventDefault();
        console.log(formState.inputs);
        if (isLoginMode) {
            try {
                const responseData = await sendRequest(
                    'http://localhost:4000/api/users/login',
                    'POST' ,
                    JSON.stringify({
                        email : formState.inputs.email.value,
                        password : formState.inputs.password.value,
                    }),
                    {
                        'Content-Type' : 'application/json'
                    },
                );
                auth.login(responseData.userId , responseData.token);
            } catch (err) {}
        } else {
            try {
                const formData = new FormData();
                formData.append('email', formState.inputs.email.value);
                formData.append('name', formState.inputs.username.value);
                formData.append('password', formState.inputs.password.value);
                formData.append('image', formState.inputs.image.value);
                const responseData =  await sendRequest(
                    'http://localhost:4000/api/users/signup',
                    'POST' ,
                    formData
                );
                auth.login(responseData.userId, responseData.token);
            } catch (err) {}
        }
    };

    return(
        <div className="flex flex-col items-center justify-center h-full">
        {error && <ErrorModal error={error} onClear={clearError} />}
        <h2 className="text-3xl font-semibold mb-8">{isLoginMode ? 'Login Form' : 'Sign Up Form'}</h2>
        <form onSubmit={loginSubmitHandler} className="w-80 max-w-full mx-auto p-4 bg-white shadow-md rounded-lg">
        {!isLoginMode && (
            <Input
                type="text"
                element="input"
                label="Username"
                validators={[VALIDATOR_REQUIRE()]}
                id="username"
                placeholder="Enter your username"
                onInput={inputHandler}
                className="mb-4"
            />
        )}
        <Input
            type="email"
            element="input"
            label="Email"
            validators={[VALIDATOR_EMAIL()]}
            id="email"
            placeholder="Enter your Email"
            onInput={inputHandler}
            className="mb-4"
        />
        <Input
            type="password"
            element="input"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(6)]}
            id="password"
            placeholder="Enter your password"
            onInput={inputHandler}
            className="mb-4"
        />
        {!isLoginMode && (
             <div className="mb-4">
             <p>Choose a Profile pic for your account</p>
                <ImageUploader id='image' onInput={inputHandler}/>
        </div>
        )}
        <button
            type="submit"
            disabled={!formState.isValid}
            className={`bg-blue-500 text-white py-3 px-6 rounded-md block mx-auto ${
                !formState.isValid && 'cursor-not-allowed opacity-50'
            }`}
        >
            {isLoginMode ? 'LOGIN' : 'SIGN UP'}
        </button>
    </form>
            <div className="mt-4 text-center">
                {isLoginMode ? (
                    <div>
                        <p className="text-gray-600">Don't have an account?</p>
                        <button className="text-blue-500 hover:underline" onClick={switchModeHandler}>
                            Register here
                        </button>
                    </div>
                ) : (
                    <div>
                        <p className="text-gray-600">Already have an account?</p>
                        <button className="text-blue-500 hover:underline" onClick={switchModeHandler}>
                            Login here
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}