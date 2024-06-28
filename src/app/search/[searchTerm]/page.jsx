import Results from '@/components/Results'
import React from 'react'

const page = async ({params}) => {
  const searchTerm = params.searchTerm
  
  const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&query=${searchTerm}&language=en=US&page=1&include_adult=false`)

  const data = await response.json()
  const results = data.results
  return (
    <div>
      {results && results.length === (
        <h1 className='text-center'>No results found</h1>
      )}

      {results && <Results results={results}/>}
      
    </div>
  )
}

export default page