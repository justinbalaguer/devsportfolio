import { useEffect, useState } from 'react';
import '../style/links.css'
const axios = require('axios');

const Links = () => {

  const [portfolioLinks, setPortfolioLinks] = useState([])
  
  useEffect(() => {
    axios.get('https://raw.githubusercontent.com/justinbalaguer/devsportfolio/main/links.json')
    .then((response) => {
      response.data.data.forEach(email => {
        getLink(email)
      });
    })
    .catch((error) => {
      console.log(error);
    })
  }, [])

  const shuffleArray = (arr) => {
    return arr.sort(() => Math.random() - 0.5);
  }

  const getLink = async(email) => {
    await axios.get('https://devsportfolio-api.vercel.app/', {
      params: {
        email
      }
    })
    .then((response) => {
      setPortfolioLinks(prev => {return[...prev, response.data.message]})
    })
    .catch((error) => {
      console.log(error);
    })
  }

  const shuffle = shuffleArray(portfolioLinks)

  const mappedPortfolio = shuffle.map((link,i) => {
    return (
      <div key={i} className="tile-wrapper">
        <div className="tile">
          <div className="img-wrapper">
            <img src={portfolioLinks[i]?.favicons[0]} alt="favicon" className="img" />
          </div>
          <div className="info">
            <span><b>{portfolioLinks[i]?.title}</b></span>
            <a href={portfolioLinks[i]?.url} target="_blank" rel="noreferrer">{portfolioLinks[i]?.url}</a>
            <span className="info-desc">{portfolioLinks[i]?.description}</span>
          </div>
        </div>
      </div>
    )
  })

  return (
    <div id="portfolio">
      {mappedPortfolio}
    </div>
  )
}

export default Links