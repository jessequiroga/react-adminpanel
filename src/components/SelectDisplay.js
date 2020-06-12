import React from 'react';
import {InputGroup, InputGroupAddon, InputGroupText, FormFeedback} from 'reactstrap';

const SelectDisplay = (props) => {
    const inputName = props.name;
    const formular = props.formular;
    const changeFormular = props.changeFormular;
    const type = props.typeInput;


    const checkValue = (event, input) => {
            formular[input].isValid = true;
            formular[input].errorMessage = "";
            formular[input].message ="";

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
        formular[input].value = event.target.value;
        changeFormular(formular);
    };

    const options = Object.keys(props.options).map(function(option,index){
        return <option key={index} value={props.options[option].value} defaultValue={props.options[option].selected}>{props.options[option].label}</option>
    })
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
                    onBlur={(e) => checkValue(e, inputName, type)}
                    onChange={onChange.bind(this, inputName)}
                >
                    {options}
                </select>
                <FormFeedback>{formular[inputName].errorMessage}</FormFeedback>
            </InputGroup>
        </>
    );
};

export default SelectDisplay;
