import React,{useState} from 'react';
import {InputGroup, InputGroupAddon, InputGroupText, FormFeedback} from 'reactstrap';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';

import $ from 'jquery';

const DateTimeDisplay = (props) => {
    const inputName = props.name;
    const formular = props.formular;
    const changeFormular = props.changeFormular;
    const type = props.typeInput;
    const twinsName = props.twinsName;

    const [error,setError] = useState(false);


    const checkValue = (event, input,type,twinsName) => {

        let elem = $(event.target);
        let err = false;
        let brother= twinsName;
        let way = ">";
        console.log("twinsName",twinsName);
        switch(type)
        {
            case "dateTime":
                    formular[input].isValid = true;
                    formular[input].errorMessage = "";
                break;
            case "dateBegin":
                way = "<";
            case "dateEnd":
                way?way = way: way = ">";
                if(checkTwinsDate(input,brother,way))
                {
                    formular[input].isValid = true;
                    formular[input].errorMessage = "";
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
                console.log("ok")
                elem.removeClass("is-invalid")
                elem.addClass("is-valid");
            } else {
                console.log("ko")
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
            console.log("way",way);
            if(way === ">")
            {
                if((new Date(formular[brother].value)) > (new Date(formular[input].value)))
                {
                    res = false;
                }
            }
            else if(way === "<")
            {
                if((new Date(formular[brother].value)) < (new Date(formular[input].value)))
                {
                    res = false;
                }
            }
        }
        return res;
    };
    return (
        <InputGroup>
            <DateTimePicker onChange={(val)=>onChange(val,inputName,type)} onBlur={(e) => checkValue(e, inputName, type,twinsName)} invalid={!formular[inputName].isValid}/>
            <InputGroupAddon addonType="prepend">
                <InputGroupText>{props.label}</InputGroupText>
            </InputGroupAddon>
            {error?<div style={{width: "100%",marginTop: "0.25rem",fontSize: "80%",color: "#dc3545"}}>{formular[inputName].errorMessage}</div>:null}
        </InputGroup>
    );
};

export default DateTimeDisplay;
