import React, { useContext } from 'react'
import './Main.css' 
import {assets} from '../../assets/assets';
import { Context } from '../../context/context';
export const Main = () => {
    const {onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);

  return (
    <div className="main">
        <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
        </div>
        <div className="main-container">
            {!showResult ? 
            <>
                <div className="greet">
                <p><span>Hello, Saurabh</span></p>
                <p>How can I help you today</p>
            </div>
            <div className="cards">
                <div className="card">
                    <p>Can you help me write an out-of-office email?</p>
                    <img src={assets.compass_icon} alt="" />
                </div>
                <div className="card">
                    <p>Give me a walkthrough of The Byzantine Empire in seven bullet points or less.</p>
                    <img src={assets.bulb_icon} alt="" />
                </div>
                <div className="card">
                    <p>Find videos of how to quickly solve the problem</p>
                    <img src={assets.message_icon} alt="" />
                </div>
                <div className="card">
                    <p>Write a beginner’s guide to an activity to solve coding problems</p>
                    <img src={assets.code_icon} alt="" />
                </div>
            </div>
            </> :
                <div className="result">
                    <div className="result-title">
                        <img src={assets.user_icon} alt="" />
                        <p>{recentPrompt}</p>
                    </div>
                    <div className="result-data">
                        <img src={assets.gemini_icon} alt="" />
                        {loading ? 
                            <div className="loader">
                                <hr />
                                <hr />
                                <hr />
                            </div> :
                            <p dangerouslySetInnerHTML={{__html:resultData}}></p>
                        }                       
                    </div>
                </div>
            }
            

            <div className="main-bottom">
                <div className="search-box">
                    <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" placeholder='Enter a prompt here' />
                    <div>
                        <img src={assets.gallery_icon} alt="" /><img src={assets.mic_icon} alt="" />
                        <img onClick={()=> onSent()} src={assets.send_icon} alt="" />
                    </div>
                   
                </div>
                <div className="bottom-info">
                        <p>Gemini may display inaccurate info, including about people, so double-check its responses.</p>
                    </div>
            </div>
        </div>
    </div>
  )
}

export default Main