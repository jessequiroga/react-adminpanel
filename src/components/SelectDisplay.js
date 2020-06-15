import React from 'react';
import {InputGroup, InputGroupAddon, InputGroupText, FormFeedback, Input} from 'reactstrap';

const SelectDisplay = (props) => {
    const inputName = props.name;
    const formular = props.formular;
    const changeFormular = props.changeFormular;
    const type = props.typeInput;


    const checkValue = (event, input) => {
        if(event.target.value !== "")
        {
            formular[input].isValid = true;
            formular[input].errorMessage = "";
            formular[input].message ="";
        }
        else
        {
            formular[input].isValid = false;
            formular[input].errorMessage = "This is a needed field";
            formular[input].message ="";
        }

        if (formular[input].isValid) {
            event.target.className = "form-control is-valid"
        } else {
            event.target.className = "form-control is-invalid";
            (event.target.parentNode.children[2].className === "invalid-feedback") ?
                event.target.parentNode.children[2].textContent = formular[input].errorMessage : console.log("errorMessage");
        }

        changeFormular(formular);
    };

    const onChange = (input, event) => {
        if(props.onChange)
        {
            props.onChange(event);
        }
        formular[input].value = event.target.value;
        changeFormular(formular);
    };


    return (
        <>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>{props.label}</InputGroupText>
                </InputGroupAddon>
                <select
                    style={props.style}
                    id="input-form"
                    value={props.value}
                    className={!formular[inputName].isValid?"form-control is-invalid":""}
                    onBlur={(e) => checkValue(e, inputName, type)}
                    onChange={onChange.bind(this, inputName)}
                >
                    <option key="null" value=""></option>
                    {props.children}
                </select>
                <FormFeedback>{formular[inputName].errorMessage}</FormFeedback>
            </InputGroup>
        </>
    );
};

export default SelectDisplay;
