import "./App.css";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Home from "./component/Home";
import About from "./component/About";
import Contact from "./component/Contact";
import Layout from "./component/Layout";
import SitemapData from "./component/SitemapData";
import { useEffect, useState } from "react";
import Details from "./component/Details";

function App() {
  const [sitemapContent, setSitemapContent] = useState("");


  useEffect(() => {
    getSitemapData();
  }, []);

  // const generateSitemap = () => {
  //   const routes = [
  //     '/',
  //     '/about',
  //     '/contact',

  //   ];

  //   return routes.map((route) => <Link to={route} ><li>{window.location.origin}{route}</li></Link>);
  // };

  const getSitemapData = async () => {
    try {
      const response = await fetch("/sitemap.xml");
      const data = await response.text();  //converted to text

      // Parse the XML data manually
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, "text/xml"); //xmlDoc is a object represent XmL structure.

      // Extract URLs without the hostnames
      const urlNodes = xmlDoc.getElementsByTagName("url"); //extract url
      const links = [];

      for (let i = 0; i < urlNodes.length; i++) {
        const locNode = urlNodes[i].getElementsByTagName("loc")[0];
        if (locNode) {
          const url = locNode.textContent || locNode.innerText;
          const path = new URL(url).pathname;
          links.push(path);
        }
      }

      let generatedSitemap = links.map((link) => (
        <Link to={link}>
          <li>
            {window.location.origin} 
            {link}
          </li>
        </Link>
      ));
      setSitemapContent(generatedSitemap);

      // Output the list of paths
      console.log(links);
    } catch (error) {
      console.error("Error fetching sitemap:", error);
    }
  };

  return (
    <BrowserRouter>
      <Layout />
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/about" exact element={<About />} />
        <Route path="/contact" exact element={<Contact />} />
        <Route path="/details" exact element={<Details/>}/>
        <Route
          path="/sitemap"
          exact
          element={<SitemapData sitemapContent={sitemapContent} />}
        />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
