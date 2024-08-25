import { useState } from "react"
import {putRequest} from "../API/putRequest"
import { NavLink, Outlet, redirect } from "react-router-dom"

const HomeLayout = () => {
    let [newKey, setNewKey] = useState("")


    const sendKeyPhrase  = async () => {
        const newKeyPhrase = {
            keyPhrase: newKey
        }
        await putRequest("http://localhost:3000/keyPhrase/", newKeyPhrase)
        setNewKey("")
        return redirect("/")
    }

    return(
        <div className="container-lg">
            <h1 className="col-sm-10 col-10 display-1 fst-italic text-center py-5 shadow-lg rounded-pill mt-5 m-auto">
                Film application <i class="bi bi-camera-reels"></i>
            </h1>
            <div className="col-lg-5 text-center m-auto mt-5">
                <NavLink to="/" className="col-lg-2 col-md-1 p-2 btn btn-outline-primary rounded-pill me-3 border-3"><i class="bi bi-house"></i></NavLink>
                <input  onChange={(e)=>{setNewKey(e.target.value)}} value={newKey} type="text" className="col-lg-6 me-2 shadow-lg border border-1 border-success bg-light p-3 rounded-pill"/>
                <button onClick={()=>{sendKeyPhrase()}} className="col-lg-2 p-2 btn btn-outline-success rounded-pill me-3"><i class="bi bi-search"></i></button>
            </div>
            <main>
                <Outlet/>
            </main>
        </div>
    )
}


export default HomeLayout