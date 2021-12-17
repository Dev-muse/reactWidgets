import React,{useState , useEffect} from 'react'
import axios from 'axios';



const Search = () => {
    const [term, setTerm] = useState('');
    const [results, setResults] = useState([])
    


    useEffect(()=>{

        const search = async()=>{
            const {data} =  await axios.get('https://en.wikipedia.org/w/api.php',{
                params:{
                    action: 'query',
                    list:'search',
                    origin: '*',
                    format: 'json',
                    srsearch: term,                  
                }
            })
            setResults(data.query.search)
        }

        // prevent delay in request on initial render

        if(term && !results.length){
            search()

        }else{
            
                // only calling api after user stops typing with timout function
            const timeoutId= setTimeout(
                ()=>{
                    if (term){
                        search()
                    }

                },1000
            );
            // clean up function cancels timeout only if change to state in new run
            return  ()=>{clearTimeout(timeoutId)}
        }



    },[term])

    const renderedResults = results?.map(result=>{
        return (
                <div className="item" key={result.pageid}>
                    <div className="right floated content">
                        <a href={`https://en.wikipedia.org?curid=${result.pageid}`} 
                        target="_blank" className="ui button">View Article</a>
                    </div>
                    <div className="content">
                        <h2 className="header">{result.title}</h2>
                        <span dangerouslySetInnerHTML={{__html: result.snippet}}></span>
                    </div>
                </div>
        )
    })

    return (
        <div>
            <div className="ui form">
                <div className="field">
                    <label htmlFor="input">Search Wikipedia</label>
                    <input id="input" className="input" 
                    placeholder="Enter Search Term"
                    value={term} onChange={(e)=>setTerm(e.target.value)} />
                </div>
            </div>
            <div className="ui celled list">
                {renderedResults}
            </div>
            
        </div>
    )
}

export default Search;
