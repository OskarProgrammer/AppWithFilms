export const getRequestWithID = async ( endpoint , id ) => {
    let data = []

    try{
        data = await fetch(endpoint + id)
    } catch {
        throw Error(`Error during getting data from ${endpoint}${id}`)
    }

    return data.json()
}