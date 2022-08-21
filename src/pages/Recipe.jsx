import { useEffect,useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import {motion} from "framer-motion";

import React from 'react'

function Recipe() {
    let param=useParams();
    const [details,setDetails]=useState({});
    const [activeTab,setActiveTab]=useState("instructions");

    const fetchDetails=async()=>
    {
        const api=await fetch(`https://api.spoonacular.com/recipes/${param.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`);
        const data=await api.json();
        setDetails(data);
    }

    useEffect(()=>
    {
        fetchDetails();
    },[param.name]);

  return (
    <DetailWrapper
        animate={{opacity:1}}
        initial={{opacity:0}}
        exit={{opacity:0}}
        transition={{duration:0.5}}>
        <div>
            <h2>{details.title}</h2>
            <img src={details.image} alt={details.title} />
        </div>
        <Info>
            <Button className={activeTab==='instructions'? 'active':'' } onClick={()=>setActiveTab("instructions")}>About</Button>
            <Button className={activeTab==='ingredients'? 'active':'' } onClick={()=>setActiveTab("ingredients")}>Instructions</Button>
            {activeTab==="instructions" && (    
            <div>
                <h3>About</h3>
                <h4 dangerouslySetInnerHTML={{__html:details.summary}} ></h4>
                
            </div>
            ) }
            {activeTab==="ingredients" && (
            <ul>
                <h3>Ingredients</h3>
                {details.extendedIngredients.map((ingredient)=>(
                    <li key={ingredient.id}>{ingredient.original}</li>
                )
                )}
                <h3>Method</h3>
                <h4 dangerouslySetInnerHTML={{__html:details.instructions}} ></h4>
            </ul>
            )}
        </Info>
    </DetailWrapper>
  );
}

const DetailWrapper=styled(motion.div)
`
margin-top:10rem;
margin-bottom:5rem;
display:flex;
.active
{
    background:linear-gradient(35deg,#494949,#313131);
    color:white;
    transition:all 300ms ease-in-out forwards;
}

h2{
    margin-botton:2rem;
}
h3
{
    font-size:1.5rem;
    margin: 2rem 0rem 1rem 0rem;
}
h4
{
    line-height:1.75;
    font-size:1rem;
}
li
{
    font-size:1rem;
    margin:0rem;
}
ul
{
    margin-top:2rem;
    font-weight:600;
}
img
{
    border-radius:0.35rem;
    margin-top:4rem;
    width:30rem;
}
`;

const Button=styled.button
`
padding:1rem 2rem;
color: #313131;
background:white;
border: 2px solid black;
margin-right:2rem;
font-weight:600;
cursor:pointer;
transition:all 300ms ease-in-out forwards;
`;

const Info=styled.div
`
margin-left:10rem;
`;

export default Recipe
