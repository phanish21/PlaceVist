import React , { useReducer } from "react";
import { Validate } from "./Validate";
import { useEffect } from "react";

function inputReducer (state , action) {
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state,
                value: action.val,
                isValid: Validate(action.val, action.validators) 
            };
        case 'TOUCH' :
            return{
                ...state,
                isTouch : true
            }
        default:
            return state;
    }
};

export default function Input({ id, element, type, label, placeholder, rows , validators ,onInput , intialValue , intialValid , className}) {

    const [inputState , dispatch] = useReducer(inputReducer , {
        value: intialValue  || '',
        isTouch: false,
        isValid: intialValid || false
    });

    useEffect(() => {
      onInput(id, inputState.value, inputState.isValid);
    }, [id, inputState.value, inputState.isValid, onInput]);



    function changeHandler(ev) {
        dispatch({
          type: 'CHANGE',
          val: ev.target.value,
          validators: validators 
        });
      }
      
    function touchHandler() {
        dispatch({
            type:'TOUCH'
        });
    }

    return (
      <div className={`mb-4 ${!inputState.isValid && inputState.isTouch ? "has-error" : ""}`}>
      <label htmlFor={id} className="block mb-1">
          {label}
      </label>
      {element === "input" ? (
          <input
              id={id}
              type={type}
              placeholder={placeholder}
              onChange={changeHandler}
              onBlur={touchHandler}
              value={inputState.value}
              className={`border rounded-md px-3 py-2 focus:outline-none w-full ${!inputState.isValid && inputState.isTouch ? "border-red-500" : ""} ${className}`}
          />
      ) : (
          <textarea
              id={id}
              rows={rows || 3}
              onChange={changeHandler}
              onBlur={touchHandler}
              value={inputState.value}
              className={`border rounded-md px-3 py-2 focus:outline-none w-full ${!inputState.isValid && inputState.isTouch ? "border-red-500" : ""} ${className}`}
          />
      )}
      {!inputState.isValid && inputState.isTouch && (
          <p className="text-red-500 text-sm mt-1">Please enter valid data</p>
      )}
  </div>
    );
}
