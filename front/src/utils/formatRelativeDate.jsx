//THIS FUNCTION IS RESPONSIBLE FOR RETRIEVING THE DATE AND TIME OF THE POST CREATION
//COMPARE WITH THE CURRENT DATE AND TIME AND DISPLAY HOW MUCH TIME HAS PASSED

export const formatRelativeDate = (createdAt) => {
    const now = new Date();
    const createdDate = new Date(createdAt);
    const timeDiff = now - createdDate;
  
    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
  
    if (days > 0) {
      return `Created on: ${createdDate.toLocaleDateString("pt-BR")}`;
    }
    if (hours > 0) {
      return `Created ${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    }
    if (minutes > 0) {
      return `Created ${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    }
    return "Less than 1 minute ago";
  };