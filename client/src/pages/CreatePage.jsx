import {useState, useEffect, useContext} from 'react';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import {withRouter} from 'react-router-dom';

export const CreatePage = ({history}) => {

    const auth = useContext(AuthContext);
    const [link, setLink] = useState('');
    const {request} = useHttp();

    const pressHandler = async (event) => {
        if (event.key === 'Enter'){
            try {
                const data = await request('/api/link/generate', 'POST', {from: link}, {Authorization: `Bearer ${auth.token}`});
                history.push(`/detail/${data.link._id}`)
            } catch(e){

            }
        }
    }

    useEffect(() => {
        window.M.updateTextFields();
    }, []);

    return <div className="row">
        <div className="col s8 offset-s2">
            <div class="input-field">
                <input 
                    placeholder="Your link" 
                    id="link" 
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    onKeyPress={pressHandler}
                    type="text" 
                    name="link"/>
                    <label for="link">Your link</label>
            </div>
        </div>
    </div>
}

export default withRouter(CreatePage);
