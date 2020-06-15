import React,{useState} from 'react';
import {InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';

import $ from 'jquery';

const DateTimeDisplay = (props) => {
    const inputName = props.name;
    const formular = props.formular;
    const changeFormular = props.changeFormular;
    const type = props.typeInput;
    const twinsName = props.twinsName;
    const min = props.min;
    const max = props.max;

    const [error,setError] = useState(false);


    const checkValue = (event, input,type,twinsName) => {
        let elem = $(event.target);
        let err = false;
        let brother= twinsName;
        let way = ">";
        switch(type)
        {
            case "dateTime":
                    formular[input].isValid = true;
                    formular[input].errorMessage = "";
                break;
            case "dateBegin":
                way = "<";
                if(checkTwinsDate(input,brother,way))
                {
                    formular[input].isValid = true;
                    formular[input].errorMessage = "";
                    setError(false);
                }
                else
                {
                    formular[input].isValid = false;
                    formular[input].errorMessage = "The end date need to be greater than the begin date";
                    setError(true);
                }
                break;
            case "dateEnd":
                way = ">";
                if(checkTwinsDate(input,brother,way))
                {
                    formular[input].isValid = true;
                    formular[input].errorMessage = "";
                    setError(false);
                }
                else
                {
                    formular[input].isValid = false;
                    formular[input].errorMessage = "The end date need to be greater than the begin date";
                    setError(true);
                }
                break;

            default:
                err = true;
                break;
        }
        
        if(!err)
        {
            elem.addClass("form-control")

            if (formular[input].isValid) {
                elem.removeClass("is-invalid")
                elem.addClass("is-valid");
            } else {
                elem.removeClass("is-valid");
                elem.addClass("is-invalid");
                elem.parents(".invalid-feedback").text(formular[input].errorMessage);
            }

            changeFormular(formular);
        }
    };

    const onChange = (value,input) => {
        formular[input].value = value;
        changeFormular(formular);
    };


    const checkTwinsDate = (input, brother, way) => { 
        let res = true;
        if(formular[brother].value !== "" && typeof formular[brother].value !== "undefined")
        {
            if(way === ">")
            {
                if(formular[brother].value > formular[input].value)
                {
                    res = false;
                }
            }
            else if(way === "<")
            {
                if(formular[brother].value < formular[input].value)
                {
                    res = false;
                }
            }
        }
        return res;
    };
    return (
        <InputGroup>
            <DateTimePicker onChange={(val)=>onChange(val,inputName)} 
                            onBlur={(e) => checkValue(e, inputName, type,twinsName)} 
                            invalid={!formular[inputName].isValid}
                            max={max}
                            min={min}/>
            <InputGroupAddon addonType="prepend">
                <InputGroupText>{props.label}</InputGroupText>
            </InputGroupAddon>
            {error?<div style={{width: "100%",marginTop: "0.25rem",fontSize: "80%",color: "#dc3545"}}>{formular[inputName].errorMessage}</div>:null}
        </InputGroup>
    );
};

export default DateTimeDisplay;
