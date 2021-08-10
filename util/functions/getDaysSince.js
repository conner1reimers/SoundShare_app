const getDaysSince = (date) => {
    const dateNow = new Date();
    const joinDate = new Date(date);
    let daysSince = Math.floor((dateNow.getTime() - joinDate.getTime()) / (1000*3600*24));
    
    
    let daysText
    let minutesSince
        
    if (daysSince < 1) {
        daysSince = Math.floor((dateNow.getTime() - joinDate.getTime()) / (1000*3600));
        if (daysSince < 1) {
            daysSince = Math.floor((dateNow.getTime() - joinDate.getTime()) / (1000*60));
            
            daysText = `${daysSince} minutes ago`;
        } else {
            daysText = `${daysSince} hours ago`;
        }
    } else {
        daysText = `${daysSince} days ago`;
    }

    return daysText;
}

export default getDaysSince;
