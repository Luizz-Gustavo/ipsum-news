function ClearEmbedLink(url) {
    
    const srcMatch = url.match(/src="([^"]+)"/);
    
    if (srcMatch && srcMatch[1]) {
        return srcMatch[1];
    }
    
    return url;
}

export default ClearEmbedLink;