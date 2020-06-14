import React from 'react';
import {InputGroup, InputGroupAddon, InputGroupText, FormFeedback, Input} from 'reactstrap';

const TextDisplay = (props) => {
    const inputName = props.name;
    const formular = props.formular;
    const changeFormular = props.changeFormular;
    const type = props.typeInput;


    const checkValue = (event, input) => {
        switch (type) {

            case "email":
                if (formular[input].value !== "") {
                    if (validEmail(formular[input].value)) {
                        if (input.indexOf("Chang")!==-1 && formular[input].value === event.target.placeholder)
                        {
                            formular[input].value ="";
                            event.target.value="";
                            formular[input].isValid = true;
                            formular[input].errorMessage = "";
                            formular[input].message ="";
                        }
                        else
                        {
                            formular[input].isValid = true;
                            formular[input].errorMessage = "";
                            formular[input].message ="";
                        }
                    } else {
                        formular[input].isValid = false;
                        formular[input].errorMessage = "This Email isn't valid";
                        formular[input].message ="";
                    }
                } else {
                    if (input.indexOf("Chang")!==-1)
                    {
                        formular[input].message = "This field will not be change";
                        formular[input].errorMessage ="";
                        formular[input].isValid = true;
                    }
                    else
                    {
                        formular[input].isValid = false;
                        formular[input].errorMessage = "This is a needed field";
                        formular[input].message ="";
                    }
                }
                break;


            case "password":
                if (formular[input].value !== "") {
                    if (formular[input].value.length >= 8 && /\d/.test(formular[input].value)) {
                        if (input.indexOf("Chang")!==-1 && formular[input].value === event.target.placeholder)
                        {
                            formular[input].value ="";
                            event.target.value="";
                            formular[input].isValid = true;
                            formular[input].errorMessage = "";
                            formular[input].message ="";
                        }
                        else
                        {
                            formular[input].isValid = true;
                            formular[input].errorMessage = "";
                            formular[input].message ="";
                        }
                    } else {
                        formular[input].isValid = false;
                        formular[input].errorMessage = "The password need at least 8 char and one number";
                        formular[input].message ="";
                    }
                } else {
                    if (input.indexOf("Chang")!==-1)
                    {
                        formular[input].message = "This field will not be change";
                        formular[input].errorMessage ="";
                        formular[input].isValid = true;
                    }
                    else
                    {
                        formular[input].isValid = false;
                        formular[input].errorMessage = "This is a needed field";
                        formular[input].message ="";
                    }
                }
                break;

            case "tag":
                if (formular[input].value === '') {
                    if (input.indexOf("Chang")!==-1)
                    {
                        formular[input].message = "This field will not be change";
                        formular[input].errorMessage ="";
                        formular[input].isValid = true;
                    }
                    else
                    {
                        formular[input].isValid = false;
                        formular[input].errorMessage = "This is a needed field";
                        formular[input].message ="";
                    }
                } else if (formular[input].value.length < 2) {
                    formular[input].isValid = false;
                    formular[input].errorMessage = "Please write something longer";
                    formular[input].message ="";
                } else if (!formular[input].value.match(/^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\s0-9]+$/)) {
                    formular[input].isValid = false;
                    formular[input].errorMessage = "Please this field can contain only letter";
                    formular[input].message ="";
                } else {
                    if (input.indexOf("Chang")!==-1 && formular[input].value === event.target.placeholder)
                    {
                        formular[input].value ="";
                        event.target.value="";
                        formular[input].isValid = true;
                        formular[input].errorMessage = "";
                        formular[input].message ="";
                    }
                    else
                    {
                        formular[input].isValid = true;
                        formular[input].errorMessage = "";
                        formular[input].message ="";
                    }
                }
                break;
            case "name":
                if (formular[input].value === '') {
                    if (input.indexOf("Chang")!==-1)
                    {
                        formular[input].message = "This field will not be change";
                        formular[input].errorMessage ="";
                        formular[input].isValid = true;
                    }
                    else
                    {
                        formular[input].isValid = false;
                        formular[input].errorMessage = "This is a needed field";
                        formular[input].message ="";
                    }
                } else if (formular[input].value.length < 2) {
                    formular[input].isValid = false;
                    formular[input].errorMessage = "Please write something longer";
                    formular[input].message ="";
                } else if (!formular[input].value.match(/^[a-zA-Z]+$/)) {
                    formular[input].isValid = false;
                    formular[input].errorMessage = "Please this field can contain only letter";
                    formular[input].message ="";
                } else {
                    if (input.indexOf("Chang")!==-1 && formular[input].value === event.target.placeholder)
                    {
                        formular[input].value ="";
                        event.target.value="";
                        formular[input].isValid = true;
                        formular[input].errorMessage = "";
                        formular[input].message ="";
                    }
                    else
                    {
                        formular[input].isValid = true;
                        formular[input].errorMessage = "";
                        formular[input].message ="";
                    }
                }
                break;

            case "rep":
                let indexChamp = input.indexOf("Rep");
                let champOrigin = input.slice(0,indexChamp);
                checkTwinsInput(formular[input], formular[champOrigin],champOrigin, "The "+champOrigin)
                break;

            case "ip":
                if(formular[input].value === '')
                {
                    if (input.indexOf("Chang")!==-1)
                    {
                        formular[input].message = "This field will not be change";
                        formular[input].errorMessage ="";
                        formular[input].isValid = true;
                    }
                    else
                    {
                        formular[input].isValid = false;
                        formular[input].errorMessage = "This is a needed field";
                        formular[input].message ="";
                    }
                }
                else if(!formular[input].value.match(/^[0-9]+[0-9]+[0-9]+.+$/))
                {
                    formular[input].isValid = false;
                    formular[input].errorMessage = "This ip isn't valid";
                    formular[input].message ="";
                }
                else
                {
                    if (input.indexOf("Chang")!==-1 && formular[input].value === event.target.placeholder)
                    {
                        formular[input].value ="";
                        event.target.value="";
                        formular[input].isValid = true;
                        formular[input].errorMessage = "";
                        formular[input].message ="";
                    }
                    else
                    {
                        formular[input].isValid = true;
                        formular[input].errorMessage = "";
                        formular[input].message ="";
                    }
                }
                break;

            case "number":
                if(formular[input].value === '')
                {
                    if (input.indexOf("Chang")!==-1)
                    {
                        formular[input].message = "This field will not be change";
                        formular[input].errorMessage ="";
                        formular[input].isValid = true;
                    }
                    else
                    {
                        formular[input].isValid = false;
                        formular[input].errorMessage = "This is a needed field";
                        formular[input].message ="";
                    }
                }
                else if(!formular[input].value.match(/^[0-9]+$/))
                {
                    formular[input].isValid = false;
                    formular[input].errorMessage = "This ip isn't valid";
                    formular[input].message ="";
                }
                else
                {
                    if (input.indexOf("Chang")!==-1 && formular[input].value === event.target.placeholder)
                    {
                        formular[input].value ="";
                        event.target.value="";
                        formular[input].isValid = true;
                        formular[input].errorMessage = "";
                        formular[input].message ="";
                    }
                    else
                    {
                        formular[input].isValid = true;
                        formular[input].errorMessage = "";
                        formular[input].message ="";
                    }
                }
                break;
            
            case "time":
            case "date":
            case "boolean":
                formular[input].isValid = true;
                formular[input].errorMessage = "";
                formular[input].message ="";
                break;

            default :
                break;
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


    const validEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const onChange = (input, disable,event) => {
        if(!disable)
        {
            formular[input].value = event.target.value;
            changeFormular(formular);
        }
    };


    const checkTwinsInput = (input, brother,key, errorMessage) => { // Permet de gerer la validation de champs à confirmation (mot de passe par exemple,...)

        if (input.value !== "") {
            if (brother.isValid) {
                input.isValid = true;
                input.errorMessage = "";
                input.message ="";

                if (brother.value === input.value) {
                    input.isValid = true;
                    input.errorMessage = "";
                    input.message ="";
                } else {
                    input.isValid = false;
                    input.errorMessage = errorMessage + " is not the same";
                    input.message ="";
                }
            } else {
                input.isValid = false;
                input.errorMessage = "Write something into the first input, before send this";
                input.message ="";
            }
        } else {
            if(key.indexOf("Chang")!==-1 && (!formular[key] || (formular[key] && formular[key].value === "")))
            {
                input.message = "This field will not be change";
                input.errorMessage = "";
                input.isValid  = true;
            }
            else
            {
                input.isValid = false;
                input.errorMessage = "This is a needed field";
                input.message ="";
            } 
        }
    };
    return (
        <InputGroup>
            <InputGroupAddon addonType="prepend">
                <InputGroupText>{props.label}</InputGroupText>
            </InputGroupAddon>
            <Input
                style={props.style}
                id="input-form"
                value={props.value}
                invalid={!formular[inputName].isValid}
                type={props.type} name={inputName} placeholder={props.placeHolder}
                onBlur={(e) => checkValue(e, inputName, type)}
                onChange={onChange.bind(this, inputName,(typeof x !== "undefined" && props.value !==null))}
            />
            <FormFeedback>{formular[inputName].errorMessage}</FormFeedback>
        </InputGroup>
    );
};

export default TextDisplay;
