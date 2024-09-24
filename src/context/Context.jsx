import React, { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState("");
    const [recentPrompt, setRecetPrmopt] = useState("");
    const [prevPrompt, setPrevPrmopt] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState([]);

    const deplayPara = (index, nextWord) => {
        setTimeout(function () {
            setResultData(prev => prev+nextWord)
        }, 75*index)
    }
    const newChat = () => {
        setLoading(false);
        setShowResult(false);
    }
    const onSent = async (prompt) => {
        setResultData("")
        setLoading(true)
        setShowResult(true)
        let response;
        if(prompt !== undefined){
            response = await runChat(prompt);
            setRecetPrmopt(prompt)
        }else {
            setPrevPrmopt(prev => [...prev, input])
            setRecetPrmopt(input);
            response = await runChat(input);
        }
        
        let responseArray = response.split("**")
        let newResponse = "";
        for(let i=0; i<responseArray.length; i++){
            if(i === 0 || i%2 !== 1){
                newResponse += responseArray[i];
            }else {
                newResponse += "<b>"+responseArray[i]+"</b>";
            }
        }
        let newResponseTwo = newResponse.split('*').join("</br>")

        let newResponseArray = newResponseTwo.split(" ");
        for(let i=0; i<newResponseArray.length; i++){
            const nextWord = newResponseArray[i];
            deplayPara(i, nextWord+" ");
        }
        setLoading(false)
        setInput("")

    }

    const contextValue = {
        prevPrompt,
        setPrevPrmopt,
        onSent,
        setRecetPrmopt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
}

export default ContextProvider;
