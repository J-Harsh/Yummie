import { useEffect,useState } from "react";
import styled from "styled-components";
import {Splide,SplideSlide} from '@splidejs/react-splide';
import '@splidejs/react-splide/css/sea-green';
import {Link} from "react-router-dom";

function Popular() {

    const [veggie, setveggie] = useState([])

    useEffect(()=>{
        getVeggie();
    },[]);

    const getVeggie= async()=>
    {
        const checkL=localStorage.getItem('veggie');
        if(checkL)
        {
          setveggie(JSON.parse(checkL));
        }
        else
        {
        const api=await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tags=vegetarian`)
        const data=await api.json();
        localStorage.setItem('popular',JSON.stringify(data.recipes));
        setveggie(data.recipes);
        }
    }
    

  return (
    <div>
                    <Wrapper>
                        <h3>Our Vegetarian Picks</h3>
                        <Splide options={{
                            perPage:3,
                            arrows:false,
                            pagination:true,
                            drag:'free',
                            gap:"5rem",
                        }}>
                        {veggie.map((recipe)=> {
                        return(
                            <SplideSlide>
                            <Card>
                            <Link to={"/recipe/"+recipe.id}>
                                <p>{recipe.title}</p>
                               
                                <img src={recipe.image} alt={recipe.title} />
                                <Gradient/>
                                </Link>
                            </Card>
                            </SplideSlide>
                        );
                        })}
                        </Splide>
                    </Wrapper>
    </div>
  )
}

const Wrapper=styled.div`
margin: 2rem 0rem;
h3
{
    margin:0rem;
}
`;
const Card=styled.div`
min-height:20rem;
border-radius:2rem;
overflow:hidden;
position:relative;

img{
    border-radius:2rem;
    position:absolute;
    left:0;
    width:100%;
    height:100%;
    object-fit:cover;
}

p{
    position:absolute;
    z-index:10;
    left:50%;
    bottom:0%;
    transform:translate(-50%,0%);
    color:white;
    text-align:center;
    font-weight:600;
    font-size:1rem;
    height:40%;
    display:flex;
    justify-content:center;
    align-items:center;
}
`;

const Gradient=styled.div`
z-index:3;
position:absolute;
width:100%;
height:100%;
background: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0.5));
`;



export default Popular