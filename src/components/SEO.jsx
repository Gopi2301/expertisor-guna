import React, { memo, useEffect } from 'react';

const updateMetaTag = (selector, value, attr = 'name') => {
  if (!value) return;
  const attrName = attr === 'name' ? 'name' : 'property';
  let element = document.head.querySelector(`meta[${attrName}="${selector}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attr, selector);
    document.head.appendChild(element);
  }
  element.setAttribute('content', value);
};

const updateLinkTag = (rel, href) => {
  if (!href) return;
  let link = document.head.querySelector(`link[rel="${rel}"]`);
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', rel);
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
};

const updateStructuredData = (structuredData) => {
  const scriptId = 'seo-structured-data';
  let script = document.getElementById(scriptId);

  if (!structuredData) {
    if (script) script.remove();
    return;
  }

  if (!script) {
    script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = scriptId;
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(structuredData);
};

const SEO = ({ title, description, image, canonical, structuredData }) => {
  useEffect(() => {
    if (title) document.title = title;
    updateMetaTag('description', description);
    updateMetaTag('og:title', title, 'property');
    updateMetaTag('og:description', description, 'property');
    updateMetaTag('og:image', image, 'property');
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);
    updateLinkTag('canonical', canonical);
    updateStructuredData(structuredData);

    return () => {
      updateStructuredData(null);
    };
  }, [title, description, image, canonical, structuredData]);

  return null;
};

export default memo(SEO);

