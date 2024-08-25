import { Form, redirect, useActionData, useLoaderData, useParams } from "react-router-dom"
import { getRequestWithID } from "../API/getRequestWithID"
import { getRequest } from "../API/getRequest"
import { postRequest } from "../API/postRequest"
import { useState } from "react"

const FilmPage = () => {
    const [filmData, comments] = useLoaderData()
    const dataFromForm = useActionData()
    const {id} = useParams()

    return(
        <div className="container col-lg-12 col-md-11 bg-light mt-5 text-center shadow-lg p-3 row m-auto rounded my-5 justify-content-center">
            <div className="col-lg-6 col-md-6 my-auto mx-auto">
                <h1 className="display-3 align-middle">{filmData.title}</h1>
            </div>
            <div className="col-lg-6 col-md-6 align-middle">
                <img className="col-lg-10 col-md-12 col-sm-12 col-12 my-sm-3" src={`${filmData.link}`} alt="Image"/>
            </div>
            <p className="col-lg-12 text-start p-5 my-5 border border-0 rounded shadow-lg">{filmData.text}</p>
            <h1 className="col-lg-12 text-center">Comments</h1>

            <Form action={`/films/${id}`} method="POST">
                <div className="col-lg-12">
                    <input className="col-lg-5 col-md-6 col-8 p-3 my-2 text-center" type="text" placeholder="Your name" name="author"/>
                </div>
                <div className="col-lg-12">
                    <textarea className="col-lg-5 col-md-6 col-8 p-3 my-2 text-center" type="text" placeholder="Your comment" name="comment"/>
                </div>
                <button className="btn btn-outline-success col-lg-1 col-4 m-2">Submit</button>
                {dataFromForm && dataFromForm.error && <p className="text-danger py-3 fs-5">{dataFromForm.error}</p>}
            </Form>

            {comments.map((comment)=>(
                <div className="col-10 text-light bg-dark my-3 mx-3 rounded shadow-lg">
                    <h1 className="display-6 text-start py-2 px-2 fw-bolder">{comment.author}</h1>
                    <p className="fst-italic fs-4">{comment.comment}</p>
                </div>
            ))}
            

        </div>
    )
}

export const filmPage = async ({params}) => {
    const {id} = params
    const filmData = await getRequestWithID("http://localhost:3000/films/", id)
    const comments = await getRequest("http://localhost:3000/comments/")
    console.log(comments);
    let postComments = []

    comments.map((comment) => {
        if (comment.postID === id){
            postComments.push(comment)
            console.log("xd");
        }
    })

    return [filmData,postComments]
}


export const filmPageAction = async ({request , params}) => {
    const data = await request.formData()
    const {id} = params

    const author = data.get("author")
    const comment = data.get("comment")

    if (author == "" || comment == ""){
        return {error: "Both fields must be provided"}
    }

    const newComment = {
        id: crypto.randomUUID(),
        postID: id,
        author: author,
        comment: comment
    }


    await postRequest("http://localhost:3000/comments/",newComment)
   

    return redirect(".")
}


export default FilmPage