import styled from "styled-components";
import { COLOR } from "../../constants";

export const InputDiv = styled.div`
    width: 100%;
    height: 7vh;
    position: relative;
`

export const Input = styled.input`
    position: absolute;
    width: 77%;
    height: 7.5vh; 
    min-height: 55px;
    font-size: 20px;
    border: 0;
    border-radius: 10px;
    outline: none;
    padding-left: 10px;
    padding-right: 1em;
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
    outline: none;
    background-color: white;
    font-family: inherit;
    border: solid 2px white; border-radius: 8px;
    color: #18283d;
    font-weight: bold;

    cursor: pointer;
    &:hover {
        background-color: whitesmoke;
    }
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
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    height: 60px;
    padding: 10px 5px 5px 5px;
    margin-bottom: 5px;
    border-bottom: 1px solid #efefef;
    font-size: 25px;
    list-style: none;

`

export const IdLabel = styled.p`
    color:white;
    margin: 0;
    font-weight: bold;
`

export const ListItem = styled.p`
    display: flex;
    position: absolute;
    padding-left: 2em;
    flex-direction: column;
`

export const FriendName = styled.p`
    padding-left: 10px;
    font-family: inherit;
    font-size: 20px;
    font-weight: bold;
    margin: auto;
`

export const FriendMessage = styled.p`
    width: 80%;
    padding-left: 10px;
    margin: auto;
    margin-left: 0.7em;
    padding-left: 0px;
    font-family: inherit;
    font-size: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`