import { useEffect, useState } from 'react';
import portfolio from '../data/links.json'
import { getLinkPreview } from "link-preview-js";
import '../style/links.css'

const Links = () => {

  const [portfolioLinks, setPortfolioLinks] = useState([])
  
  useEffect(() => {
    portfolio.data.forEach(element => {
      getLink(element)
    });
  }, [])

  const shuffleArray = (arr) => {
    return arr.sort(() => Math.random() - 0.5);
  }

  const getLink = async(e) => {
    await getLinkPreview(e).then((data) => {
      setPortfolioLinks(prev => {return[...prev, data]})
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