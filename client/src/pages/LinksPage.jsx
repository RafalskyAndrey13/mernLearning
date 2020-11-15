import { useHttp } from "../hooks/http.hook";
import { useState, useContext, useCallback, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import Loader from "../components/Loader";
import LinksList from "../components/LinksList";

export const LinksPage = () => {
    const [links, setLinks] = useState([]);
    const {loading, request} = useHttp();
    const {token} = useContext(AuthContext);

    const fetchLinks = useCallback(async () => {
        try {
            const fetched = await request('/api/link', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setLinks(fetched);
        } catch (e) {

        }
    }, [token, request]);

    useEffect(() => {
        fetchLinks();
    }, [fetchLinks])

    if (loading){
        return <Loader/>
    }

    return <div>
        {links.length > 0 ? <LinksList links={links}/> : <div>
            <p>No links yet</p>
        </div>}
    </div>
}

export default LinksPage;