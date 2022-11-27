import styled from "styled-components";
import { COLOR } from "../../constants";

export const InputDiv = styled.div`
    width: 100%;
    height: 7vh;
    position: relative;
`

export const Input = styled.input`
    position: absolute;
    width: 85%;
    height: 7.5vh; 
    min-height: 55px;
    font-size: 20px;
    border: 0;
    border-radius: 10px;
    outline: none;
    padding-left: 10px;
    background-color: ${COLOR.background};
    font-family: inherit;
    border: solid 2px white; border-radius: 12px 0px 0px 12px; 
    color: white;
    flex-grow: 1;
`

export const Button = styled.button`
    width: 25%;
    height: 7.5vh;
    min-height: 55px;
    position: absolute; right: 0px;
    font-size: 20px;
    border: 0;
    border-radius: 10px;
    outline: none;
    background-color: white;
    font-family: inherit;
    border: solid 2px white; border-radius: 8px;
    color: #18283d;
    font-weight: bold;
`
export const ListDiv = styled.div`
    width: 100%;
    margin-top: 4em;
`

export const ListBox = styled.ul`
    width: 100%;
    background-color: #626F88;
    font-family: inherit;
    border-radius: 20px;
    padding: 15px;
`

export const List = styled.li`
    color: white;
    height: 60px;
    padding: 5px 10px 5px 5px;
    margin-bottom: 5px;
    padding-bottom: 10px;
    border-bottom: 1px solid #efefef;
    font-size: 25px;
    list-style: none;

`

export const IdLabel = styled.p`
    color:white;
    margin: 0;
    font-weight: bold;
`

export const ListText = styled.span`
    padding-left: 0.5em;    
`