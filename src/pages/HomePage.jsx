// importing functions
import { NavLink, useLoaderData } from "react-router-dom"
import {getRequest} from "../API/getRequest"
import { useState } from "react"

const HomePage = () => {
    const [posts, keyPhrase] = useLoaderData()

    return(
        <div className="container col-lg-10 text-center mt-5 pt-2 row text-center m-auto justify-content-center">
            {posts.map((post)=>{
                if (keyPhrase === ""){
                    return (<div className="col-lg-10 bg-light shadow-lg p-5 rounded-pill my-3">
                        <h2 className="display-2">{post.title}</h2>
                        <p>{post.shortText}</p>
                        <NavLink to={`/films/${post.id}`} className="btn btn-outline-dark btn-lg"><i class="bi bi-hand-index-thumb-fill"></i></NavLink>
                    </div>)
                }else if (keyPhrase != "" && (post.title.includes(keyPhrase) || post.shortText.includes(keyPhrase))){
                    return(<div className="col-lg-10 bg-light shadow-lg p-5 rounded-pill my-3">
                        <h2 className="display-2">{post.title}</h2>
                        <p>{post.shortText}</p>
                        <NavLink to={`/films/${post.id}`} className="btn btn-outline-dark btn-lg"><i class="bi bi-hand-index-thumb-fill"></i></NavLink>
                    </div>)
                }else{
                    return ""
                }
                })}
        </div>
    )
}


export const homePageLoader = async () => {
    const data = await getRequest("http://localhost:3000/films/")
    const {keyPhrase} = await getRequest("http://localhost:3000/keyPhrase/")

    return [data, keyPhrase]
}


export default HomePage