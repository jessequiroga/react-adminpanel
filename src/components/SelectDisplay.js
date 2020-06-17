import React from 'react';
import $ from 'jquery';
import {InputGroup, InputGroupAddon, InputGroupText, FormFeedback} from 'reactstrap';

const SelectDisplay = (props) => {
    const inputName = props.name;
    const formular = props.formular;
    const changeFormular = props.changeFormular;
    const type = props.typeInput;
    const defaultValue = props.defaultValue


    const checkValue = (event, input) => {
        let elem = $(event.target);
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
    };

    const onChange = (input, event) => {
        formular[input].value = event.target.value;
        $(event.target).addClass("init");
        changeFormular(formular);
        if(props.onChange)
        {
            props.onChange(event);
        }
    };

    const changeOption = (event,type) => {
        if(type === "color")
        {
            let colorTake = [];
            let options = [];
            let allSelectColor = $("select."+type);
            allSelectColor.map(index=>{
                let select = allSelectColor[index];
                let value ="";
                if($(select).hasClass("init"))
                {
                    value = select.value;
                }
                else
                {
                    value = $(select).attr("beginvalue");
                }
                colorTake.push(value);
                return true;
            })

            Object.keys(props.children).map(index=>{
                let option = props.children[index].props
                if(!colorTake.includes(option.value))
                {
                    let color = props.children[index].props.value;
                    options.push( '<option style="background-color:'+color+';" class="'+color+'" value="'+color+'"></option>');
                }
                return true;
            })
            let elem = $(event.target);
            elem.children().remove();
            options.map(op=>{
                elem.append(op);
                return true;
            });
        }
    }


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
                    className={!formular[inputName].isValid?"form-control is-invalid "+type:" "+type}
                    onBlur={(e) => checkValue(e, inputName, type)}
                    onChange={onChange.bind(this, inputName)}
                    onFocus={(e) => changeOption(e,type)}
                    defaultValue={defaultValue}
                    beginvalue={defaultValue}
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
